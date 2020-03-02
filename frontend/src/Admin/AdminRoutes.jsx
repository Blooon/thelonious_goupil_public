import React, { Fragment } from 'react';
import { Route } from "react-router-dom";
import front from '../Utils/front.utils';
import AdminResource from './AdminResource';
import RecordEdit from './Resources/RecordEdit';
import AdminLayout from './AdminLayout';

const AdminRoutes = ({ resources, languages, changeColor, resetColor }) => (
  <>
    {resources.map(resource => (
      <Fragment key={resource.name}>
        <Route exact path={`/admin/${resource.name}`} render={props => (
          <AdminResource
            title={front.renderTitle(resource)}
            resource={resource}
            languages={languages}
            changeColor={changeColor}
            resetColor={resetColor}
            {...props}
          />)}
        />
        <Route exact path={`/admin/${resource.name}/:itemId`} render={props => (
          <RecordEdit
            languages={languages}
						name={resource.name}
						properties={resource.items}
						gotFileList={resource.params.gotFileList}
						gotImagesList={resource.params.gotImagesList}
						types={resource.types}
            changeColor={changeColor}
            resetColor={resetColor}
            {...props}
          />)}
        />
      </Fragment>
    ))}
    <Route path="/admin/once" render={props => <AdminLayout languages={languages} {...props} />} />
  </>
);

export default AdminRoutes;