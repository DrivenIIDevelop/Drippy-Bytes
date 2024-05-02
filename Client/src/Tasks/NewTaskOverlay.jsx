import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import './NewTaskOverlay.css';

function NewTaskOverlay(stopCreatingTask) {
    const [newTask, setNewTask] = useState({
        name: "",
        description: "",
        assigned_to: "",
        due_date: "",
        department: "",
    });

    function handleChange(evt) {
        const { name, value } = evt.target;
        setNewTask(l => ({ ...l, [name]: value }));
    }

    function handleSubmit(evt) {
        evt.prevent_default();
        stopCreatingTask();
    }

    return (
        <div className="NewTaskOverlay">
            <div className="OverlayBar">
                <p>Create New Task</p>
                <button className="transparent-button" onClick={stopCreatingTask}>
                    <IoMdClose />
                </button>
            </div>
            <div>
                <form className="NewTaskForm">
                    <div className="task_name">
                        <label className="task_name">Task Name</label>
                        <input
                            className="task_name"
                            type="text"
                            name="task_name"
                            value={newTask.task_name}
                            onChange={handleChange}
                            autoComplete="task_name"
                        />
                    </div>
                    <div className="description">
                        <label className="description">Description</label>
                        <input
                            className="description"
                            type="text"
                            name="description"
                            value={newTask.description}
                            onChange={handleChange}
                            autoComplete="description"
                        />
                    </div>
                    <div className="assigned_date_department">
                        <div className="assigned">
                            <label className="assigned">Assigned to</label>
                            <select name="assigned" className="assigned">
                                <option value="etti">Etti</option>
                                <option value="mark">Mark</option>
                                <option value="martins">Martins</option>
                                <option value="tahmina">Tahmina</option>
                                <option value="chase">Chase</option>
                                <option value="miriam">Miriam</option>
                            </select>
                        </div>
                        <div className="date">
                            <label className="date">Due Date</label>
                            <input
                                className="date"
                                type="date"
                                name="due_date"
                                placeholder="mm/dd/yyyy"
                                value={newTask.due_date}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="department">
                            <label className="department">Department</label>
                            <select name="department" className="department">
                                <option value="research">Research</option>
                                <option value="design">Design</option>
                                <option value="development">Development</option>
                                <option value="all">All</option>
                            </select>
                        </div>
                    </div>

                    <div className="final_buttons">
                        <div><button className="cancel" onClick={handleSubmit}>Cancel</button></div>
                        
                        <div><button className="save" onClick={handleSubmit}>Save Task</button></div>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default NewTaskOverlay;