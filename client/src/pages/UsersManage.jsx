import React, { useState, useEffect } from "react";
import Sidebar from "../components/sideBar";
import TopBar from "../components/topBar";
import axios from "axios";
import "../styles/Admin.css";

const UsersManage = () => {
  const [users, setUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [status, setStatus] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(9);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:4000/user/getAll");
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setUsername(selectedUser.username);
      setPassword("");
      setRole(selectedUser.role);
      setStatus(selectedUser.status);
    } else {
      setUsername("");
      setPassword("");
      setRole("admin");
      setStatus(false);
    }
  }, [selectedUser]);

  const handleOpenPopup = (user) => {
    setSelectedUser(user);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setSelectedUser(null);
    setShowPopup(false);
    setShowDeleteConfirmation(false);
  };

  const handleShowDeleteConfirmation = (userId) => {
    setUserId(userId);
    setShowDeleteConfirmation(true);
  };

  const handleCreateOrUpdate = async (event) => {
    event.preventDefault();
    const userData = {
      username,
      password,
      role,
      status,
    };

    if (selectedUser) {
      try {
        const response = await axios.patch(
          `http://127.0.0.1:4000/user/update/${selectedUser._id}`,
          userData
        );
        const updatedUsers = users.map((user) =>
          user._id === selectedUser._id
            ? { ...user, ...response.data.data }
            : user
        );
        setUsers(updatedUsers);
        handleClosePopup();
      } catch (error) {
        console.error("Error updating user:", error);
      }
    } else {
      try {
        const response = await axios.post(
          "http://127.0.0.1:4000/user/create",
          userData
        );
        setUsers([...users, response.data.data]);
        handleClosePopup();
      } catch (error) {
        console.error("Error creating user:", error);
      }
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:4000/user/delete/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
      handleClosePopup();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="screen-container">
      <Sidebar />
      <TopBar />
      <div className="container-wrapper">
        <div className="container">
          <button
            className="button-admin"
            onClick={() => handleOpenPopup(null)}
          >
            Create User
          </button>
          <table className="product-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td>{user.status ? "Active" : "Not Active"}</td>
                  <td>
                    <button
                      className="button-admin"
                      onClick={() => handleOpenPopup(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="button-admin"
                      style={{
                        color: "white",
                        backgroundColor: "red",
                        marginLeft: "5px",
                      }}
                      onClick={() => handleShowDeleteConfirmation(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => handleClick(number)}
                className={currentPage === number ? "active" : ""}
              >
                {number}
              </button>
            ))}
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleClosePopup}>
              &times;
            </span>
            <h2>{selectedUser ? "Update User" : "Create User"}</h2>
            <form onSubmit={handleCreateOrUpdate}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <select
                className="select-admin"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="admin">Admin</option>
                <option value="cashier">Cashier</option>
                <option value="stockManager">Stock Manager</option>
                <option value="kitchenManager">Kitchen Manager</option>
              </select>
              <label>
                <input
                  style={{ margin: "0px 10px 15px 5px" }}
                  type="checkbox"
                  checked={status}
                  onChange={(e) => setStatus(e.target.checked)}
                />
                Active
              </label>
              <button className="button-admin" type="submit">
                {selectedUser ? "Update" : "Create"}
              </button>
              <button
                className="button-admin"
                style={{ marginTop: "5px", backgroundColor: "red" }}
                type="button"
                onClick={handleClosePopup}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirmation && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handleClosePopup}>
              &times;
            </span>
            <label>Are you sure you want to delete user {userId}?</label>
            <button onClick={handleDelete}>Delete User</button>
            <button
              style={{ color: "white", backgroundColor: "red" }}
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersManage;
