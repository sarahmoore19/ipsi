import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul>
			<li>
				<NavLink exact to="/">Home</NavLink>
			</li>
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
			{sessionUser && (
			  <li>
                <NavLink exact to="/stores/user">
				  <i class="fas fa-store"></i>
				</NavLink>
			  </li>
			)}
		</ul>
	);
}

export default Navigation;
