    import './App.css'
    import { UploadButton } from "./comp/UploadButton.jsx";
    import { useState } from "react";
    // eslint-disable-next-line no-unused-vars
    import React from "react";
    import AudioRecorder from "./comp/AudioRecorder.jsx";
    import TrendAnalyzer from "./comp/Transcribe.jsx"
    import Summarize from "./comp/Summarize.jsx";

    function App() {
        const [file, setFile] = useState(null);

        const handleFileUpdate = (newFile) => {
          setFile(newFile);
          console.log(`File updated: ${newFile}`);
        };


        return (
            <>
              <div>
                <a href="https://github.com/CICLAB-Comillas" target="_blank" rel="noreferrer">
                  <img src="src/assets/logo-ciclab.png" className="logo ciclab" alt="CICLAB logo" />
                </a>
              </div>
              <h1>Trend Setter</h1>
              <h2>AI powered tren analyzer</h2>
              <h5>by:
                <br /> A. Gómez, MC. Urgel
                <br /> M. Liz, A. Quintana
                <br />
                <br /> &
                <br />
                <br /> O. Arroyo
              </h5>


              <div className="card">

                    <UploadButton onFileUpload={handleFileUpdate}/>


                  {/*the following code corresponds to the apparition of the transcribe button modified according to the
                   button pressed previously*/}
                  {(file) &&
                      <>
                          <a>Upload succesful </a>
                          <br/>
                          <a download href={file}>
                              -- Download File --
                          </a>


                      <TrendAnalyzer url={file}/>

                    </>
                  }


              </div>
              <p className="read-the-docs">
                Please, only upload one of the following types of files: <br/>
                  .mp3  .mp4  .svg  .wav  .flac  .aac  .m4a  .ogg  .aiff  .aif  .weba <br/>
                  ... with the audio you want to see transcribed to text.
              </p>
              <p className="read-the-docs">
                To learn more click on the CICLAB logo or visit {'https://github.com/CICLAB-Comillas'}
              </p>
            </>
      )
}

export default App
