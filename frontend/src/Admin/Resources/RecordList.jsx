import React from 'react';
import front from '../../Utils/front.utils';
import RecordShow from './RecordShow';

const RecordList = props => {
  const records = props.properties.find(property => property.name === 'date')
    ? front.orderByDate(props.records)
    : props.records;
  return (
    <section className="w3-col l8 record-list">
      <h2 className="primary-font">{props.title} déjà ajoutés</h2>
      {records.map(record => (
        <RecordShow key={record.id} record={record} {...props} />
      ))}
    </section>
)
};
  
export default RecordList;