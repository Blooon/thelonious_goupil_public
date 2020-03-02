import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import requestUtils from '../Utils/request.utils';
import Config from '../config';
import Login from './Login';
import AdminNavbar from './AdminNavbar';
import AdminRoutes from './AdminRoutes';

const resources = Config.adminComponents;
const languages = Config.languages;

export default class Admin extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			error: null,
			logged: false
		}
	}

	componentDidMount() {
		this.getMe();
	}
    
	componentDidCatch(err) {
		this.setState({ error: "Internal Error" })
	}

	setLogged = async () => {
		this.setState({ logged: true })
	}

	logout = async () => {
		await requestUtils.post('/logout',);
		this.setState({ logged: false });
	}
    
	getMe = async () => {
		try {
			await requestUtils.get('/me');
			this.setState({ logged: true });
		}
		catch (err) {
			console.log(err);
			this.setState({ error: err.message })
		}
	}

	render() {
		if (!this.state.logged) {
			return <Login setLogged={this.setLogged}/>
		}
		return <>
			<Router>
				<main id="Admin">
					<AdminNavbar resources={resources} logout={this.logout} {...this.props} />
					<AdminRoutes resources={resources} languages={languages} {...this.props} />
				</main>
			</Router>
		</>
	}
}