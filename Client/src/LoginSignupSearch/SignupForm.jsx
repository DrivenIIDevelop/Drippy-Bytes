import { CiMail } from "react-icons/ci";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectPulseApi from "../api/api";


function SignupForm() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const [formErrors, setFormErrors] = useState([]);

    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await ProjectPulseApi.signup(formData);
        if (result.first_name) {
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
        <div className="SignupFormContainer">
            <h3>Sign Up</h3>
                    <form onSubmit={handleSubmit} className="SignupForm">
                        <div className="signupNames">
                            <div className="card half">
                                <label>First Name</label>
                                <input
                                    name="first_name"
                                    placeholder="John"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    autoComplete="first_name"
                                    required
                                    className="half"
                                />
                            </div>
                            <div className="card half">
                                <label>Last Name</label>
                                <input
                                    name="last_name"
                                    placeholder="Doe"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    autoComplete="last_name"
                                    required
                                />
                            </div>
                        </div>
                        <div className="card">
                            <label>Email</label>
                            <input
                                name="email"
                                placeholder="example@gmail.com"
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
                                autoComplete="new-password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="card">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                name="confirm_password"
                                autoComplete="new-password"
                                value={formData.confirm_password}
                                onChange={handleChange}
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
                            Sign Up
                        </button>
                    </form>
        </div>
    );

}

export default SignupForm;