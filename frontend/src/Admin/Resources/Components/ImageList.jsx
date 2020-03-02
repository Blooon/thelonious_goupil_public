import React from 'react';
import requestUtils from '../../../Utils/request.utils';

export default class ImageList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			images: {}
		}
	}

	changeOrder = async (e, file) => {
		try {
			this.state.confirmationNewOrder = null;
			await requestUtils.put(`/admin/${this.props.name}/${this.props.match.params.itemId}/image/${file.id}`, {order: e.target.value});
			this.props.loadData();
			this.setState({ confirmationNewOrder: "Order saved !" });
			setTimeout(()=> this.setState({confirmationNewOrder: null}), 400)
		}
		catch (err) {
			console.log(err);
			this.setState({ error: err.message });
			setTimeout(()=> this.setState({error: null}), 3000) 
		}
	}

	deleteImage = async (event, imageId) => {
		event.preventDefault();
		try {
			await requestUtils.delete(`/admin/${this.props.name}/${this.props.itemId}/image/${imageId}`);
			this.props.loadData();
		}
		catch (err) {
			this.setState({ error: err.message });
			setTimeout(()=> this.setState({error: null}), 3000)
		}
	}

	render() {
		return (
			<article className="w3-col xl12">
				<h2 className="primary-font">Images déjà ajoutées au diapo</h2>
				{this.state.error}
				<div className="w3-row">
				{this.props.images.map((file) => (
					<div key={file._id} className="w3-col xl3 l4 m6 s12">
						<img className="admin-image w3-image" src={process.env.REACT_APP_S3_BUCKET_BASE_URL + file.file} tag={file.name} alt={file.name}/>
						<div className="w3-row admin-image-options">
							<input className="w3-half" type="number" name='order' value={file.ordered} onChange={(e) => this.changeOrder(e, file)} required/>
							<button className="w3-half" onClick={(e) => this.deleteImage(e, file._id)}>supprimer</button>
							<p>{this.state.confirmationNewOrder}</p>
						</div>
					</div>
				))}
				</div>
			</article>
		)
	}
}
