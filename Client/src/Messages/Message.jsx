import UserInitials from "../Users/UserInitials";


function Message({ message }) {
    if (message.self) {
        return (
            <div className="selfMessage">
                <div className="selfMessageBody">{message.body}</div>
                <div className="time">{message.time}</div>
            </div>
        )
    } else {
        const sender = message.sender;
        return (
            <div className="otherMessage">
                <div className="senderName">{sender.firstName}</div>
                <div className="otherMessageBody">{message.body}</div>
                <div className="messageUnder">
                    <UserInitials firstName={sender.firstName}
                        lastName={sender.lastName} id={sender.id} />
                    <div className="timeUnder">{message.time}</div>
                </div>
            </div>
        )
    }
}

export default Message;