import React from 'react';
import { Link } from "react-router-dom";
import { UserContext } from '../Contexts/UserContext';
import { loadDataIfNeeded } from '../Utils/loadDataIfNeeded.utils';
import front from '../Utils/front.utils';
import Fade from 'react-bootstrap/Fade';
import Projects from './Projects';

export default class Home extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      news: [{}],
      error: '',
    }
  }
  
  componentDidMount() {
		document.title = `Thélonious Goupil`
    loadDataIfNeeded(this, '/news', { lang: this.context.lang }, 'news')
  }

  render() {
		var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		var h;
		if (w > 1280) {
			h = w * 0.297 + "px";
		} else if (w > 992) {
			h = w * 0.303 + "px";
		} else {
			h = w * 0.6 + "px";   
		}
		
		let news = null;
		if (this.state.news[0]) {
			news = <article key={this.state.news[0].id} id={this.state.news[0]['id']} className="w3-row project">
        <Fade
          in={this.props.location.pathname === '/projects'}
        >
          <div>
            <div className="w3-hide-xlarge w3-hide-large project-date">
              <p>NEWS</p>
            </div>
            <div className="w3-hide-xlarge w3-hide-large w3-col m10 project-caption">
              <h1>{this.state.news[0]['name_'+this.context.lang]}</h1>
              <p>
                {front.renderText(this.state.news[0]['caption_'+this.context.lang], this.props.changeColor, this.props.resetColor)}
              </p>
            </div>
          </div>
        </Fade>
        <div className="w3-col m12 l6 project-slideshow">
          <Link
            to={"/projects"}
            className={this.props.location.pathname === '/projects' ? "no-pointer news-link" : "news-link"}
          >
            <div key={this.state.news[0].cover} className="slide">
              <picture style={{height: h}}>
                <source
                  media="(max-width: 767px)"
                  sizes="(max-width: 1440px) 90vw, 1296px"
                  srcSet={`
                  ${process.env.REACT_APP_S3_BUCKET_BASE_URL + 'w_200/' + this.state.news[0].cover}.jpg 200w,
                  ${process.env.REACT_APP_S3_BUCKET_BASE_URL + 'w_1296/' + this.state.news[0].cover}.jpg 1296w`}
                />
                <source
                  media="(min-width: 768px) and (max-width: 991px)"
                  sizes="(max-width: 1440px) 90vw, 1296px"
                  srcSet={`
                  ${process.env.REACT_APP_S3_BUCKET_BASE_URL + 'w_692/' + this.state.news[0].cover}.jpg 692w,
                  ${process.env.REACT_APP_S3_BUCKET_BASE_URL + 'w_1296/' + this.state.news[0].cover}.jpg 1296w`}
                />
                <source
                  media="(min-width: 992px) and (max-width: 1199px)"
                  sizes="(max-width: 2400px) 40vw, 960px"
                  srcSet={`
                  ${process.env.REACT_APP_S3_BUCKET_BASE_URL + 'w_397/' + this.state.news[0].cover}.jpg 397w,
                  ${process.env.REACT_APP_S3_BUCKET_BASE_URL + 'w_960/' + this.state.news[0].cover}.jpg 960w`}
                />
                <img
                  sizes="(max-width: 2592px) 50vw, 1296px"
                  srcSet={`
                  ${process.env.REACT_APP_S3_BUCKET_BASE_URL + 'w_600/' + this.state.news[0].cover}.jpg 600w,
                  ${process.env.REACT_APP_S3_BUCKET_BASE_URL + 'w_1296/' + this.state.news[0].cover}.jpg 1296w`}
                  src={`${process.env.REACT_APP_S3_BUCKET_BASE_URL + 'w_1296/' + this.state.news[0].cover}.jpg`}
                  className="news-image w3-image"
                  alt={this.state.news[0].cover}
                />
              </picture>
            </div>
          </Link>
        </div>
        <Fade 
          mountOnEnter={true}
          unmountOnExit={true} 
          in={this.props.location.pathname === '/projects'}
        >
          <div>
            <div className="w3-hide-medium w3-hide-small w3-col s10 l2 project-caption">
              <h1>{this.state.news[0]['name_'+this.context.lang]}</h1>
              <p>{front.renderText(this.state.news[0]['caption_'+this.context.lang], this.props.changeColor, this.props.resetColor)}</p>
            </div>
            <div className="w3-hide-medium w3-hide-small w3-col s2 l1 project-date">
              <p>NEWS</p>
            </div>
          </div>
        </Fade>
      </article>
    }
    
    return <main id="Projects">
      <section className="news">
        {news}
      </section>
      <Projects
        changeColor={this.changeColor}
        resetColor={this.resetColor}
        {...this.props}
      />
    </main>
  }
}

Home.contextType = UserContext;
