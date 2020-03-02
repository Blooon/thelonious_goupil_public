import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { loadDataIfNeeded } from '../Utils/loadDataIfNeeded.utils';
import front from '../Utils/front.utils';
import { UserContext } from '../Contexts/UserContext';
import Thesis from './Thesis';

export default class About extends Component {
	constructor(props) {
		super(props);
		this.state = {
			about: [{}]
		}
	}

	componentDidMount() {
		document.title = `Thélonious Goupil - ${this.context.lang === 'fr' ? 'Info / Contact' : 'Info / Contact'}`
		loadDataIfNeeded(this, '/abouts/full',  { lang: this.context.lang }, 'about');
	}

	render() {
		return (
			<main id="About">
				<section>
					<article key={this.state.about[0].id} id={this.state.about[0]['id']} className="w3-row about">
						<div className="w3-col s10 l2 about-caption">
							<p>{front.renderText(this.state.about[0]['caption_'+this.context.lang], this.props.changeColor, this.props.resetColor)}</p>
						</div>
					</article>
				</section>
				<Route exact path="/about/thesis" render={props => <Thesis images={this.state.about[0].images} {...props} />} />
			</main>
		)
	}
}

About.contextType = UserContext;