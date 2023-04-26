import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul
		className='navBar'>
			<li>
				<NavLink
				exact to="/"
				className='logo'>
				  ipsi
				</NavLink>
			</li>
			<div
			className='navRight'>
			{sessionUser && (
			  <li
			  className='store'>
                <NavLink exact to="/stores/user">
				  <i
				  title='My Stores'
				  className="fas fa-store"></i>
				</NavLink>
			  </li>
			)}
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
			</div>
		</ul>
	);
}

export default Navigation;
