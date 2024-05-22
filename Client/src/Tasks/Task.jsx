import UserInitials from "../Users/UserInitials";
import "./Task.css";

function Task(task) {

    task = task.task;
    const key = task.task_id;
    const people = task.people;
    const peopleIcons = people.slice(0, 2).map((person) => (
        <UserInitials key={person.id} firstName={person.first_name} lastName={person.last_name} />
    ))

    if (people.length > 2) {
        peopleIcons.push(<span key="additional">+{people.length - 2}</span>);
    }

    const statusResources = {
        "not_started": "./src/assets/not_started.svg",
        "in_progress": "./src/assets/in_progress.svg",
        "overdue": "./src/assets/overdue.svg"
    }

    if (task.date_completed) {
        return (
            <tr key={key} className="task">
                <td className="name_column">{task.task_name}</td>
                <td className="department_column">{task.date_completed}</td>
                <td className="department_column"><a className="view_details">View Details</a></td>
            </tr>
        )
    } else {
        return (
            <tr key={key} className="task">
                <td className="name_column">{task.task_name}</td>
                <td className="status_column"><img src={statusResources[task.status]} alt={task.status}
                    className={"status"} /></td>
                <td className="people_column">{(peopleIcons)}</td>
                <td className="date_column">{task.date}</td>
                <td className="department_column">{task.department}</td>
            </tr>
        )
    }
}

export default Task;