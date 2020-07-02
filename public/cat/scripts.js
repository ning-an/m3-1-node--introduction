// here there be JS, yarrr ☠️
const messageInput = document.querySelector('#user-input');
const conversationElem = document.querySelector('#conversation-container');

const handleFocus = () => {
    messageInput.focus();
}


const updateConversation = (message) => {
    const { author, text } = message;
    const messageElem =  document.createElement('p');
    messageElem.innerHTML = `<span>${text}</span>`;
    messageElem.classList.add('message', author);
    conversationElem.appendChild(messageElem);
    if (author === 'user') messageInput.value = '';
    handleFocus();
    conversationElem.scrollTop = conversationElem.scrollHeight;
}

const sendMessage = (e) => {
    e.preventDefault();
    const message = { author: 'user', text: messageInput.value};
    updateConversation(message);
    fetch('/cat-message')
        .then( res => res.json() )
        .then( data => updateConversation(data.message) )
}

handleFocus();
