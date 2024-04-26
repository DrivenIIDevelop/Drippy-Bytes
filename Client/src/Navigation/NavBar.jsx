import './NavBar.css'
import SearchForm from '../Forms/SearchForm';
import UserInitials from '../Users/UserInitials';
import { MdNotificationsNone } from "react-icons/md";

function NavBar() {
  return (
    <>
      <div className="NavBar">
        <p className='option'>Project Pulse</p>
        <SearchForm />
        <a className='option right'><MdNotificationsNone /></a>
        <a className='option right'><UserInitials
          firstName={"John"} lastName={"Doe"} /></a>
      </div>
    </>
  )
}

export default NavBar;
