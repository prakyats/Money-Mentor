import React from 'react';
import { ChatProvider } from './contexts/ChatContext';
import ChatBot from './components/ChatBot';

function App() {
  return (
    <div className="relative size-fit min-h-screen w-full">
      <ChatProvider>
        <ChatBot />
      </ChatProvider>
    </div>
  );
}

export default App;