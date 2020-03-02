import React from 'react';
import { UserContext } from '../../Contexts/UserContext';
import { loadDataIfNeeded } from '../../Utils/loadDataIfNeeded.utils';
import front from '../../Utils/front.utils';

export default class Cookies extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cookie: {},
			error: null,
			printCookies: true
		}
		this.createCookie = this.createCookie.bind(this);
		this.readCookie = this.readCookie.bind(this);
		this.eraseCookie = this.eraseCookie.bind(this);
	}

  componentDidMount() {
		loadDataIfNeeded(this, '/once/cookie',  { lang: this.context.lang }, 'cookie');
  }

	createCookie(name,value,days) {
		var expires = ""
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			expires = "; expires="+date.toGMTString();
		}
		document.cookie = name+"="+value+expires+"; path=/";
	}
	
	readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)===' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}
	
	eraseCookie(name) {
		this.createCookie(name,"",-1);
	}

	render() {
		let cookiesAlert = null;
		if (this.readCookie('printCookie') !== 'false') {
			cookiesAlert = <div className="cookies-alert w3-bottom">
				<div className="cookies-alert-inner">
					<p className="primary-font w3-show-inline-block">
						{front.renderText(
							this.state.cookie['caption_'+this.context.lang],
							this.props.changeColor,
							this.props.resetColor
						)}
					</p>
					<button
						className="cookies-button w3-show-inline-block w3-bar-item"
						onClick={() => {
							this.createCookie('printCookie', 'false', 360);
							this.setState({printCookies: false})
						}
					}>
					</button>
				</div>
			</div>
		}

		return <>{cookiesAlert}</>
	}
}

Cookies.contextType = UserContext;