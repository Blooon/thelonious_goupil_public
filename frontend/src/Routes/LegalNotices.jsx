import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../Contexts/UserContext';
import { loadDataIfNeeded } from '../Utils/loadDataIfNeeded.utils';
import front from '../Utils/front.utils';

export default class LegalNotices extends React.Component {
	constructor(props) {
		super (props);
		this.state = {
			legal_notices: [],
			error: '',
		}
	}

	componentDidMount() {
		document.title = `Thélonious Goupil - ${this.context.lang === 'fr' ? 'Mentions légales' : 'Legal notices'}`
		loadDataIfNeeded(this, '/legal_notices/full', { lang: this.context.lang }, 'legal_notices')
	}

	render() {
		return <main id="Legal">
			<Link to="/about" className="legal-close">
			</Link>
			<section className="legal-section">
				<h1>Mentions légales et politique de confidentialité</h1>
				{this.state.legal_notices.map((article, index) => (
					<article key={index}>
						<h2>{front.renderText(article['title_'+this.context.lang], this.props.changeColor, this.props.resetColor)}</h2>
						<p>{front.renderText(article['text_'+this.context.lang], this.props.changeColor, this.props.resetColor)}</p>
					</article>
				))}
			</section>
		</main>
	}
}

LegalNotices.contextType = UserContext;