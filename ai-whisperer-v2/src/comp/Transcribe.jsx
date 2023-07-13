// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TranscribeAudio = ({url}) => {
    const [showTextbox, setShowTextbox] = useState(false);
    const [transcription, setTranscription] = useState('');

    const handleClick = () => {
        setShowTextbox(true);

        // Fetch the file from the blob URL
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                // Convert the blob to a File object
                const file = new File([blob], 'audio.wav', {type: blob.type});

                // Create a FormData object and append the file
                const formData = new FormData();
                formData.append('file', file);

                // Send the file in a multipart/form-data request
                return fetch('http://localhost:5000/api/run_script_transcribe', {
                    method: 'POST',
                    body: formData
                });
            })
            .then(response => response.json())
            .then(data => {
                // Update the transcription state with the response data
                setTranscription(data.transcript);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <button onClick={handleClick}>Transcribe</button>
            <br />
            {showTextbox && <textarea rows="4" cols="50" value={transcription} readOnly/>}
        </div>
    );
};

TranscribeAudio.propTypes = {
    url: PropTypes.string,
};

export default TranscribeAudio;
