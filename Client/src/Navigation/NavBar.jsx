import './NavBar.css'
import SearchForm from '../Forms/SearchForm';
import UserInitials from '../Users/UserInitials';
import { MdNotificationsNone } from "react-icons/md";

function NavBar() {
  return (
    <>
      <div className="NavBar">
        <p className='option'>Project Pulse</p>
        <div className="NavBar-right">
            <SearchForm />
            <a href="#" className='option'>
                <MdNotificationsNone />
            </a>
            <a href="#" className='option'>
                <UserInitials firstName={"John"} lastName={"Doe"} />
            </a>
        </div>
      </div>
    </>
  )
}

export default NavBar;
