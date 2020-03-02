import React, { useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import config from '../config';
import front from '../Utils/front.utils';
import Fade from 'react-bootstrap/Fade';

const navbar = config.Onces.find(elem => elem.name === "navbar");

const FixedSidebar = props => {
	const matches = !(navbar.entries.find(entry => entry.name === props.location.pathname.split('/')[1])
		|| props.location.pathname.includes('/legalnotices'));
	const [open, setOpen] = useState(false);
	if (!(matches || props.location.pathname.includes('/admin')) && !open) setOpen(true);
	if ((matches || props.location.pathname.includes('/admin')) && open) setOpen(false);

	return (
		<nav className={`${props.location.pathname.includes('/admin') ? "nav-title" : ""} navbar navbar-default`} role="navigation">
			<div className="container-fluid">
				<div className="navbar-header">
					<Link to="/" onMouseDown={props.changeColor} onMouseUp={props.resetColor}>
						<span className="navbar-brand">{props.title['name']}</span>
						<Fade appear={true} in={!open}>
							<span className="navbar-brand">{props.title['occupation_'+props.context.lang]}</span>
						</Fade>
					</Link>
				</div>
				<Fade mountOnEnter={true} unmountOnExit={true} appear={true} in={open}>
					<ul className="nav navbar-nav navbar-right">
						{navbar.entries.map(navkey => (
							<li key={navkey.name}>
								<NavLink to={`/${navkey.name}`} onMouseDown={props.changeColor} onMouseUp={props.resetColor} className="navbar-text" activeClassName="active">
									{front.renderText(props.navbar[navkey.name+'_'+props.context.lang], props.changeColor, props.resetColor)}
								</NavLink>
							</li>
						))}
						{/* <li className="navbar-text lang">
							<button onClick={props.changeLang} className="">
								{(props.context.lang === 'fr') ? 'En' : 'Fr'}
							</button>
						</li> */}
					</ul>
				</Fade>
			</div>
		</nav>
	)
};

export default FixedSidebar;