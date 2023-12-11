import React, { useEffect, useState } from "react";
import "./ChatPanel.modules.css";

const ChatPanel = () => {
    const [newMessage, setNewMessage] = useState("");
    const [openedChat, setOpenedChat] = useState(false);
    const [chatCard, setChatCard] = useState({});
    const [chatMessages, setChatMessages] = useState([]);
    const [filteredChats, setFilteredChats] = useState([]);

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
            user_id: 2,
            message: "Hello, how are you?",
        },
    ];

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
        setFilteredChats(chats);

        const filteredChats = chats.filter(item => item.name.toLowerCase().includes(value.toLowerCase().trim()) || item.surname.toLowerCase().includes(value.toLowerCase().trim()));
        setFilteredChats(filteredChats);
    };

    return (
        <div id="chatPanel">
            <div>
                <div id="head">
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
                            <span>
                                {item.name} {item.surname}
                            </span>
                            <span>Чат создан: {convertDate(item)}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div id="opened_chat">
                {openedChat ? (
                    <div>
                        <div>
                            <span>
                                {chatCard.name} {chatCard.surname}
                            </span>
                            <br />
                            {chatMessages.map((msg, key) => (
                                <div key={key}>
                                    <span>{msg.message}</span>
                                </div>
                            ))}
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Input new message"
                                value={newMessage}
                                onChange={(ev) => setNewMessage(ev.target.value)}
                                onKeyDown={(ev) => {
                                    if (ev.key === "Enter") {
                                        const newChatMessages = [
                                            ...chatMessages,
                                            {
                                                id: chatMessages.length + 1,
                                                chat_id: chatCard.id,
                                                user_id: 1,
                                                message: newMessage
                                            }
                                        ]
                                        setChatMessages(newChatMessages);
                                        setNewMessage('');
                                    }
                                }}
                            />
                            <button
                                id="send_btn"
                                onClick={() => {
                                    const newChatMessages = [
                                        ...chatMessages,
                                        {
                                            id: chatMessages.length + 1,
                                            chat_id: chatCard.id,
                                            user_id: 1,
                                            message: newMessage,
                                        },
                                    ];

                                    setChatMessages(newChatMessages);
                                    setNewMessage('');
                                }}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default ChatPanel;