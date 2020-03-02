import React, { Fragment } from 'react';
import requestUtils from '../../../Utils/request.utils';
import AdminField from '../../Components/AdminField';

export default class TypeList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
		}
	}

	deleteType = async (event, typeId) => {
		event.preventDefault();
		try {
			await requestUtils.delete(`/admin/${this.props.name}/${this.props.itemId}/type/${typeId}`);
			this.props.loadData();
		}
		catch (err) {
			console.log(err);
			this.setState({ error: err.message });
			setTimeout(()=> this.setState({error: null}), 3000)
		}
	}
	
	componentDidCatch(err) {
		console.log(err)
	}

	render() {
		return (
			<article className="w3-col xl12">
				<h2 className="primary-font">Images déjà ajoutées au diapo</h2>
				{this.state.error}
				{this.props.listItems.map(item => (
					<Fragment >
						{this.props.types[0].items.map(property => (
							<AdminField
								key={this.props.types[0].name + property.name}
								type={property.name.includes('color') ? 'color' : property.type}
								name={property.name}
								value={property.type === 'file' ? undefined : this.state.record[property.name]}
								onChange={property.type === 'file' ? e => this.fileChange(e, property.name) : this.onChange}
								changeColor={this.props.changeColor}
								resetColor={this.props.resetColor}
							/>
						))}
						<button className="secondary-font" onClick={(e) => this.deleteType(e, item._id)}>supprimer</button>
					</Fragment>
				))}
			</article>
		)
	}
}