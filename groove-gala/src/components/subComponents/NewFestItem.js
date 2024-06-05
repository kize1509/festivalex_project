import "../../styles/subComponentStyles/NewFestItemStyles.css";

function NewFestItem({ name, value, tp, onInputChange }) {
  return (
    <div className='nf-item'>
      <div className='nf-prop-container'>
        <h3 className='nf-prop-heading'>{name}</h3>
      </div>
      <div className='nf-val-container'>
        <input
          name={name}
          value={value}
          className='nf-prop-val'
          type={tp}
          onChange={(e) => onInputChange(name, e.target.value)}
        />
      </div>
    </div>
  );
}

export default NewFestItem;
