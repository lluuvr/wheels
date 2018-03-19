import React from "react";
import PropTypes from 'prop-types';

const KitNewC = ({data, handleSubmit, handleChange, disabled, isUpdate}) => (
  <form
    className='d-flex flex-column align-items-center'
    onSubmit={handleSubmit}
  >
    <input
      name='name'
      value={data.name}
      placeholder='name'
      onChange={handleChange}
    />
    <input
      name='description'
      value={data.description}
      placeholder='description'
      onChange={handleChange}
    />
    <input
      name='price'
      type='number'
      value={data.price}
      placeholder='price'
      onChange={handleChange}
    />
    <input
      name='model'
      type='file'
      onChange={handleChange}
    />
    <label>model</label>
    <input
      name='preview'
      type='file'
      onChange={handleChange}
    />
    <label>preview image</label>
    <button
      type='submit'
      className='btn-primary'
      disabled={disabled}
    >
      {isUpdate ? 'update' : 'add'}
    </button>
  </form>
);

KitNewC.propTypes = {
  data: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  isUpdate: PropTypes.bool.isRequired
};

export default KitNewC;