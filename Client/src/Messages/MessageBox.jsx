import Message from "./Message";
import { useState } from "react";
import { CiSearch, CiFaceSmile } from "react-icons/ci";
import { FaEllipsisH } from "react-icons/fa";
import { MdNotificationsNone } from "react-icons/md";
import "./MessageBox.css";

function MessageBox() {
    const [activeConversationMessages, setActiveConversationMessage] = useState([{
        self: false,
        sender: { id: "8", firstName: "Alex", lastName: "Larp" },
        body: "Hey guys, I am providing an update. Research has completed competitive analysis and is starting user flows",
        time: "7:13 PM"
    },
    {
        self: true,
        sender: { id: "8", firstName: "Alex", lastName: "Larp" },
        body: "Sounds good.",
        time: "7:53 PM"
    },
    {
        self: false,
        sender: { id: "8", firstName: "Alex", lastName: "Larp" },
        body: "Is anybody available for a quick meeting?",
        time: "3:19 PM"
    },
    {
        self: false,
        sender: { id: "9", firstName: "Penny", lastName: "Pank" },
        body: "I will be online in about 15 min.",
        time: "3:19 PM"
    },
    {
        self: false,
        sender: { id: "8", firstName: "Alex", lastName: "Larp" },
        body: "Great! \n Talk to you soon.",
        time: "3:19 PM"
    },
    {
        self: true,
        sender: { id: "8", firstName: "Alex", lastName: "Larp" },
        body: "I'll be there too!",
        time: "3:29 PM"
    }
    ]);

    const messages = activeConversationMessages.map((message) => <Message message={message} />);

    return (
        <div className="MessageBox">
            <div className="messageBoxBar">
                <div className="conversationHeader">Cobra Tech</div>
                <div className="messageBoxImages">
                    <MdNotificationsNone className="notification_icon"/>
                    <CiSearch className="search_icon" />
                    <FaEllipsisH className="ellipsis" />
                </div>
            </div>
            <div className="messageBoxMain">
                {messages}
            </div>
            <form className="sendChatForm">
                <button className="sendMessage">+</button>
                <input type="text" className="outgoingMessage"
                placeholder="Type Message Here..."/>
                <CiFaceSmile className="chatSmile"/>
            </form>
        </div>
    )
}

export default MessageBox;