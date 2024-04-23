import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'

function Sidebar({ role }) {
    const menuItemsOrganizer = [
        { name: 'Manage Profile', path: '/orgAccount' },
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Add new Events', path: '/addEvents' },
        { name: 'Analytics', path: '/analytics' }
    ];

    const menuItemsCustomer = [
        { name: 'Manage Profile', path: '/account' },
        { name: 'Browse Events', path: '/events' },
        { name: 'My Tickets', path: '/tickets' },
    ];

    const menuItems = role === 'organizer' ? menuItemsOrganizer : menuItemsCustomer;

    return (
        <div className="sidebar">
            {
                role==='user' ?  <Link className='logo' to="/user">BookN'Bash</Link> :  <Link className='logo' to="/organizer">BookN'Bash</Link>
            } 
            <ul>
                {menuItems.map(item => (
                    <li key={item.name}>
                        <Link to={item.path}>{item.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
