import React from 'react';
import {Link} from 'react-router-dom';
import "./WalkthroughPage.css";

function WalkthroughPage() {
    const embedId = "";

    return (
        <div className='WalkthroughLayout'>
            <iframe
                width="767"
                height="512"
                src={`https://www.youtube.com/embed/${embedId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
            />
            <br></br>
            <button className='StartWalkthroughButton'>Start the Walkthrough</button>
            <br></br>
            <Link to="/tasks"><button className='SkipWalkthroughButton'>Skip</button></Link>
        </div>
    );
}

export default WalkthroughPage;