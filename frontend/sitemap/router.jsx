import React from 'react';
import { Route, Switch } from 'react-router';
 
export default (
	<Switch>       
		<Route path="/" />
		<Route exact path="/projects" />
		<Route exact path="/collections_typologie" />
		<Route exact path="/exhibitions" />
		<Route path="/about">
			<Route path="/thesis" />
		</Route>
		<Route exact path="/legalnotices" />
		<Route />
	</Switch>
);