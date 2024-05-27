import "../../styles/subComponentStyles/NewFestItemStyles.css";

function NewFestItem({ name, value, tp }) {
  return (
    <div className='nf-item'>
      <div className='nf-prop-container'>
        <h3 className='nf-prop-heading'>{name}</h3>
      </div>
      <div className='nf-val-container'>
        <input placeholder={value} className='nf-prop-val' type={tp} />
      </div>
    </div>
  );
}

export default NewFestItem;
