import Task from "./Task";
import { startTransition, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import NewTaskOverlay from "./NewTaskOverlay";
import "./TaskList.css";


function TaskList() {
    const [creatingTask, setCreatingTask] = useState(false);
    const [userTasks, setUserTasks] = useState(
        {
            completed: [
                {
                    task_id: 0,
                    task_name: "Kickoff Meeting",
                    status: "in_progress",
                    people: [{ first_name: "Maraiah", last_name: "Carey" }],
                    date: "May 3",
                    department: "Research",
                    date_completed: "April 20"
                }
            ], incomplete: [{
                task_id: 1,
                task_name: "Create User Stories",
                status: "in_progress",
                people: [{ first_name: "Maraiah", last_name: "Carey" }],
                date: "May 3",
                department: "Research"
            },
            {
                task_id: 2,
                task_name: "Prepare Visual Inspiration",
                status: "not_started",
                people: [{ first_name: "Maraiah", last_name: "Carey" },
                { first_name: "Dewey", last_name: "Cox" }],
                date: "May 3",
                department: "Design"
            },
            {
                task_id: 3,
                task_name: "Create User Flows",
                status: "not_started",
                people: [{ first_name: "Dewey", last_name: "Cox" },
                { first_name: "Ricky", last_name: "Bobby" }],
                date: "May 7",
                department: "Research"
            },
            {
                task_id: 4,
                task_name: "Finalize Database Structure",
                status: "not_started",
                people: [{ first_name: "Chase", last_name: "Winner" },
                { first_name: "Mike", last_name: "So" },
                { first_name: "Toby", last_name: "Bro" },
                { first_name: "Sev", last_name: "Very" }],
                date: "May 10",
                department: "Development"
            }
            ]
        });



    function flipCreatingTask() {
        setCreatingTask(!creatingTask);
    }


    if (userTasks.completed.length === 0 && userTasks.incomplete.length == 0) {
        return (<div>No Tasks Yet</div>)
    } else {
        return (
            <div className="TaskList">
                <h3 className="TaskDropdown">All Tasks(6) <FaAngleDown /></h3>
                <table>
                    <thead>
                        <tr className="headers">
                            <th>Task Name</th>
                            <th>Status</th>
                            <th>People</th>
                            <th>Date</th>
                            <th>Department</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userTasks.incomplete.map((t) => <Task task={t} />)}
                    </tbody>
                </table>
                <br />
                {creatingTask === true ?
                    <div className="modal">
                    <NewTaskOverlay stopCreatingTask={flipCreatingTask} />
                    </div>
                    :
                    <div className="button_div">
                        <button className="create_task" onClick={flipCreatingTask}
                        >+Create a Task</button>
                    </div>}
                <br />
                <table>
                    <thead>
                        <tr className="headers">
                            <th>Task Name</th>
                            <th>Date Completed</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userTasks.completed.map((t) => <Task task={t} completed="true" />)}
                    </tbody>
                </table>
            </div>);
    }
}

export default TaskList;