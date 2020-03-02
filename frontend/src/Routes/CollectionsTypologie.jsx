import React, { Component } from 'react';
import { loadDataIfNeeded } from '../Utils/loadDataIfNeeded.utils';
import front from '../Utils/front.utils';
import { UserContext } from '../Contexts/UserContext';
import Carousel from './Components/Carousel';

export default class CollectionsTypologie extends Component {
	constructor(props) {
		super(props);
		this.state = {
			typologie: [{}]
		}
	}

	componentDidMount() {
		document.title = `Thélonious Goupil - ${this.context.lang === 'fr' ? 'Collections Typologie' : 'Collections Typologie'}`
		loadDataIfNeeded(this, '/collections_typologies/full',  { lang: this.context.lang }, 'typologie');
	}

	render() {
		return (
			<main id="CollectionsTypologie">
				<div className="w3-hide-large w3-hide-xlarge w3-col s10 l2 typologie-caption">
					<p>{front.renderText(this.state.typologie[0]['caption_'+this.context.lang], this.props.changeColor, this.props.resetColor)}</p>
				</div>
				<article key={this.state.typologie[0].id} id={this.state.typologie[0]['id']} className="w3-row typologie">
					<div className="w3-col m12 l6 typologie-slideshow">
						<Carousel
							images = {this.state.typologie[0].images}
							description = {this.state.typologie[0]['description_'+this.context.lang]}
							{...this.props}
						/>
					</div>
					<div className="w3-hide-medium w3-hide-small w3-col s10 l2 typologie-caption">
						<p>{front.renderText(this.state.typologie[0]['caption_'+this.context.lang], this.props.changeColor, this.props.resetColor)}</p>
					</div>
				</article>
			</main>
		)
	}
}

CollectionsTypologie.contextType = UserContext;