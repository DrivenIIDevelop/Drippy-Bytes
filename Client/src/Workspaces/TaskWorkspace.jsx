import TaskList from "../Tasks/TaskList";
import Workspaces from "./Workspaces";

function TaskWorkspace() {
    return(
        <div className="flex-horizontal">
            <Workspaces/>
            <TaskList />
        </div>
    )
}

export default TaskWorkspace;