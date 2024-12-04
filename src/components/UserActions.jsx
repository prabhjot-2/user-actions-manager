import React, { Component } from 'react';
import axios from 'axios';
import Form2 from './Form2';
import './UserActions.css';

class UserActions extends Component {
  state = {
    users: [],
    selectedId: null,
    mode: 'read', // Modes: read, add, update, delete
    currentUser: null,
  };

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    const response = await axios.get('http://localhost:4500/users');
    this.setState({ users: response.data });
  };

  handleRead = () => {
    this.setState({ mode: 'read' });
  };

  handleAdd = () => {
    this.setState({ mode: 'add', currentUser: null });
  };

  handleUpdate = () => {
    const { users, selectedId } = this.state;
    if (!selectedId) return alert('Select a user to update.');
    const user = users.find((u) => u.id === selectedId);
    this.setState({ mode: 'update', currentUser: user });
  };

  handleDelete = async () => {
    const { selectedId } = this.state;
    if (!selectedId) return alert('Select a user to delete.');
    await axios.delete(`http://localhost:4500/users/${selectedId}`);
    alert('User deleted successfully!');
    this.fetchUsers();
    this.setState({ selectedId: null });
  };

  handleSubmit = async (data) => {
    const { mode } = this.state;
    if (mode === 'add') {
      await axios.post('http://localhost:4500/users', data);
      alert('User added successfully!');
    } else if (mode === 'update') {
      await axios.put(`http://localhost:4500/users/${data.id}`, data);
      alert('User updated successfully!');
    }
    this.fetchUsers();
    this.setState({ mode: 'read' });
  };

  render() {
    const { users, selectedId, mode, currentUser } = this.state;

    return (
      <div className="user-actions-container">
        <div className="actions-buttons">
          <button onClick={this.handleRead}>Read</button>
          <button onClick={this.handleAdd}>Add</button>
          <button onClick={this.handleUpdate}>Update</button>
          <button onClick={this.handleDelete} disabled={!selectedId}>
            Delete
          </button>
        </div>

        {mode === 'read' && (
          <div className="user-list">
            <h2>User List</h2>
            <ul>
              {users.map((user) => (
                <li
                  key={user.id}
                  onClick={() => this.setState({ selectedId: user.id })}
                  className={selectedId === user.id ? 'selected' : ''}
                >
                  {user.name} - {user.email}
                </li>
              ))}
            </ul>
          </div>
        )}

        {mode === 'add' && <Form2 mode="add" onSubmit={this.handleSubmit} />}

        {mode === 'update' && (
          <Form2
            mode="update"
            onSubmit={this.handleSubmit}
            data={currentUser}
          />
        )}
      </div>
    );
  }
}

export default UserActions;
