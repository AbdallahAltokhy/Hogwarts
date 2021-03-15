import React, { useState, useEffect } from 'react';
import { Router } from '@reach/router';
import jwt_decode from 'jwt-decode';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Home/Home';
import Footer from './Common/Footer/Footer';
import Nav from './Common/Nav/Nav';
import Checkout from './Checkout/Checkout';
import Login from './LogIn/Login';
import SignUp from './SignUp/SignUp';
import Profile from './Profile/Profile';
import Dashboard from './AdminDashboard/Dashboard';
import { getCustomerById } from '../Services/customersService';

const App = () => {
	const [user, setUser] = useState({});

	useEffect(() => {
		//getting the logged in user if exist
		const jwt = localStorage.getItem('token');
		if (jwt) {
			getCustomerById(jwt_decode(jwt).id).then((res) => {
				setUser(res[0]);
			});
		}
	}, []);

	//logging out a user
	const logOut = () => {
		localStorage.removeItem('token');
		window.location = '/';
	};

	const Layout = (props) => (
		<div>
			<Nav user={user} logOut={logOut} />
			{props.children}
			<Footer />
		</div>
	);

	const PrivateRoute = ({ as: Component, ...props }) => {
		return Object.keys(user).length !== 0 && user.id === 44 ? (
			<Component {...props} />
		) : (
			<Layout>
				<Home user={user} path="/" />
			</Layout>
		);
	};

	return (
		<>
			<ToastContainer />
			<Router>
				<Layout path="/">
					<Home user={user} path="/" />
					<Login path="/login" user={user} />
					<SignUp path="/signUp" />
					<Checkout path="/checkout" user={user} />
					<Profile path="/profile" />
				</Layout>

				<PrivateRoute
					as={Dashboard}
					path="/admin/:dashboard"
					user={user}
					logOut={logOut}
				/>
			</Router>
		</>
	);
};

export default App;
