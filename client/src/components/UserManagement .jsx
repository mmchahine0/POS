import React, { useState } from "react";
import "../styles/Admin.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: "", password: "" });

  const handleAddUser = () => {
    setUsers([...users, newUser]);
    setNewUser({ username: "", password: "" });
  };

  const handleDeleteUser = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  const handleEditUser = (index, field, value) => {
    const updatedUsers = users.map((user, i) =>
      i === index ? { ...user, [field]: value } : user
    );
    setUsers(updatedUsers);
  };

  return (
    <div className="user-management">
      <h2 className="h2-admin">Manage Users</h2>
      <input
        className="input-admin"
        type="text"
        value={newUser.username}
        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        placeholder="Username"
      />
      <input
        className="input-admin"
        type="password"
        value={newUser.password}
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        placeholder="Password"
      />
      <button className="button-admin" onClick={handleAddUser}>
        Add User
      </button>
      <ul className="ul-admin">
        {users.map((user, index) => (
          <li className="li-admin" key={index}>
            <input
              className="input-admin"
              type="text"
              value={user.username}
              onChange={(e) =>
                handleEditUser(index, "username", e.target.value)
              }
            />
            <input
              className="input-admin"
              type="password"
              value={user.password}
              onChange={(e) =>
                handleEditUser(index, "password", e.target.value)
              }
            />
            <button
              className="button-admin"
              onClick={() => handleDeleteUser(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
