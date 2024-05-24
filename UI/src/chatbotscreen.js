import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ChatInput from './ChatInput';
import { useLocation } from 'react-router-dom';
import SpeakerIcon from '@material-ui/icons/VolumeUp';
import { auth } from './App'; 
import { signOut } from 'firebase/auth'; 
import { BrowserRouter as Router, Route, useNavigate} from 'react-router-dom';
import { getDatabase, ref, push,set } from 'firebase/database';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #81b7cbb6;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: black;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  color: white;
`;

const UserName = styled.div`
  font-weight: bold;
  align-items: center;
  margin-left: 5px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 0px;
  margin-left: 15px;
`;

const SignOutButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: white;
`;

const ChatContainer = styled.div`
  flex-grow: 1;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 30px;
  background-color: #fff;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const MessagesContainer = styled.div`
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Message = styled.div`
  display: flex;
  align-items: center;
  max-width: 70%;
  color: #333;
  padding: 10px 15px;
  border-radius: 20px;
  background-color: ${({ isUser }) => (isUser ? '#dcf8c6' : '#ebebeb')};
  align-self: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
  word-wrap: break-word;
`;

const BotIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const SpeakerButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-left: 10px;
`;



function ChatbotScreen() {
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userName = searchParams.get('userName');
  const userProfilePic = searchParams.get('photo');

  const readAloud = (text, language) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language; // Set the language of the utterance
    speechSynthesis.speak(utterance); // Speak the text
  };

  const sendMessage = async (text, inp_lang, output_language) => {
    const newMessage = { text, isUser: true };
    setMessages((prev) => [...prev, newMessage]);
    try {
      const response = await axios.post(
        'https://nkbnj96j-5000.inc1.devtunnels.ms/translate-api',
        { text: text, src_language: inp_lang, dest_language: output_language },
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', // Include this header if the server expects it
            // Include any other headers the server might need
          },
        }
      );
      const botMessage = { text: response.data.response, isUser: false, language: output_language };
      setMessages((prev) => [...prev, botMessage]);
  
      // Save the response to Firebase Realtime Database
      const db = getDatabase();
      const messagesRef = ref(db, 'messages');
      const newMessageRef = push(messagesRef);
      set(newMessageRef, {
        text: response.data.response,
        isUser: false,
        language: output_language,
      });
    } catch (error) {
      console.error('API error:', error);
      const errorMessage = { text: 'Error communicating with the chatbot service.', isUser: false };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  useEffect(() => {
    // Scroll chat container to bottom when new message arrives
    chatContainerRef.current.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log('User signed out successfully');
        navigate(`/`)
        // Redirect to the login page or any other page you want
        // You can use react-router-dom's useHistory hook or navigate function from react-router-dom
      })
      .catch((error) => {
        // An error happened.
        console.error('Sign-out error:', error);
      });
  };

  return (
    <Container>
      <ChatContainer>
        <Header>
          <UserInfo>
            <ProfileImage src={userProfilePic} alt="Profile" />
            <div>
              <UserName>{userName}</UserName>
            </div>
          </UserInfo>
          <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
        </Header>
        <MessagesContainer ref={chatContainerRef}>
          {messages.map((msg, index) => (
            <Message key={index} isUser={msg.isUser}>
              {msg.isUser ? (
                <>
                  <span>{msg.text}</span>
                  <ProfileImage src={userProfilePic} alt="Profile" />
{msg.language && (
<SpeakerButton onClick={() => readAloud(msg.text, msg.language)}>
<SpeakerIcon />

</SpeakerButton>
)}
</>
) : (
<>
<BotIcon src="https://pipedream.com/s.v0/app_OQYhyP/logo/orig" alt="Bot" />
<span>{msg.text}</span>
{msg.language && (
<SpeakerButton onClick={() => readAloud(msg.text, msg.language)}>
<SpeakerIcon />

</SpeakerButton>
)}
</>
)}
</Message>
))}
</MessagesContainer>
<ChatInput sendMessage={sendMessage} />
</ChatContainer>
</Container>
);
}

export default ChatbotScreen;
