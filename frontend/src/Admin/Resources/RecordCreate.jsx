import React from 'react';
import requestUtils from '../../Utils/request.utils';
import AdminForm from '../Components/AdminForm';

class RecordCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: {},
    }
    this.fileReader = {};
  }

	onChange = event => {
		const record = this.state.record;
		record[event.target.name] = event.target.value;
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

	onSubmit = async event => {
		event.preventDefault();
		try {
			await requestUtils.post(`/admin/${this.props.resource.name}`, this.state.record);
			this.props.loadData();
		}
		catch (err) {
			console.log(err);
			this.setState({ error: err.message });
		}
	}

  render() {
    const { record, error } = this.state;
    const { properties, name, languages } = this.props;

    return (
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
        create={true}
      />
    )
  } 
};

export default RecordCreate;