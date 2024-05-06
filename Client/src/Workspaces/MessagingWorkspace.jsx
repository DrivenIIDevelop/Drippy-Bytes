import ConversationList from "../Messages/ConversationList";
import MessageBox from "../Messages/MessageBox";
import Workspaces from "./Workspaces";

function MessagingWorkspace() {
    return(
        <div className="flex-horizontal">
            <Workspaces/>
            <MessageBox />
            <ConversationList />
        </div>
    );
}

export default MessagingWorkspace;