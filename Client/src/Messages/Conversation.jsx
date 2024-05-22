import UserInitials from "../Users/UserInitials";


function Conversation(conversation) {
    conversation = conversation.conversation;
    const {id, firstName, lastName} = conversation.people[0];
    const {from, message} = conversation.latestMessage;

    return (
        <div key={conversation.key} className="Conversation">
            <UserInitials firstName={firstName} lastName={lastName} id={id} />
            <div className="conversationPreview">
                <div className="conversationName">{conversation.name}</div>
                <div className="conversationPreviewMessage">{from}: {message}</div>
            </div>
        </div>);
}

export default Conversation;