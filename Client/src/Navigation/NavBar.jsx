import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import SearchForm from '../Forms/SearchForm';
import UserInitials from '../Users/UserInitials';
import { MdNotificationsNone } from "react-icons/md";
import UserContext from '../auth/UserContext';
import './NavBar.css'

function NavBar() {
  const { currentUser } = useContext(UserContext);
  function loggedInNav() {
    return (
      <div className="NavBar">
        <p className='option'>Project Pulse</p>
        <div className="NavBar-right">
          <SearchForm />
          <MdNotificationsNone className='icon'/>
          <Link to="/profile" className='option'>
            <UserInitials firstName={currentUser.first_name} lastName={currentUser.last_name} />
          </Link>
        </div>
      </div>
    )
  }

  function loggedOutNav() {
    return (
      <div className="NavBar">
        <p className='option'>Project Pulse</p>
      </div>
    );
  }


  return (
    <nav>
      {currentUser ? loggedInNav() : loggedOutNav()}
    </nav>
  );

}

export default NavBar;
