import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";

const Message = ({message, senderId}) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe =  senderId === authUser?._id;
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const profilePic = fromMe ? authUser.profilPic : selectedConversation?.profilPic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  return (
    <div className={`chat ${chatClassName}`}>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img 
                    src={profilePic} 
                    alt="Tailwind CSS chat bubble component" 
                />
            </div>
        </div>
        <div className={`chat-bubble text-white ${bubbleBgColor}`}>{message}</div>
        <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>12:42</div>
    </div>
  )
};

export default Message;