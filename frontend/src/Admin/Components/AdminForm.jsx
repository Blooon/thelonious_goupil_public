import React, { Fragment } from 'react';
import AdminInput from './AdminInput';

const AdminForm = ({ properties, name, record, classes, error, create, languages, ...props }) => (
  <section className={classes}>
    <div className="primary-font w3-center">{error}</div>
    <h2 className="primary-font">{create ? 'Ajouter un' : 'Modifier le'} {name.split('_').join(' ')}</h2>
    <form onSubmit={props.onSubmit}>
      {properties.map(property => (
        property.lang
          ? (
            <Fragment key={property.name}>
              {languages.map(lang => (
                <AdminInput
                  key={`${property.name}_${lang}`}
                  type={property.type}
                  name={`${property.name}_${lang}`}
                  value={record[`${property.name}_${lang}`]}
                  onChange={property.type === 'file' ? e => props.fileChange(e, property.name) : props.onChange}
                  lang={true}
                />
              ))}
            </Fragment>
          )
          : (
            <AdminInput
              key={property.name}
              type={property.type}
              name={property.name}
              value={property.type === 'file' ? undefined : record[property.name]}
              onChange={property.type === 'file' ? e => props.fileChange(e, property.name) : props.onChange}
              lang={false}
            />
          )
        )
      )}
      <input readOnly className="w3-panel w3-right secondary-font submit-button" type="Submit" value={create ? 'Ajouter' : 'Modifier'} />
    </form>
  </section>
);

export default AdminForm;