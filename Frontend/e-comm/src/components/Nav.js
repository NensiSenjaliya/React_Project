

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
    const navigate = useNavigate();
    const auth = localStorage.getItem('User');
    const user = auth ? JSON.parse(auth) : null;

    const logout = () => {
        localStorage.clear();
        navigate('/signup');
    };

    return (
        <div>
            <img
                className="logo"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrfpbrmWiy2jXihR_PKSOLbLf4EmyuXtR22Q&s"
                alt="Logo"
            />
            {user ? (
                <ul className="nav-ul">
                    {/* Admin Navigation */}
                    {user.role === 'admin' && (
                        <>
                            <li><Link to="/admin-panel">Admin Panel</Link></li>
                            <li><Link to="/product-list">Product</Link></li>
                            <li><Link to="/add">Add Product</Link></li>
                            <li><Link to="/received-order">Received-order</Link></li>
                            <li><Link to="/profile">Profile</Link></li>
                        </>
                    )}

                    {/* User Navigation */}
                    {user.role === 'user' && (
                        <>
                            <li><Link to='/user-panel'>User Panel</Link></li>
                            <li><Link to="/user-panel/products">Product</Link></li>
                            <li><Link to="/user-profile">Profile</Link></li>
                        </>
                    )}

                    <li>
                        <Link onClick={logout} to="/login">
                            Logout
                        </Link>
                    </li>
                </ul>
            ) : (
                <ul className="nav-ul nav-right">
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            )}
        </div>
    );
};

export default Nav;
