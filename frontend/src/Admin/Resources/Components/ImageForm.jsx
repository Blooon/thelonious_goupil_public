import React from 'react'
import requestUtils from '../../../Utils/request.utils';
import AdminInput from '../../Components/AdminInput';

export default class ImageForm extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			image: {},
			order: props.order,
			error: null
		}
		this.fileReader = {}
	}

	handleFileRead = (e, filename, propName) => {
    let image = this.state.image;
    image[propName] = {name: filename, data: e.target.result}
    this.setState({ image });
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

	submitImage = async (event) => {
		event.preventDefault();
		try {
			await requestUtils.post(`/admin/${this.props.name}/${this.props.itemId}/image`, {
				file: this.state.image.file,
				order: this.state.order
			});
			this.props.loadData();
		}
		catch (err) {
			console.log(err);
			this.setState({ error: err.message });
			setTimeout(()=> this.setState({error: null}), 3000)
		}
	}

	onChange = (event) => {
		const image = this.state.image;
		image[event.target.name] = event.target.value;
		this.setState({ image });
	}

	render() {
		return (
			<article className="w3-col xl12">
				<h2 className="primary-font">Ajouter une image au diapo</h2>
				{this.state.error}
				<form onSubmit={this.submitImage} className="w3-half">
					<AdminInput
						type="text"
						name="order"
						value={this.state.image.order}
						onChange={this.onChange}
					/>
					<AdminInput
						type="file"
						name="file"
						onChange={e => this.fileChange(e, 'file')}
					/>
					<input className="w3-panel" type="submit" value ="Ajouter" />
				</form>
			</article>
		)
	}
}