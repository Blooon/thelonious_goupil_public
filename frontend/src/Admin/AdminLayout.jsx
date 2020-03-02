import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import config from '../config';
import LayoutNavbar from './Layout/LayoutNavbar';
import LayoutResource from './Layout/LayoutResource';

const resources = config.Onces;

const AdminLayout = ({ languages, ...props}) => (
	<Router>
		<div>
			<LayoutNavbar resources={resources} {...props} />
			{resources.map(resource => (
				<Route
					key={resource.name}
					path={props.match.url + `/${resource.name}`}
					render={props => <LayoutResource languages={languages} resource={resource} {...props} />}
				/>
			))}
		</div>
	</Router>
);

export default AdminLayout;