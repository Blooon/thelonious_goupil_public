import React from 'react';
import requestUtils from '../../Utils/request.utils';
import AdminForm from '../Components/AdminForm';

export default class LayoutResource extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			record: {},
		}
		this.loadData();
	}

	loadData = async () => {
		try {
			const body = await requestUtils.get(`/admin/once/${this.props.resource.name}`);
			// if body empty, create a bug
			if (body) this.setState({ record: body.data });
		}
		catch (err) {
			console.log(err);
			// this.setState({ error: err.message });
		}
	}

	onSubmit = async event => {
		event.preventDefault();
		try {
			await requestUtils.put(`/admin/once/${this.props.resource.name}`, this.state.record);
			this.loadData();
		}
		catch (err) {
			console.log(err);
			this.setState({ error: err.message });
		}
	}

	onChange = event => {
		const record = this.state.record;
		record[event.target.name]= event.target.value;
		this.setState({ record });
	}

	fileChange = async (e, propName) => {
		if (!e.target.files[0]) {
			return;
		}
		const filename = e.target.files[0].name
		this.fileReader = new FileReader();
		this.fileReader.onloadend = (e) => {this.handleFileRead(e, filename, propName )};
		this.fileReader.readAsDataURL(e.target.files[0]);
	}

	handleFileRead = (e, filename, propName) => {
    let record = this.state.record;
    record[propName] = {name: filename, data: e.target.result}
    this.setState({ record });
	}


	render() {
    const { props, state } = this;
    const { record, error } = state;
    const { languages, resource } = props;
    const { entries: properties, name } = resource;
    
		return (
      <div className="w3-row">
        <AdminForm
          classes="w3-col l4"
          name={name}
          properties={properties}
          record={record}
          languages={languages}
					fileChange={this.fileChange}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          error={error}
        />
      </div>
    )
  }
};