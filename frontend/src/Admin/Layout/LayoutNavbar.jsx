import React from 'react';
import { NavLink } from "react-router-dom";
import front from '../../Utils/front.utils';

const LayoutNavbar = ({ resources, ...props }) => (
  <nav className="nav-back w3-center">
    {resources.map(resource => (
      <NavLink key={resource.name} to={props.match.url + `/${resource.name}`} activeClassName="w3-black">
        <button className="w3-bar-item w3-border w3-btn">
          {front.renderTitle(resource)}
        </button>
      </NavLink>)
    )}
  </nav>
);

export default LayoutNavbar;