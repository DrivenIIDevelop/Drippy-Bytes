import React from 'react';
import './UserInitials.css'


function UserInitials({ id, firstName, lastName }) {
    function getInitials(firstName, lastName) {
        return (firstName?.charAt(0) || '') + (lastName?.charAt(0) || '');
    }

    const initials = getInitials(firstName, lastName);



    return (
        <div key={id} className="user-initials">
            {initials}
        </div>
    );
}

export default UserInitials;