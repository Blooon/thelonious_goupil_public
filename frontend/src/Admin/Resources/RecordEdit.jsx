import React from 'react';
import requestUtils from '../../Utils/request.utils';

import ImageList from './Components/ImageList';
import ImageForm from './Components/ImageForm';
import TypeList from './Components/TypeList';
import TypeForm from './Components/TypeForm';
import AdminForm from '../Components/AdminForm';

export default class RecordEdit extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			record: {
				types: [],
				images: []
			},
			order: 1,
		}
		this.fileReader = {}
	}
	
	componentDidMount() {
		this.loadData()
	}
	
	loadData = async () => {
		try {
			const body = await requestUtils.get(`/admin/${this.props.name}/${this.props.match.params.itemId}`);
			if (body.data.images) {
				body.data.order = body.data.images.length + 1
			}
			this.setState({record: body.data});
		}
		catch (err) {
			console.log(err);
		}
	}

	handleFileRead = (e, filename, propName) => {
    let record = this.state.record;
    record[propName] = {name: filename, data: e.target.result}
    this.setState({ record });
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

	onSubmit = async event => {
		event.preventDefault();
		try {
			// eslint-disable-next-line
			this.state.modifierConfirmation = null;
			await requestUtils.put(`/admin/${this.props.name}/${this.props.match.params.itemId}`, this.state.record);
			this.loadData();
			this.setState({ modifierConfirmation: "Success !" })
			setTimeout(()=> this.setState({modifierConfirmation: null}), 1000)
		}
		catch (err) {
			console.log(err);
			this.setState({ error: err.message });
			setTimeout(()=> this.setState({error: null}), 3000)
		}
	}

	onChange = event => {
		const record = this.state.record;
		record[event.target.name] = event.target.value;
		this.setState({ record });
	}

	render() {
		const { props, state } = this;
		const { record, error } = state;
		const { properties, languages, gotImagesList, types, name } = props;

		return <>
			<div className="primary-font w3-center">{this.state.error}</div>
			<div className="w3-row">
				<AdminForm
					classes="w3-col l4"
					name={name}
					properties={properties}
					record={record}
					languages={languages}
					onChange={this.onChange}
					fileChange={this.fileChange}
					onSubmit={this.onSubmit}
					error={error}
				/>

				<section className="w3-col l8 w3-row record-options">
					{gotImagesList && (
						<ImageForm
							name={this.props.name}
							images={this.state.record.images}
							order={this.state.order}
							loadData={this.loadData}
							itemId={this.props.match.params.itemId}
						/>
					)}
					{gotImagesList && (
						<ImageList
							name={this.props.name}
							images={this.state.record.images}
							order={this.state.order}
							loadData={this.loadData}
							itemId={this.props.match.params.itemId}
						/>
					)}
					{types && (
						<TypeForm
							name={this.props.name}
							types={this.props.types}
							itemId={this.props.match.params.itemId}
							loadData={this.loadData}
						/>
					)}
					{types && (
						<TypeList 
							name={this.props.name}
							listItems={this.state.record.types}
							types={this.props.types}
							itemId={this.props.match.params.itemId}
							loadData={this.loadData}
							changeColor={this.props.changeColor}
							resetColor={this.props.resetColor}
						/>
					)}
				</section>
			</div>
		</>
	}
}