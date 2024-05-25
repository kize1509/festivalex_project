function ListComponent({ name }) {
  return (
    <div className='org-data-item'>
      <div className='orgz-prop'>
        <h5 className='prop-headz'>NAME</h5>
      </div>
      <input className='org-value' placeholder={name} />
    </div>
  );
}

export default ListComponent;
