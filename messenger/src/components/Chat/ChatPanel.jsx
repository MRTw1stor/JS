import "./ChatPanel.modules.css"

const ChatPanel = () =>{
    return(
        <div id="chatPanel">
            <div id="head">
                <span id="Chat">Chats</span>
                <button id="newchat">
                    <span id="newchattext">Create new Chat</span>
                </button>
            </div>
            <div id="search">
                <input id="searchchat" type="text" placeholder="Search"/>
            </div>
        </div>
    )
}

export default ChatPanel