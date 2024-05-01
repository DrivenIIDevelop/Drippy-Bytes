import SignupForm from "./SignupForm"
import LoginForm from "./LoginForm"
import "./LoginSignupLayout.css"
import { Link } from "react-router-dom";


function LoginSignupLayout(mode) {
    const specifiedForm = (mode.mode === "login") ? <LoginForm /> : <SignupForm />;
    
    const redirectRegister = (mode.mode === "login") ?
        (<div className="FormDataFlex">
            <img src="./src/assets/login-Google-full.png" />
            <img src="./src/assets/login-Apple-full.png" />
            <p>Don't have an account with us? <Link to="/signup">Sign Up</Link></p>
        </div>
        )
        :
        (<div>
            <div className="flex-horizontal">
                <img src="../src/assets/signup-Google-half.jpg" alt="Google Signup"/>
                <img src="../src/assets/signup-Apple-half.jpg" alt="Apple Signup"/>
            </div>
            <p>Already have an account? <Link to="/login">Log In</Link></p>
        </div>
        )

        
    return (
        <div className="FormFlex">
            <img src="./src/assets/project-pulse-ad.jpg" alt="Your go-to project 
            management system tailored for hackathons" className="ad"/>
            <div className="FormDataFlex">
            {specifiedForm} 
            <img src="./src/assets/orHR.png" alt="Dividing line"/>
            {redirectRegister}
            </div>
        </div>
    );
}

export default LoginSignupLayout;