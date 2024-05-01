import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
    return (
        <div>
            <div className="landingStart">
                <img src="src/assets/collaboration-four.jpg" alt="Four people working 
                together, holding a tablet, a laptop, and 2 cups of coffee"/>
                <div className="landingStartRight">
                    <h3>The project management software tailored for simplicity</h3>
                    <p>We are here to assist with the communication between you and your
                        team to successfully spearhead your future projects</p>
                    <Link to="/login">
                        <button className="landingButton">Start Building</button>
                    </Link>
                </div>
            </div>

            <div className="landingHighlight">
                <h3>Project Pulse offers:</h3>
                <div className="image-group">
                    <figure>
                        <img src="src/assets/hands-designing.jpg" alt="A pair of hands writing 
                        in a notebook surrounded by design tools." />
                        <figcaption>Share documents, forms, and files
                            between you and your teammates</figcaption>
                    </figure>
                    <figure>
                        <img src="src/assets/task-snippet.jpg" alt="4 rows of task names
                        and statuses arranged in a table" />
                        <figcaption>Ability to create, assign, and track tasks</figcaption>
                    </figure>
                    <figure>
                        <img src="src/assets/collaboration-brainstorm.jpg" alt="3 people 
                        talking around a table" />
                        <figcaption>Message center for more productive conversation</figcaption>
                    </figure>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;