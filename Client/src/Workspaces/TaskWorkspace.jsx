import NavBar from "../Navigation/NavBar";
import TaskList from "../Tasks/TaskList";
import Workspaces from "./Workspaces";

function TaskWorkspace() {
    return(
        <div>
            <Workspaces/>
            <TaskList />
        </div>
    )
}

export default TaskWorkspace;