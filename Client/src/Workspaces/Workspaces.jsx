import { Link } from "react-router-dom";
import { FaListCheck,  FaAngleDown, FaEnvelopeOpen, FaQuestion } from "react-icons/fa6";
import { FaRegFileAlt, FaRegCalendarAlt, FaRegEdit } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { LuMessagesSquare } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import './Workspaces.css'

function Workspaces(active, logout) {

  return (
    <div className="Workspaces">
      <div>
        <div className='project workspace-dropdown'>Your Workspaces  <FaAngleDown /></div>
        <br />
        <div className="project">G2 Hackathon</div>
        <hr />
      </div>
      <div className="Navigate">
        <div className="workspace"><Link to="/tasks" className="workspace"><FaListCheck />&nbsp;Tasks</Link></div>
        <div className="workspace"><Link to="/files" className="workspace"><FaRegFileAlt />&nbsp;Files</Link></div>
        <div className="workspace"><Link to="/messages" className="workspace"><FaEnvelopeOpen />&nbsp;Messaging Center</Link></div>
        <div className="workspace"><FaRegCalendarAlt />&nbsp;Calendar</div>
        <div className="workspace"><FaRegEdit />&nbsp;Ideas/Note-Taking</div>
      </div>
      <div className="External">
      <hr />
        <div className="workspace"><FaQuestion />&nbsp;Tutorials & FAQ</div>
        <div className="workspace"><CiSettings />&nbsp;Settings</div>
        <div className="workspace"><LuMessagesSquare />&nbsp;Contact Us</div>
        <div className="workspace"><Link to="/login" className="workspace"><MdLogout />&nbsp;Log Out</Link></div>
      </div>
    </div>
  )
}

export default Workspaces;
