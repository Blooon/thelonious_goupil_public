import React from 'react';
import front from '../../Utils/front.utils';

const AdminInput = ({ type, name, value, onChange, lang }) => (
  <div className="admin-input">
    <p className="secondary-font w3-show-inline-block">
      {lang ? front.renderLanguage(name) : name.split('_').join(' ')}
    </p> 
    <input className="tertiary-font" type={type} name={name} value={value} onChange={onChange}/>
  </div>
);

export default AdminInput;