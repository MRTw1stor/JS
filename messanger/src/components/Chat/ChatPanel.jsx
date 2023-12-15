import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./ChatPanel.modules.css";

const ChatPanel = () => {
    const [newMessage, setNewMessage] = useState("");
    const [openedChat, setOpenedChat] = useState(false);
    const [chatCard, setChatCard] = useState({});
    const [chatMessages, setChatMessages] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [uploadName, setUploadName] = useState('');

    const [chats, setChats] = useState([
        {
            id: 1,
            name: "Ivan",
            surname: "Ivanov",
            create_date: new Date(),
        },
        {
            id: 2,
            name: "Nikita",
            surname: "Petrov",
            create_date: new Date(),
        },
    ]);

    const [filteredChats, setFilteredChats] = useState(chats);

    useEffect(() => {
        setFilteredChats(chats);
    }, [chats])

    const messages = [
        {
            id: 1,
            chat_id: 1,
            user_id: 1,
            message: "Hello",
        },
        {
            id: 2,
            chat_id: 1,
            user_id: 1,
            message: "How are you?",
        },
        {
            id: 3,
            chat_id: 2,
            user_id: 1,
            message: "Hi",
        },
        {
            id: 4,
            chat_id: 2,
            user_id: 1,
            message: "You have a some money?",
        },
    ];

    const onDrop = (acceptedFiles) => {
        const newUploadedFiles = acceptedFiles.map(file => ({
            name: file.name,
            size: file.size
        }));

        setUploadedFiles([...uploadedFiles, ...newUploadedFiles]);
        setUploadName(acceptedFiles[0].name);

        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            setUploadedImage(event.target.result);
        };

        reader.readAsDataURL(file);
    };


    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    const [uploadedImage, setUploadedImage] = useState("");

    const convertDate = (item) => {
        const [dayName, dayNumber, month, year] = item.create_date
            .toUTCString()
            .split(" ");

        const newDate = `${dayName} ${dayNumber} ${month} ${year}`;
        return newDate;
    };

    const openChat = (id) => {
        for (let i = 0; i < chats.length; i++) {
            if (chats[i].id === id) {
                const chatMessagesForChat = messages.filter(
                    (msg) => msg.chat_id === chats[i].id
                );
                setChatCard(chats[i]);
                setChatMessages(chatMessagesForChat);
                setOpenedChat(!openedChat);
            }
        }
    };

    useEffect(() => {
        let updatedChats = filteredChats.map((item) => {
        const lastMessage = messages
            .filter((msg) => msg.chat_id === item.id)
            .pop();
        return {
            ...item,
            lastMessage: lastMessage ? lastMessage.message : "",
        };
        });
        setFilteredChats(updatedChats);
    }, []);

    const onCreateChat = (name, surname) => {
        const newChat = {
            id: filteredChats.length + 1,
            name: name,
            surname: surname,
            create_date: new Date(),
        };

        setChats([...chats, newChat]);
    };

    const onSearchChat = (value) => {
        const filteredChats = chats.filter((item) =>
        (item.name + " " + item.surname).toLowerCase().includes(value.trim().toLowerCase())
        );
        setFilteredChats(filteredChats);
    };

    const addMessage = (chat_id, user_id, message, imageUrl) => {
        if (!newMessage && !imageUrl) {
            return;
        }
        
        const newChatMessages = [
            ...chatMessages,
            {
                id: chatMessages.length + 1,
                chat_id: chat_id,
                user_id: user_id,
                message: message,
                imageUrl: imageUrl
            },
        ];
        setChatMessages(newChatMessages);
        setUploadedFiles([]);
        setUploadName('');
        setNewMessage(''); 
    };

    const handleSendButtonClick = (ev) => {
        ev.stopPropagation(); 
        addMessage(chatCard.id, 1, newMessage, uploadedImage);
        setNewMessage('');
        setUploadedImage("");
    };

    return (
        <div id="chatPanel">
            <div id="head">
                <div id="title">
                    <span id="Chat">Chats</span>
                    <button id="newchat">
                        <span
                            id="newchattext"
                            onClick={() => {
                                const name = prompt("Введите имя: ");
                                const surname = prompt("Введите фамилию: ");
                                onCreateChat(name, surname);
                            }}
                        >
                            Create new Chat
                        </span>
                    </button>
                </div>
                <div id="search">
                    <input
                        id="searchchat"
                        type="text"
                        placeholder="Search"
                        onChange={(ev) => onSearchChat(ev.target.value)}
                    />
                </div>
                <div id="chats_block">
                    {filteredChats.map((item, key) => (
                        <div key={key} id="chat_item" onClick={() => openChat(item.id)}>
                            <div id="photoandtext">
                                <div id="user_photo">
                                    <img src="./img/petr.svg" alt="home" width={75} height={75}/>
                                </div>
                                <div id="nameanddate">
                                    <div id="namechat">
                                        <span id="chatnames">
                                            {item.name} {item.surname}
                                        </span>
                                    </div>
                                    <div id="chatcreate">
                                        <span id="chatcreate">Чат создан: {convertDate(item)}</span>
                                    </div>
                                </div>
                            </div>
                            {item.lastMessage && (
                                <span id="lastMessage">Последнее сообщение: {item.lastMessage}</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div id="opened_chat">
                {openedChat ? (
                    <div id="chat">
                        <div id="chatname">
                            <div id="chatphoto">
                                <img src="./img/petr.svg" alt="home" width={75} height={75}/>
                            </div>
                            <div id="namechattext">
                                <span id="chatnametext">
                                    {chatCard.name +" "+ chatCard.surname}
                                </span>
                            </div>
                        </div>
                        <div id="messages">
                            {chatMessages.map((msg, key) => (
                                <div id="message" key={key}>
                                    <span id="messagetext">{msg.message}</span>
                                    {msg.imageUrl && (
                                        <div id="uploadedImageContainer">
                                            <img src={msg.imageUrl} alt="Uploaded" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div id="newmessage">
                            <input
                                id="newmessageinput"
                                type="text"
                                placeholder="Type a message here"
                                value={newMessage}
                                onChange={(ev) => setNewMessage(ev.target.value)}
                                onKeyDown={(ev) => {
                                    if (ev.key === "Enter") {
                                        addMessage(chatCard.id, 1, newMessage, uploadedImage); 
                                        setNewMessage('');
                                    }
                                }}
                            />
                            <div id="uploadedFiles">
                                {uploadedFiles.map((file, index) => (
                                    <span id="chosindfail" key={index}>{file.name}</span>
                                ))}
                            </div>
                            <div {...getRootProps()} id="fileDropZone">
                                <input {...getInputProps()} />
                                <button id="chosephoto">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                        <rect x="-3" y="-3" width="24" height="24" fill="white"/>
                                    </svg>
                                </button>
                            </div>
                            <button
                                id="send_btn"
                                onClick={handleSendButtonClick}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <rect x="-1" y="-3" width="20" height="20" fill="white"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default ChatPanel;