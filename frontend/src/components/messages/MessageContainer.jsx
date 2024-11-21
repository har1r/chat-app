import { useEffect } from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';
import { TiMessages } from 'react-icons/ti';
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
    const {authUser} = useAuthContext();
    const {selectedConversation, setSelectedConversation} = useConversation();

    useEffect(() => {
        // cleanup function (unmounts)
        // Perubahan state melalui setSelectedConversation tidak memicu useEffect, 
        // karena React tidak melihat perubahan nilai state melainkan hanya perubahan referensi fungsi
        return () => setSelectedConversation(null)
    }, [setSelectedConversation]);

  return (
    <div className='md:min-w-[450px] flex flex-col'>
        {!selectedConversation ? (
            <NoChatSelected />
        ):(
            <>
                {/* Header */}
                <div className='bg-slate-500 px-4 py-2 mb-2 flex justify-between'>
                    <div>
                        <span className='label-text'>To:&nbsp;</span>
                        <span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
                    </div>
                    <div>
                    <span className='label-text'>from:&nbsp;</span>
                    <span className='text-gray-900 font-bold'>{authUser.fullName}</span>
                    </div>
                </div>

                <Messages />
                <MessageInput />
            </>
        )}
    </div>
  )
};

export default MessageContainer;

const NoChatSelected = () => {
    return (
        <div className='flex items-center justify-center w-full h-full'>
        <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
            <p>Welcome 👋 Jhon Doe ❄</p>
            <p>Select a chat to start messaging</p>
            <TiMessages className='text-3xl md:text-6xl text-center' />
        </div>
    </div>
    )
  };