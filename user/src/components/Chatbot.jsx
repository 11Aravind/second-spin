// import React, { useState } from 'react';
// import './CSS/chatbot.css';

// const Chatbot = () => {
//   const [chatHistory, setChatHistory] = useState([]);
//   const [userMessage, setUserMessage] = useState('');
//   const [chatVisible, setChatVisible] = useState(true); // Chat is always visible

//   const handleSendMessage = async () => {
//     if (userMessage.trim() === '') return;

//     const response = await fetch('http://localhost:5000/chat', { // Update with your Flask server URL
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ message: userMessage })
//     });
//     const data = await response.json();
//     setChatHistory([...chatHistory, { type: 'user', message: userMessage }, { type: 'bot', message: data.response }]);
//     setUserMessage('');
//   };

//   return (
//     <div>
//       {chatVisible && (
//         <div className='main'>
//           <div className="chatbot-container">
//             <div className="chatbot-header">
//               <h2>Chat With Your AI Assistant</h2>
//             </div>
//             <div id="chat-history" className="chatbot-history">
//               {chatHistory.map((chat, index) => (
//                 <div key={index} className={`chat-message ${chat.type}-message`}>
//                   {chat.message}
//                 </div>
//               ))}
//             </div>
//             <div className="chatbot-input">
//               <input 
//                 type="text" 
//                 value={userMessage} 
//                 onChange={(e) => setUserMessage(e.target.value)} 
//                 placeholder="Type your message" 
//               />
//               <button onClick={handleSendMessage}>Send</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chatbot;
import React, { useState } from 'react';
import './CSS/chatbot.css';

const Chatbot = ({ onClose }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [userMessage, setUserMessage] = useState('');

  const handleSendMessage = async () => {
    if (userMessage.trim() === '') return;

    const response = await fetch('http://localhost:5000/chat', { // Update with your Flask server URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: userMessage })
    });
    const data = await response.json();
    setChatHistory([...chatHistory, { type: 'user', message: userMessage }, { type: 'bot', message: data.response }]);
    setUserMessage('');
  };

  return (
    <div className='mains'>
      <div className="chatbot-container">
        <div className="chatbot-header">
          <h6>AI Assistant</h6>
          <button className="chatbot-close" onClick={onClose}>&times;</button>
        </div>
        <div id="chat-history" className="chatbot-history">
          {chatHistory.map((chat, index) => (
            <div key={index} className={`chat-message ${chat.type}-message`}>
              {chat.message}
            </div>
          ))}
        </div>
        <div className="chatbot-input">
          <input 
            type="text" 
            value={userMessage} 
            onChange={(e) => setUserMessage(e.target.value)} 
            placeholder="Type your message" 
          />
          <button onClick={handleSendMessage}  className="sendBtn">
            <img src="./images/send.png" alt="send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
