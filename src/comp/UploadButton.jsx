// VERSIÓN 4.0
// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from 'react';
import PropTypes from "prop-types";
import JSZip from 'jszip';

export const UploadButton = ({ tagText = "UPLOAD A FILE", onFileUpload }) => {
    const fileInputRef = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleClick = () => {
        console.log('Button clicked');
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        console.log('Handling file change');
        const files = Array.from(event.target.files); // convert FileList to Array
        console.log(`Selected files: ${files.map(file => file.name).join(', ')}`);
        setSelectedFiles(files);

        const zip = new JSZip();
        console.log('Creating zip file');
        files.forEach((file, index) => {
            console.log(`Adding file ${file.name} to zip`);
            zip.file(file.name, file);
        });

        console.log('Generating zip file');
        const content = await zip.generateAsync({type:"blob"});
        console.log('Zip file generated');
        const blobURL = URL.createObjectURL(content);
        console.log(`Blob URL: ${blobURL}`);
        onFileUpload(blobURL); // Pass the URL of the zip file
    };

    return (
        <div>
            <button onClick={handleClick} className="tag">
                <div className="tag-text">{tagText}</div>
            </button>

            <input
                ref={fileInputRef}
                type="file"
                accept=".zip"
                multiple
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />

            {selectedFiles && (
                <div>
                    <h4>Selected Files:</h4>
                    {selectedFiles.map((file, index) =>
                        <p key={index} className={"fileDisplay"}>{file.name}</p>
                    )}
                </div>
            )}
        </div>
    );
};

UploadButton.propTypes = {
    tagText: PropTypes.string,
    onFileUpload: PropTypes.func,
};

