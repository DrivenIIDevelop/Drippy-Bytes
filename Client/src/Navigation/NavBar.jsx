import { Link, Outlet } from 'react-router-dom';
import SearchForm from '../LoginSignupSearch/SearchForm';
import UserInitials from '../Users/UserInitials';
import { MdNotificationsNone } from "react-icons/md";
import './NavBar.css'

function NavBar() {
  const currentUser = { first_name: "Jimmy", last_name: "Dean" }
  function loggedInNav() {
    return (
      <div className="NavBar">
        <Link to="/" className='logoLink'>
          <div className="logo-name">
            <img src="./src/assets/logo.png" alt="project pulse logo" />
            <p className="option">Project Pulse</p>
          </div>
        </Link>
        <div className="NavBar-right">
          <SearchForm />
          <MdNotificationsNone className="icon" />
          <Link to="/profile" className="option">
            <UserInitials firstName={currentUser.first_name} lastName={currentUser.last_name} />
          </Link>
        </div>
      </div >
    );
  }

  function loggedOutNav() {
    return (
      <div className="NavBar">
        <p className='option'>Project Pulse</p>
      </div>
    );
  }


  return (
    <div>
      <nav>
        {currentUser ? loggedInNav() : loggedOutNav()}
      </nav>
      <Outlet />
    </div>
  );

}

export default NavBar;
