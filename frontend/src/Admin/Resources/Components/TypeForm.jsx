import React from 'react';
import requestUtils from '../../../Utils/request.utils';
import AdminInput from '../../Components/AdminInput';

export default class TypeForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			type: {
				files: {}
			}
		}
	}

	submitType = async (event) => {
		event.preventDefault();
		try {
			await requestUtils.post(`/admin/${this.props.name}/${this.props.itemId}/type`, this.state.type);
			this.props.loadData();
		}
		catch (err) {
			console.log(err);
			this.setState({ error: err.message });
			setTimeout(()=> this.setState({error: null}), 3000)
		}
	}

	handleFileRead = (e, filename, propName) => {
    let type = this.state.type;
    type.files[propName] = {name: filename, data: e.target.result}
    this.setState({ type });
	}
	
	fileChange = async (e, propName) => {
		if (!e.target.files[0]) {
			return;
		}
		const filename = e.target.files[0].name;
		this.fileReader = new FileReader();
		this.fileReader.onloadend = (e) => {this.handleFileRead(e, filename, propName)};
		this.fileReader.readAsDataURL(e.target.files[0]);
	}

	onChange = event => {
		const type = this.state.type;
		type[event.target.name] = event.target.value;
		this.setState({ type });
	}

	render() {
		return (
			<div>
				<h2 className="primary-font">Ajouter une {this.props.types[0].name}</h2>
				<form onSubmit={this.submitType}>
					{this.props.types[0].items.map(property => (
						<AdminInput
							key={property.name}
							type={property.type}
							name={property.name}
							value={property.type === 'file' ? undefined : this.state.type[property.name]}
							onChange={property.type === 'file' ? e => this.fileChange(e, property.name) : this.onChange}
						/>
					))}
					<input className="secondary-font" type="submit" value ="Ajouter"/>                   
				</form>
			</div>
		)
	}
}