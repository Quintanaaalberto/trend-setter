import requests
import os

key = 'sec_2uxbXS8V6yEQr8cfvCJJ6Gn7zQsHkfa1'

data_dic = []

folder_path = 'pdf_files'  # Update with the actual folder path

# Get a list of all files in the folder
files = os.listdir(folder_path)

# Print the names of all files

# for file_name in files:
file_name = 'the-future-of-energy.pdf'

# Import file
files = [
    ('file', ('file', open(file_name, 'rb'), 'application/octet-stream'))
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


# Ask question

data = {
    'sourceId': source_id,
    'messages': [
        {
            'role': 'user',
            'content': 'Summarize the text in as many words as you can',
        }
    ]
}

response = requests.post(
    'https://api.chatpdf.com/v1/chats/message', headers=headers, json=data)

if response.status_code == 200:
    result = response.json()['content']
    data_dic.append({"file_name": file_name, "result": result})
else:
    print(file_name,  ': Status:', response.status_code)
    print(file_name,  ':Error:', response.text)

print(data_dic)