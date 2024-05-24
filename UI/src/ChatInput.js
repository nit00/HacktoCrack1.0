import React, { useState } from 'react';
import styled from 'styled-components';
import MicIcon from '@material-ui/icons/Mic'; // Importing mic icon from Material Icons
import SendIcon from '@material-ui/icons/Send';

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #ccc;
  background-color: #fff;
  width: 80%;
  margin: 0 auto;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 10px;
  margin: 10px;
  background-color: #4a76a8;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LanguageSelectorsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 10px auto;
  z-index: 1; /* Ensure dropdowns are above other elements */
`;

const LanguageSelector = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 48%; /* Adjust width to fit two selectors side by side */
  background-color: #fff;
  cursor: pointer;
`;

function ChatInput({ sendMessage }) {
  const [text, setText] = useState('');
  const [inputLanguage, setInputLanguage] = useState('en-US');
  const [outputLanguage, setOutputLanguage] = useState('en-US'); // Default output language

  const handleSend = () => {
    if (text.trim() !== '') {
      sendMessage(text,inputLanguage,outputLanguage);
      setText('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  const handleInputLanguageChange = (event) => {
    setInputLanguage(event.target.value);
  };

  const handleOutputLanguageChange = (event) => {
    setOutputLanguage(event.target.value);
  };

  const handleAudioCapture = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Your browser does not support speech recognition. Please use a modern browser.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = inputLanguage; // Use the selected input language

    recognition.onstart = () => {
      console.log('Voice recognition started. Try speaking into the microphone.');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log(`You said: ${transcript}`);
      sendMessage(transcript, inputLanguage,outputLanguage);
    };

    recognition.onerror = (event) => {
      console.error('Error occurred in recognition: ' + event.error);
    };

    recognition.onend = () => {
      console.log('Voice recognition ended.');
    };

    recognition.start();
  };

  return (
    <div>
      <LanguageSelectorsContainer>
        <LanguageSelector onChange={handleInputLanguageChange} value={inputLanguage}>
        <option value="en-IN">Input: English (India)</option>
<option value="hi-IN">Input: हिंदी (Hindi)</option>
<option value="bn-IN">Input: বাংলা (Bengali)</option>
<option value="pa-IN">Input: ਪੰਜਾਬੀ (Punjabi)</option>
<option value="gu-IN">Input: ગુજરાતી (Gujarati)</option>
<option value="or-IN">Input: ଓଡ଼ିଆ (Odia)</option>
<option value="ta-IN">Input: தமிழ் (Tamil)</option>
<option value="te-IN">Input: తెలుగు (Telugu)</option>
<option value="kn-IN">Input: ಕನ್ನಡ (Kannada)</option>
<option value="ml-IN">Input: മലയാളം (Malayalam)</option>
<option value="mr-IN">Input: मराठी (Marathi)</option>
<option value="ur-IN">Input: اردو (Urdu) (India)</option>

        </LanguageSelector>
        <LanguageSelector onChange={handleOutputLanguageChange} value={outputLanguage}>
        <option value="en-IN">Output: English (India)</option>
<option value="hi-IN">Output: हिंदी (Hindi)</option>
<option value="bn-IN">Output: বাংলা (Bengali)</option>
<option value="pa-IN">Output: ਪੰਜਾਬੀ (Punjabi)</option>
<option value="gu-IN">Output: ગુજરાતી (Gujarati)</option>
<option value="or-IN">Output: ଓଡ଼ିଆ (Odia)</option>
<option value="ta-IN">Output: தமிழ் (Tamil)</option>
<option value="te-IN">Output: తెలుగు (Telugu)</option>
<option value="kn-IN">Output: ಕನ್ನಡ (Kannada)</option>
<option value="ml-IN">Output: മലയാളം (Malayalam)</option>
<option value="mr-IN">Output: मराठी (Marathi)</option>

<option value="ur-IN">Output: اردو (Urdu) (India)</option>

        </LanguageSelector>
      </LanguageSelectorsContainer>
      <InputContainer>
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          onKeyPress={handleKeyPress}
        />
        <Button onClick={handleSend}>
          <SendIcon /> {/* Use SendIcon component for the send button */}
        </Button>
        <Button onClick={handleAudioCapture}>
          <MicIcon /> {/* Using MicIcon component for the microphone icon */}
        </Button>
      </InputContainer>
    </div>
  );
}

export default ChatInput;
