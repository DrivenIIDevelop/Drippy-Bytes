import Task from "./Task";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import "./TaskList.css";


function TaskList() {
    const [userTasks, setUserTasks] = useState(
        {
            completed: [
                {
                    task_name: "Kickoff Meeting",
                    status: "in_progress",
                    people: [{ first_name: "Maraiah", last_name: "Carey" }],
                    date: "May 3",
                    department: "Research",
                    date_completed: "April 20"
                }
            ], incomplete: [{
                task_name: "Create User Stories",
                status: "in_progress",
                people: [{ first_name: "Maraiah", last_name: "Carey" }],
                date: "May 3",
                department: "Research"
            },
            {
                task_name: "Prepare Visual Inspiration",
                status: "not_started",
                people: [{ first_name: "Maraiah", last_name: "Carey" },
                { first_name: "Dewey", last_name: "Cox" }],
                date: "May 3",
                department: "Design"
            },
            {
                task_name: "Create User Flows",
                status: "not_started",
                people: [{ first_name: "Dewey", last_name: "Cox" },
                { first_name: "Ricky", last_name: "Bobby" }],
                date: "May 7",
                department: "Research"
            },
            {
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
                <div className="button_div">
                    <button className="create_task">+Create a Task</button>
                </div>
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