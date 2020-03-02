import React from 'react';
import { Route } from "react-router-dom";
import requestUtils from '../Utils/request.utils';
import RecordEdit from './Resources/RecordEdit';
import RecordList from './Resources/RecordList';
import RecordCreate from './Resources/RecordCreate';

export default class AdminResource extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			error: null,
			records: [],
		}
	}

	componentDidMount() {
		this.loadData();
	}

	componentDidCatch(err) {
		console.log(err)
		this.setState({ error: "Internal Error" })
	}

	loadData = async () => {
		try {
			const body = await requestUtils.get(`/admin/${this.props.resource.name}s`);
			this.setState({records: body.data});
		}
		catch (err) {
			console.log(err.message);
			this.setState({error: err.message })
		}
	}

	deleteItem = async itemId => {
		try {
			await requestUtils.delete(`/admin/${this.props.resource.name}/${itemId}`);
			this.loadData();
		}
		catch(err) {
			console.log(err);
			this.setState({ error: err.message })
		}
	}

	render() {
		return <>
			<div className="primary-font w3-center">{this.state.error}</div>
			<Route exact path={this.props.match.path} render={() => (
				<div className="w3-row">
					<RecordCreate
						name={this.props.resource.name}
						properties={this.props.resource.items}
						loadData={this.loadData}
						{...this.props}
					/>
					<RecordList
						records={this.state.records}
						properties={this.props.resource.items}
						title={this.props.title}
						name={this.props.resource.name}
						deleteItem={this.deleteItem}
						{...this.props}
					/>
				</div>
				)}
			/>
			<Route path={this.props.match.path+"/:itemId"} render={props => (
					<RecordEdit
						properties={this.props.resource.items}
						name={this.props.resource.name}
						gotImagesList={this.props.resource.params.gotImagesList}
						gotFileList={this.props.resource.params.gotFileList}
						types={this.props.resource.types}
						{...props}
					/>
				)}
			/>
		</>
	}
}