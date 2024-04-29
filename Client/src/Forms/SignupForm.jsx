import { CiMail } from "react-icons/ci";
import {useState} from "react";
import { useNavigate } from "react-router-dom";


//add signup details
function SignupForm() {
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
        <div className="LoginForm">
            <div>
                <h3>Log In</h3>
                <div>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>Email</label>
                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    required
                                />
                            </div>
                            <div>
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
                                Sign Up
                            </button>
                        </form>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default SignupForm;