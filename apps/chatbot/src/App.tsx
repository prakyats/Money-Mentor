import React from 'react';
import { ChatProvider } from './contexts/ChatContext';
import ChatBot from './components/ChatBot';

function App() {
  return (
    <div className=" flex relative size-fit">
      <ChatProvider>
        <ChatBot />
      </ChatProvider>
    </div>
  );
}

export default App;