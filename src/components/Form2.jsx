import React, { Component } from 'react';
import './Form.css';

class Form2 extends Component {
  state = {
    formData: {
      name: this.props.data?.name || '',
      email: this.props.data?.email || '',
      id: this.props.data?.id || '',
    },
    errors: {},
  };

  validate = () => {
    const { formData } = this.state;
    let validationErrors = {};

    if (!formData.name.trim()) {
      validationErrors.name = 'Name is required';
    }

    if (!formData.email) {
      validationErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      validationErrors.email = 'Invalid email format';
    }

    this.setState({ errors: validationErrors });
    return Object.keys(validationErrors).length === 0;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.validate()) {
      this.props.onSubmit(this.state.formData);
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: { ...prevState.formData, [name]: value },
    }));
  };

  render() {
    const { mode } = this.props;
    const { formData, errors } = this.state;

    return (
      <div className="form-container">
        <h2>{mode === 'add' ? 'Add User' : 'Update User'}</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={this.handleChange}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={this.handleChange}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          {mode === 'add' && (
            <div className="form-group">
              <label>ID:</label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={this.handleChange}
              />
            </div>
          )}
          <button type="submit">{mode === 'add' ? 'Add' : 'Update'}</button>
        </form>
      </div>
    );
  }
}

export default Form2;
