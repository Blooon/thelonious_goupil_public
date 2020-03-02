import React from 'react';
import { UserContext } from '../../Contexts/UserContext';
import Slider from "react-slick";
import front from '../../Utils/front.utils';

export default class Carousel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			images: {},
			description: '',
			item: {},
			imgId: 0,
			lang: 'en'
		}
	}
	
	changeImg = () => {
		if (this.state.cursorState === 'prev') {
			this.slider.slickPrev();
		} else if (this.state.cursorState === 'next') {
			this.slider.slickNext();
		}
	}

	leftRightImage = (e) => {
		let currentTargetRect = e.currentTarget.getBoundingClientRect();
		if (e.clientY >= currentTargetRect.top && e.clientY <= currentTargetRect.top + currentTargetRect.height) {
			if (e.clientX >= currentTargetRect.left && e.clientX <= currentTargetRect.left + currentTargetRect.width/2) {
				this.setState({ cursorState: 'prev' })
			}
			else if (e.clientX >= currentTargetRect.left && e.clientX <= currentTargetRect.left + currentTargetRect.width) {
				this.setState({ cursorState: 'next' })                
			}
		}
	}

	render() {
		var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

		const settings = {
			className: "slider variable-width",
			dots: false,
			infinite: true,
			centerMode: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			initialSlide: 0,
			variableWidth: false,
			autoplay: false,
			swipeToSlide: true,
			centerPadding: '0px',
			adaptiveHeight: w <= 992,
		};

		var h;
		if (w > 1280) {
			h = w * 0.297 + "px";
		} else if (w > 992) {
			h = w * 0.303 + "px";
		} else {
			h = w * 0.6 + "px";   
		}
		
		let slides = null, description = null;
		if (this.props.images !== undefined && this.props.images.length > 0){
			slides = this.props.images.map((img, index) => (
				<div key={img.file+index} className="slide">
					<picture className="w3-image" style={{height: h}}>
						<source
							media="(max-width: 767px)"
							sizes="(max-width: 1440px) 90vw, 1296px"
							srcSet={`
							${process.env.REACT_APP_S3_BUCKET_BASE_URL + 'w_200/' + img.file}.jpg 200w,
							${process.env.REACT_APP_S3_BUCKET_BASE_URL + 'w_1296/' + img.file}.jpg 1296w`}
						/>
						<source
							media="(min-width: 768px) and (max-width: 991px)"
							sizes="(max-width: 1440px) 90vw, 1296px"
							srcSet={`
							${process.env.REACT_APP_S3_BUCKET_BASE_URL + 'w_692/' + img.file}.jpg 692w,
							${process.env.REACT_APP_S3_BUCKET_BASE_URL + 'w_1296/' + img.file}.jpg 1296w`}
						/>
						<source
							media="(min-width: 992px) and (max-width: 1199px)"
							sizes="(max-width: 2400px) 40vw, 960px"
							srcSet={`
							${process.env.REACT_APP_S3_BUCKET_BASE_URL + 'w_397/' + img.file}.jpg 397w,
							${process.env.REACT_APP_S3_BUCKET_BASE_URL + 'w_960/' + img.file}.jpg 960w`}
						/>
						<img
							sizes="(max-width: 2592px) 50vw, 1296px"
							srcSet={`
							${process.env.REACT_APP_S3_BUCKET_BASE_URL + 'w_600/' + img.file}.jpg 600w,
							${process.env.REACT_APP_S3_BUCKET_BASE_URL + 'w_1296/' + img.file}.jpg 1296w`}
							src={`${process.env.REACT_APP_S3_BUCKET_BASE_URL + 'w_1296/' + img.file}.jpg`}
							className="w3-image"
							alt={img.file+index}
							style={{height: h}}
						/>
					</picture>
				</div>
			))

			description = this.props.description
			? <div className="project-description slide" style={{minHeight: h}}>
					<h2>Infos</h2>
					<p>{front.renderText(this.props.description, this.props.changeColor, this.props.resetColor)}</p>
				</div>
			: null;
		}

		return (
			<div
				className={"w3-col " + this.state.cursorState}
				onMouseMove={e => this.leftRightImage(e)}
				onClick={e => this.changeImg(e)}
				style={w > 992 ? {height: h} : undefined}
				>
				<Slider ref={c => (this.slider = c)} {...settings}>
					{slides}
					{description}
				</Slider>
			</div>
		)
	}
}

Carousel.contextType = UserContext;
