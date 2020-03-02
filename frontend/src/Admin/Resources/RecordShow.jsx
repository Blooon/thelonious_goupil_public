import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import AdminField from '../Components/AdminField';

const RecordShow = ({ record, properties, name, languages, ...props }) => (
  <article className="record-show w3-padding-24">
    <h3 className="primary-font w3-show-inline-block">{name.split('_').join(' ')} {record.id}</h3>
    <div className="w3-right">
      <Link to={`${props.match.path}/${record.id}`}>
        <button className="w3-bar-item w3-container secondary-font">Modifier</button>
      </Link>
      <button onClick={() => props.deleteItem(record.id)} className="admin-button secondary-font w3-bar-item w3-container">Supprimer</button>
    </div>
    {properties.map(property => (
      property.lang
        ? (
          <Fragment key={property.name}>
            {languages.map(lang => (
              <AdminField
                key={`${property.name}_${lang}`}
                property={property}
                name={`${property.name}_${lang}`}
                value={record[`${property.name}_${lang}`]}
                changeColor={props.changeColor}
                resetColor={props.resetColor}
                lang={true}
              />
            ))}
          </Fragment>
        )
        : (
          <AdminField
            key={property.name}
            property={property}
            name={property.name}
            value={record[property.name]}
            changeColor={props.changeColor}
            resetColor={props.resetColor}
            lang={false}
          />
        )
      )
    )}
  </article>
);

export default RecordShow;