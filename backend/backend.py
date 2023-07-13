from flask import Flask, request, jsonify
import openai
from flask_cors import CORS
import os
import tempfile
import zipfile
import requests

openai.api_key = os.getenv('OPENAI-API-KEY')

app = Flask(__name__)
CORS(app)


def call_chatgpt(prompt, model="gpt-3.5-turbo"):
    messages = [{"role": "user", "content": prompt}]
    chatgpt_answer = openai.ChatCompletion.create(model=model, messages=messages, temperature=0)
    return chatgpt_answer.choices[0].message["content"]


def askgpt(prompt, data):
    chatgpt_prompt = f"{prompt}: {data}"
    return call_chatgpt(chatgpt_prompt)


def process_files(folder_path):
    key = 'sec_2uxbXS8V6yEQr8cfvCJJ6Gn7zQsHkfa1'
    data_dic = []

    # Unzip the folder
    with zipfile.ZipFile(folder_path, 'r') as zip_ref:
        zip_ref.extractall('unzipped_files')

    # Get a list of all files in the unzipped folder
    files = os.listdir('unzipped_files')

    # Process each file
    for file_name in files:
        file_path = os.path.join('unzipped_files/', file_name)

        # Import file
        files = [
            ('file', ('file', open(file_path, 'rb'), 'application/octet-stream'))
        ]
        headers = {
            'x-api-key': key
        }

        response = requests.post(
            'https://api.chatpdf.com/v1/sources/add-file', headers=headers, files=files)

        if response.status_code == 200:
            source_id = response.json()['sourceId']
            print('Source ID:', source_id)
        else:
            print('Status:', response.status_code)
            print('Error:', response.text)
            continue

        # Ask question
        data = {
            'sourceId': source_id,
            'messages': [
                {
                    'role': 'user',
                    'content': 'Summarize the text',
                }
            ]
        }

        response = requests.post(
            'https://api.chatpdf.com/v1/chats/message', headers=headers, json=data)

        if response.status_code == 200:
            result = response.json()['content']
            chatgpt_result =  result #askgpt("expand on the following content, giving a total of up to 290 tokens", result)
            data_dic.append({"file_name": file_name, "result": chatgpt_result})
        else:
            print(file_name, ': Status:', response.status_code)
            print(file_name, ':Error:', response.text)

    return data_dic


@app.route('/api/run_script_transcribe', methods=['POST'])
def run_script_transcribe():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']

    # Create a temporary file to store the uploaded file
    temp_fd, temp_path = tempfile.mkstemp(suffix='.zip')
    file.save(temp_path)

    # Call your Python script here using the temporary file
    result = process_files(open(temp_path, "rb"))

    print(result)

    gptanswer = askgpt(
        "Basado en los siguientes textos además de la información que tu conozcas y relacionado con las siguientes keywords: ‘hidrógeno, hibridación de energías renovables, digitalización de redes, baterías, autoconsumo, sustitución del petróleo y gas por energías alternativas, vehículo eléctrico, electrificación de gasolineras’ evalúame en una escala del 1 al 10 el impacto futuro en el sector energético, siendo 1 el menor impacto y 10 el mayor impacto. Por otra parte, en una escala de 0 a 10 el tiempo necesario para su plena adopción en el sector energético. Además, devuelveme una estimación de la inversión necesaria para implementar dichas tecnologías en una escala de 0 a 10. Devuélveme las conclusiones extraídas en formato json en el que las claves principales sean las diferentes keywords, y contengan el impacto, el tiempo de implementación y la estimación de la inversión con sus respectivos valores. El nombre del json debe ser json_metrics",
        result)

    print(gptanswer)

    # Close the file descriptor and remove the temporary file
    os.close(temp_fd)
    os.remove(temp_path)

    return jsonify({'transcript': gptanswer})


if __name__ == '__main__':
    app.run(port=5000)
