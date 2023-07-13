    import './App.css'
    import { UploadButton } from "./comp/UploadButton.jsx";
    import { useState } from "react";
    // eslint-disable-next-line no-unused-vars
    import React from "react";
    import AudioRecorder from "./comp/AudioRecorder.jsx";
    import Transcribe from "./comp/Transcribe.jsx"
    import Summarize from "./comp/Summarize.jsx";

    function App() {
        const [audio, setAudio] = useState(null);
        const [file, setFile] = useState(null);
        const handleAudioUpdate = (newAudio) => {
            setAudio(newAudio);
        };
        const handleFileUpdate = (newFile) => {
          setFile(newFile);
        };


        return (
            <>
              <div>
                <a href="https://github.com/CICLAB-Comillas" target="_blank" rel="noreferrer">
                  <img src="src/assets/logo-ciclab.png" className="logo ciclab" alt="CICLAB logo" />
                </a>
              </div>
              <h1>AI whisperer v2</h1>
              <h2>LLM powered voice transcription</h2>
              <h5>by:
                <br /> A. Gómez, M. Hervás
                <br /> M. Liz, A. Quintana
              </h5>


              <div className="card">
                  {!audio &&
                    <UploadButton onFileUpload={handleFileUpdate}/>
                  }
                  {(!audio && !file) && <><a>or</a></> }
                  {!file &&
                    <AudioRecorder onAudioUpdate={handleAudioUpdate}/>
                  }

                  {/*the following code corresponds to the apparition of the transcribe button modified according to the
                   button pressed previously*/}
                  {(audio || file) && <div>
                      {audio && <>
                          <a>Recording successful</a>
                          <br/>
                          <a download href={audio}>
                              -- Download Recording --
                          </a>
                      </>
                      }
                      {file && <>
                          <a>Upload succesful </a>
                          <br/>
                          <a download href={file}>
                              -- Download File --
                          </a>
                      </>
                      }
                      <Transcribe url={file || audio}/>
                      <a>Options:</a>
                      <Summarize url={file || audio}/>
                  </div>}


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
