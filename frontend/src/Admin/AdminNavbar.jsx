import React from 'react';
import { NavLink, Link } from "react-router-dom";
import front from '../Utils/front.utils';

const AdminNavbar = ({ resources, ...props }) => (
  <>
    <div className="return-disconnect">
      <Link to="/" className="return w3-bar-item w3-border w3-btn w3-white secondary-font">
        Retour
      </Link>
      <button
        className="disconnect w3-bar-item w3-border w3-btn w3-white secondary-font"
        onClick={props.logout}
      >
        Déconnexion
      </button>
    </div>
    <nav className="nav-back w3-center">
      <h1 className="home-back">Backoffice administrateur</h1>
      <div>
        {resources.map(resource => {
          return (
            <NavLink key={resource.name} to={`/admin/${resource.name}`} activeClassName="w3-black">
              <button className="w3-bar-item w3-border w3-btn secondary-font">
                {front.renderTitle(resource)}
              </button>
            </NavLink>
          )
        })}
        <NavLink to={`/admin/once`} activeClassName="w3-black">
          <button className="w3-bar-item w3-border w3-btn secondary-font">
            Layout
          </button>
        </NavLink>
      </div>
    </nav>
  </>
);

export default AdminNavbar;