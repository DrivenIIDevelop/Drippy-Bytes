import Task from "./Task";
import { useState } from "react";

function TaskList() {
    const [userTasks, setUserTasks] = useState([]);

    if (userTasks.length === 0){
        return(<div>No Tasks Yet</div>)
    } else {
        return(userTasks.map((t) => <Task task={t}/>));
    }
}

export default TaskList;