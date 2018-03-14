import React, {Component} from "react";
import Storage, {STORAGE_WHEELS} from '../../utils/storage';

class KitNew extends Component {

  constructor(props) {
    super(props);
    const {state} = props.location;
    const name = !!state ? state.name : '';
    const description = !!state ? state.description : '';
    const model = !!state ? state.model : null;
    const preview = !!state ? state.preview : null;
    const price = !!state ? state.price : '';
    this.state = {
      name: name,
      description: description,
      model: model,
      preview: preview,
      price: price
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.disabled()) return;
    const data = this.state;
    data.name = data.name.trim();
    data.description = data.description.trim();
    const {state} = this.props.location;
    if (!!state) Storage.updateArr(STORAGE_WHEELS, state.id, data);
    else Storage.append(STORAGE_WHEELS, data);
    this.props.history.push('/kit/list');
  };

  handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    let value;
    if (!!target.files) value = target.files[0].name;
    else value = target.value;
    this.setState({[name]: value});
  };

  disabled = () => {
    return !this.state.name || !this.state.price;
  };

  render() {
    return (
      <section>
        <form
          className='d-flex flex-column align-items-center'
          onSubmit={this.handleSubmit}
        >
          <input
            name='name'
            value={this.state.name}
            placeholder='name'
            onChange={this.handleChange}
          />
          <input
            name='description'
            value={this.state.description}
            placeholder='description'
            onChange={this.handleChange}
          />
          <input
            name='price'
            type='number'
            value={this.state.price}
            placeholder='price'
            onChange={this.handleChange}
          />
          <input
            name='model'
            type='file'
            onChange={this.handleChange}
          />
          <input
            name='preview'
            type='file'
            onChange={this.handleChange}
          />
          <button
            type='submit'
            className='btn-primary'
            disabled={this.disabled()}
          >
            add
          </button>
        </form>
      </section>
    );
  }
}

export default KitNew;