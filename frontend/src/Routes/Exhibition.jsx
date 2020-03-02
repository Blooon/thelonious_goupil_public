import React from 'react';
import { UserContext } from '../Contexts/UserContext';
import front from '../Utils/front.utils';

export default class Exhibition extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hover: false,
		}
	}

	handleHover = () => {
		if (!this.state.hover) this.setState({ hover: true });
	}

	handleOut = () => {
		if (this.state.hover) this.setState({ hover: false });
	}
	
	render() {
		const { props, state } = this;
		const { hover } = state;
		const { minHeight } = props;

		return (
			<article key={props.record.id} style={{minHeight}} id={props.record['id']} className="w3-row exhibition">
				<div className="w3-col s10 l3 exhibition-caption">
					{props.record['name_'+this.context.lang] ? 
						<h1>{props.record['name_'+this.context.lang]}</h1>
					: null}
					<div className="exhibition-slideshow"	onMouseOver={this.handleHover} onMouseOut={this.handleOut}>
						<div key={props.record.cover}>
							<p className={hover ? "w3-show" : "w3-hide"}>
								{front.renderText(props.record['caption_'+this.context.lang], this.props.changeColor, this.props.resetColor)}
							</p>
							<picture className={`exhibition-image ${hover ? ' opacity' : ''}`}>
								<source
									media="(max-width: 767px)"
									sizes="(max-width: 1440px) 90vw, 1296px"
									srcSet={`
									${process.env.REACT_APP_S3_BUCKET_BASE_URL + 'w_200/' + this.props.record.cover}.jpg 200w,
									${process.env.REACT_APP_S3_BUCKET_BASE_URL + 'w_1296/' + this.props.record.cover}.jpg 1296w`}
								/>
								<source
									media="(min-width: 768px) and (max-width: 991px)"
									sizes="(max-width: 1440px) 90vw, 1296px"
									srcSet={`
									${process.env.REACT_APP_S3_BUCKET_BASE_URL + 'w_692/' + this.props.record.cover}.jpg 692w,
									${process.env.REACT_APP_S3_BUCKET_BASE_URL + 'w_1296/' + this.props.record.cover}.jpg 1296w`}
								/>
								<source
									media="(min-width: 992px) and (max-width: 1199px)"
									sizes="(max-width: 2400px) 40vw, 960px"
									srcSet={`
									${process.env.REACT_APP_S3_BUCKET_BASE_URL + 'w_397/' + this.props.record.cover}.jpg 397w,
									${process.env.REACT_APP_S3_BUCKET_BASE_URL + 'w_960/' + this.props.record.cover}.jpg 960w`}
								/>
								<img
									sizes="(max-width: 2592px) 50vw, 1296px"
									srcSet={`
									${process.env.REACT_APP_S3_BUCKET_BASE_URL + 'w_600/' + this.props.record.cover}.jpg 600w,
									${process.env.REACT_APP_S3_BUCKET_BASE_URL + 'w_1296/' + this.props.record.cover}.jpg 1296w`}
									src={`${process.env.REACT_APP_S3_BUCKET_BASE_URL + 'w_1296/' + this.props.record.cover}.jpg`}
									className="news-image w3-image"
									alt={props.record['name_'+this.context.lang]}
								/>
							</picture>
						</div>
					</div>
				</div>
				<div style={{ height: props.height }} className={`w3-col s2 l1 exhibition-date ${!props.renderDate ? 'transparent' : ''}`}>
					{props.renderDate 
						? <p>{new Date(props.record.date).getFullYear()}</p> 
						: null
					}
				</div>
			</article>
		)
	}
};

Exhibition.contextType = UserContext;