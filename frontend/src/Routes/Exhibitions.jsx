import React from 'react';
import front from '../Utils/front.utils';
import { UserContext } from '../Contexts/UserContext';
import { loadDataIfNeeded } from '../Utils/loadDataIfNeeded.utils';
import Exhibition from './Exhibition';

export default class Exhibitions extends React.Component {
	constructor(props) {
		super (props);
		this.state = {
			exhibitions: [],
			error: '',
		}
	}

	componentDidMount() {
		document.title = `Thélonious Goupil - ${this.context.lang === 'fr' ? 'Expositions' : 'Exhibitions'}`
		loadDataIfNeeded(this, '/exhibitions/full', { lang: this.context.lang }, 'exhibitions')
	}

	render() {
		const exhibitions = front.orderByDate(this.state.exhibitions).map((elem, index) => {
			const h = index === 0 ? (this.state.exhibitions.length-index)*85+'%' : (this.state.exhibitions.length-index)*95+'%';
			const renderDate = index === 0 || new Date(elem.date).getFullYear() !== new Date(this.state.exhibitions[index-1].date).getFullYear();
			let minHeight = '';
			if (index === this.state.exhibitions.length - 1) {
				let footerHeight = 124+15;
				if (Math.max(document.documentElement.clientWidth, window.innerWidth || 0) > 1280) {
					footerHeight = 193+5;
				}
				minHeight = `calc(100vh - ${footerHeight}px)`
			}
			return <Exhibition minHeight={minHeight} key={elem.id} record={elem} height={h} renderDate={renderDate} />
		});

		return <main id="Exhibitions">
			{exhibitions}
		</main>
	}
}

Exhibitions.contextType = UserContext;
