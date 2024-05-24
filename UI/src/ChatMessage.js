import React from 'react';
import styled from 'styled-components';

const Message = styled.div`
  display: flex;
  justify-content: ${({ user }) => (user === 'me' ? 'flex-end' : 'flex-start')};
  padding: 5px;
`;

const MessageBubble = styled.div`
  max-width: 60%;
  padding: 10px;
  background-color: ${({ user }) => (user === 'me' ? '#4a76a8' : '#e5e5ea')};
  color: ${({ user }) => (user === 'me' ? 'white' : 'black')};
  border-radius: 10px;
  margin: 5px;
`;

function ChatMessage({ text, user }) {
  return (
    <Message user={user}>
      <MessageBubble user={user}>{text}</MessageBubble>
    </Message>
  );
}

export default ChatMessage;
