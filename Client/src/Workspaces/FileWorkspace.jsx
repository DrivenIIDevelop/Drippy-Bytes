import FileList from "../Files/FileList";
import Workspaces from "./Workspaces";

function FileWorkspace() {
    return(
        <div className="flex-horizontal">
            <Workspaces/>
            <FileList />
        </div>
    );
}

export default FileWorkspace;