import { CiMail } from "react-icons/ci";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [formErrors, setFormErrors] = useState([]);

    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await login(formData);
        if (result.success) {
            useNavigate("/tasks");
        } else {
            setFormErrors(result.errors);
        }
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(l => ({ ...l, [name]: value }));
    }

    return (
        <div className="LoginFormContainer">
            <h3>Log In</h3>
            <form onSubmit={handleSubmit} className="LoginForm">
                <div className="card">
                    <label>Email</label>
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                    />
                </div>
                <div className="card">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                        required
                    />
                </div>

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null}

                <button
                    onSubmit={handleSubmit}
                    className={"auth"}
                >
                    Log In
                </button>
            </form>
        </div>
    );

}

export default LoginForm;