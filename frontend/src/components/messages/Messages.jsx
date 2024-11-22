import Message from './Message';
import useGetMessages from '../../hooks/useGetMessages';
import MessageSkeleton from '../skeletons/MessageSkeleton';

const Messages = () => {
  const { messages, loading } = useGetMessages();
  return (
    <div className='px-4 flex-1 overflow-auto'>
      {!loading && messages && messages.length > 0 && messages.map((message) => {
        if (!message || !message.message || !message.senderId) {
          console.error("Invalid message object:", message);
          return null; // Abaikan pesan yang tidak valid
        }
        return <Message key={message._id} message={message.message} senderId={message.senderId} />
      })}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} /> )}
      {!loading && messages.length === 0 && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}
    </div>
  )
};

export default Messages;