import React from 'react';
import { Link } from "react-router-dom";
import { UserContext } from '../Contexts/UserContext';
import { loadDataIfNeeded } from '../Utils/loadDataIfNeeded.utils';
import front from '../Utils/front.utils';

export default class NoMatch extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      news: [{}],
      error: '',
      title: 'Page not found',
      caption: "Sorry, we can't find the page you're looking for.§§[Go back to home page;/]",
    }
  }
  
  componentDidMount() {
		document.title = `Thélonious Goupil - Error 404`
    loadDataIfNeeded(this, '/news', { lang: this.context.lang }, 'news')
  }

  render() {
    let minHeight = '';
    let footerHeight = 124;
    if (Math.max(document.documentElement.clientWidth, window.innerWidth || 0) > 1280) {
      footerHeight = 193+45;
    }
    minHeight = `calc(100vh - ${footerHeight}px)`;
    
		let news = null;
		if (this.state.news[0]) {
			news = <article key={this.state.news[0].id} style={{minHeight}} id={this.state.news[0]['id']} className="w3-row project">
        <div>
          <div className="w3-hide-xlarge w3-hide-large not-found-date project-date">
            <p>OOPS!</p>
          </div>
          <div className="w3-hide-xlarge w3-hide-large w3-col m10 project-caption">
            <h1>{this.state.title}</h1>
            <p>
              {front.renderText(this.state.caption, this.props.changeColor, this.props.resetColor)}
            </p>
          </div>
        </div>
        <div className="w3-col m12 l6 project-slideshow">
          <Link
            to={"/projects"}
            onClick={this.handleOpen}
            className={this.props.location.pathname === '/projects' ? "no-pointer news-link" : "news-link"}
          >
            <div key={this.state.news[0].cover} className="slide">
              <picture className="news-image">
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
        <div>
          <div className="w3-hide-medium w3-hide-small w3-col s10 l2 project-caption">
            <h1>{this.state.title}</h1>
            <p>{front.renderText(this.state.caption, this.props.changeColor, this.props.resetColor)}</p>
          </div>
          <div className="w3-hide-medium w3-hide-small w3-col s2 l1 not-found-date project-date">
            <p>OOPS!</p>
          </div>
        </div>
      </article>
    }
    
    return <section id="Projects">
      {news}
    </section>
  }
}

NoMatch.contextType = UserContext;