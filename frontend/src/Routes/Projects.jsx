import React from 'react';
import front from '../Utils/front.utils';
import { UserContext } from '../Contexts/UserContext';
import { loadDataIfNeeded } from '../Utils/loadDataIfNeeded.utils';
import Fade from 'react-bootstrap/Fade';
import Carousel from './Components/Carousel';

export default class Projects extends React.Component {
	constructor(props) {
		super (props);
		this.state = {
			projects: [],
			error: '',
		}
	}

	componentDidMount() {
		document.title = `Thélonious Goupil - ${this.context.lang === 'fr' ? 'Projets' : 'Projects'}`;
		loadDataIfNeeded(this, '/projects/full', { lang: this.context.lang }, 'projects');
	}

	render() {
		var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		var ratio;
		if (w > 1280) {
			ratio = 94;
		} else if (w > 992) {
			ratio = 80;
		} else {
			ratio = 90;
		}

		const projects = front.orderByDate(this.state.projects).map((elem, index) => {
			const renderDate = index === 0 || new Date(elem.date).getFullYear() !== new Date(this.state.projects[index-1].date).getFullYear();
			let h = (this.state.projects.length-index)*ratio+5+'%';
			let minHeight = '';
			if (index === this.state.projects.length - 1) {
				let footerHeight = 124;
				if (Math.max(document.documentElement.clientWidth, window.innerWidth || 0) > 1280) {
					footerHeight = 193+45;
				}
				minHeight = `calc(100vh - ${footerHeight}px)`;
			}
			return (
				<article key={elem.id} style={{minHeight}} id={elem['id']} className="w3-row project">
					<div style={{ height: h }} className={`w3-hide-xlarge w3-hide-large project-date ${!renderDate ? 'transparent' : ''}`}>
						{renderDate 
							? <p>{new Date(elem.date).getFullYear()}</p> 
							: null
						}
					</div>
					<div className="w3-hide-xlarge w3-hide-large w3-col m10 project-caption">
						<h1>{elem['name_'+this.context.lang]}</h1>
						<p>{front.renderText(elem['caption_'+this.context.lang], this.props.changeColor, this.props.resetColor)}</p>
					</div>
					<div className="w3-col m12 l6 project-slideshow">
						<Carousel
							images = {elem.images}
							description = {elem['description_'+this.context.lang]}
							{...this.props}
						/>
					</div>
					<div className="w3-hide-medium w3-hide-small w3-col s10 l2 project-caption">
						<h1>{elem['name_'+this.context.lang]}</h1>
						<p>{front.renderText(elem['caption_'+this.context.lang], this.props.changeColor, this.props.resetColor)}</p>
					</div>
					<div style={{ height: h }} className={`w3-hide-medium w3-hide-small w3-col s2 l1 project-date ${!renderDate ? 'transparent' : ''}`}>
						{renderDate 
							? <p>{new Date(elem.date).getFullYear()}</p> 
							: null
						}
					</div>
				</article>
			)
		});

		return (
			<Fade 
				mountOnEnter={true}
				unmountOnExit={true}
				appear={true}
				in={this.props.location.pathname === '/projects'}
			>
				<section>
					{projects}
				</section>
			</Fade>
		)
	}
}

Projects.contextType = UserContext;
