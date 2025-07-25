import React from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "../styles/voiceinput.css";

export default function VoiceInput({ onResult }) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <p className="error-text">❗ Browser does not support speech recognition.</p>;
  }

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    onResult(transcript);
  };

  return (
    <div className="voice-input-container">
      <div className="controls">
        <button className="start-btn" onClick={startListening}>
          🎙️ Start Speaking
        </button>
        <button className="stop-btn" onClick={stopListening}>
          🛑 Stop & Submit
        </button>
      </div>
      <div className="transcript-box">
        <p className="label">Transcript:</p>
        <div className="transcript">{transcript}</div>
        {listening && <p className="listening-status">🎧 Listening...</p>}
      </div>
    </div>
  );
}
