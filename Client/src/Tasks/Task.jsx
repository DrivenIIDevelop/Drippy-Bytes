import UserInitials from "../Users/UserInitials";

function Task(task) {
    task = task.task;
    const people = task.people;
    let peopleIcons = [];
    if (people.length > 2) {
        peopleIcons.push(<UserInitials firstName={people[0].first_name}
            lastName={people[0].last_name} />, <UserInitials firstName={people[1].first_name}
                lastName={people[1].last_name} />,
            `+${people.length - 2}`);
    } else if (people.length > 0) {
        peopleIcons.push(<UserInitials firstName={people[0].first_name}
            lastName={people[0].last_name} />);
        if (people[1]) {
            peopleIcons.push(<UserInitials firstName={people[1].first_name}
                lastName={people[1].last_name} />);
        }
    }

    const statusResources = {
        "not_started": "./src/assets/not_started.svg",
        "in_progress": "./src/assets/in_progress.svg",
        "overdue": "./src/assets/overdue.svg"
    }

    if (task.date_completed) {
        return (
            <tr className="task">
                <td className="name_column">{task.task_name}</td>
                <td className="department_column">{task.date_completed}</td>
                <td className="department_column"><a className="view_details">View Details</a></td>
            </tr>
        )
    } else {
        return (
            <tr className="task">
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