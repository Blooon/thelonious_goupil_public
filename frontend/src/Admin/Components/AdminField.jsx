import React from 'react';
import front from '../../Utils/front.utils';

const AdminField = ({ property, name, value, lang, ...props }) => {
  if (property.type === 'file') {
    return (
      <div className="admin-field">
        <p className="secondary-font">
          {lang ? front.renderLanguage(name) : name.split('_').join(' ')}
        </p>
        <img
          className="admin-image"
          src={process.env.REACT_APP_S3_BUCKET_BASE_URL + value}
          alt={property.name}
        />
      </div>
    )
  } else if (property.type === 'color') {
    return (
      <div className="admin-field">
        <p className="secondary-font">
          {lang ? front.renderLanguage(name) : name.split('_').join(' ')}
        </p> 
        <div className="color-box" style={{backgroundColor: value}}></div>
      </div>
    )
  } else {
    return (
      <div className="admin-field">
        <p className="secondary-font">
          {lang ? front.renderLanguage(name) : name.split('_').join(' ')}
        </p>
        <p className="tertiary-font">
          {front.renderText(value, props.changeColor, props.resetColor)}</p>
      </div>
    )
  }
};

export default AdminField;