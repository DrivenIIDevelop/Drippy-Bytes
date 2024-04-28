import UserInitials from "../Users/UserInitials";
import "./Task.css"

function Task(task, people, completed) {
    task = task.task;
    const fakeFriends = [{ firstName: "John", lastName: "Doe" },
    { firstName: "Bob", lastName: "Saget" }];
    people = fakeFriends;
    console.log(people);
    let peopleIcons = [];
    if (people.length > 2) {
        peopleIcons.push(<UserInitials firstName={people[0].firstName}
            lastName={people[0].lastName} />, <UserInitials firstName={people[1].firstName}
                lastName={people[1].lastName} />,
            "+" + people.length - 2);
    } else if (people.length > 0) {
        peopleIcons.push(<UserInitials firstName={people[0].firstName}
            lastName={people[0].lastName} />);
        peopleIcons.push(<UserInitials firstName={people[1].firstName}
            lastName={people[1].lastName} />);
    }

    const statusResources = {
        "not_started": "./src/assets/not_started.svg",
        "in_progress": "./src/assets/in_progress.svg",
        "overdue": "./src/assets/overdue.svg"
    }

    console.log(peopleIcons)

    if (completed) {
        return (
            <div className="task">
                {task.task_name}
                | {task.date_completed}
                | <a>View Details</a>
            </div>
        )
    } else {
        return (
            <div className="task">
                {task.task_name}
                | <img src={statusResources[task.status]} alt={task.status} 
                    className={"status"}/>
                | {(peopleIcons)}
                | {task.due_date}
                | {task.department}
            </div>
        )
    }
}

export default Task;