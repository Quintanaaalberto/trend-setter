
import { useWhisper } from '@chengsokdara/use-whisper'

export const Transcriptor = () => {
    const {
        recording,
        speaking,
        transcript,
        transcripting,
        pauseRecording,
        startRecording,
        stopRecording,
    } = useWhisper({
        apiKey: process.env.REACT_APP_API_KEY, // YOUR_OPEN_AI_TOKEN
    })

    return (
        <div>
            <p>Recording: {recording}</p>
            <p>Speaking: {speaking}</p>
            <p>Transcripting: {transcripting}</p>
            <p>Transcribed Text: {transcript.text}</p>
            <button onClick={() => startRecording()}>Start</button>
            <button onClick={() => pauseRecording()}>Pause</button>
            <button onClick={() => stopRecording()}>Stop</button>
        </div>
    )
}