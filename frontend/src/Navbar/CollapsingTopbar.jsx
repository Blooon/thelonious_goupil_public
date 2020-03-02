import React, { Fragment, useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import config from '../config';
import front from '../Utils/front.utils';

const navbar = config.Onces.find(elem => elem.name === "navbar");

const CollapsingTopbar = props => {
	const [open, handleOpen] = useState(false);
	
	return (<Fragment>
		{(props.location.pathname === '/projects' || props.location.pathname === '/') ? 
			<Link to="/" className="brand">{props.title['name']}</Link>
		: null}
		<nav className="navbar fixed-top navbar-default" role="navigation">
			<div className="container-fluid">
				{!open ?
					<div className="navbar-header">
						{!props.location.pathname.includes('/admin')
							? props.location.pathname === '/'
								?
									<Link to="/" className="navbar-brand last-brand">
										{props.title['occupation_'+props.context.lang]}
									</Link>
								: 
									<button onClick={() => handleOpen(true)} className="open navbar-brand last-brand w3-bar-item w3-display-container">
									</button>
							: null
						}
					</div>
				:
					props.location.pathname === '/' || props.location.pathname.includes('/admin') ? null :
						<ul ref={props.nav} className="nav navbar-nav navbar-right">
							<button onClick={() => handleOpen(false)} className="close w3-bar-item w3-display-container">
							</button>
							{navbar.entries.map(navkey => (
								<li key={navkey.name}>
									<NavLink to={`/${navkey.name}`} onClick={() => handleOpen(false)} className="navbar-text" activeClassName="active">
										{front.renderInline(props.navbar[navkey.name+'_'+props.context.lang])}
									</NavLink>
								</li>
							))}
						</ul>
				}
			</div>
		</nav>
		</Fragment>
	)
};

export default CollapsingTopbar;