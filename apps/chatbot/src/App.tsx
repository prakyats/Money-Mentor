import { ChatProvider } from './contexts/ChatContext';
import ChatBot from './components/ChatBot';

function App() {
  const embedded =
    typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('embed') === '1';

  return (
    <div className={embedded ? 'h-full w-full' : 'relative size-fit min-h-screen w-full'}>
      <ChatProvider embedded={embedded}>
        <ChatBot />
      </ChatProvider>
    </div>
  );
}

export default App;