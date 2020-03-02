import React from 'react';
import request from '../Utils/request.utils';

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: '',  
			mail: '',
			password: ''
		}
	}

	onSubmit = async event => {
		event.preventDefault();
		try {
			this.state.error = null;
			await request.post('/login',{
				email: this.state.mail,
				password: this.state.password,
			});
			this.props.setLogged();
		}
		catch (err) {
			console.log(err.response);
			this.setState({ error: err.message });
		}
	}

	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	}

	render() {
		return (
			<main id="Admin">
				<section className="w3-center">
					<h1 className="home-back">Connexion</h1>
					<div className="primary-font w3-center">{this.state.error}</div>
					<form id="SignIn" className="w3-panel w3-bar" onSubmit={this.onSubmit}>
						<input
							className="w3-input w3-bar-item w3-border"
							type="text" name="mail"
							onChange={this.onChange}
							value={this.state.mail}
							placeholder="email"
							required
						/>
						<input 
							className="w3-input w3-bar-item w3-border"
							type="password"
							name="password"
							onChange={this.onChange}
							value={this.state.password}
							placeholder="mot de passe"
							required
						/>
						<input
							className="w3-bar-item w3-border w3-btn w3-white"
							type="Submit"
							submit="Se connecter"
						/>
					</form>
				</section>
			</main>
		)
	}
};