import Conversation from "./Conversation";
import { useState } from "react";
import "./ConversationList.css";


function ConversationList() {
    const [userConvos, setUserConvos] = useState([
        {
            id: 0,
            name: "Cobra Tech",
            people: [{ firstName: "Cobra", lastName: "Tech", id: "7" }],
            latestMessage: { from: "You", message: "Sounds good!" }
        },
        {
            id: 1,
            name: "Alex",
            people: [{ firstName: "Alex", lastName: "Locke", id: "8" }],
            latestMessage: { from: "Alex", message: "Can we meet later today?" }
        },
        {
            id: 2,
            name: "Penny",
            people: [{ firstName: "Penny", lastName: "Pank", id: "9" }],
            latestMessage: { from: "You", message: "Updates are completed, if..." }
        },
    ]);

    const conversations = userConvos.map((convo) =>(
        <Conversation key={convo.id} conversation={convo} />
    ))

    return (
        <div className="ConversationList">
            <div className="conversationsBar">
                <div className="conversationsHeader">Conversations</div>
                <button className="addConversation">+</button>
            </div>
            <div className="conversationBox">
                {conversations}
            </div>
        </div>
    )
}

export default ConversationList;