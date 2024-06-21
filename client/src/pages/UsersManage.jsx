import React, { useState, useEffect } from "react";
import Sidebar from "../components/sideBar";
import TopBar from "../components/topBar";
import dummyUsers from "../dummyDb/users";
import axios from "axios";
import "../styles/Admin.css";

const UsersManage = () => {
  const [users, setUsers] = useState(dummyUsers);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [img_url, setImgUrl] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(9);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:4000/user/getAll");
        const usersArray = response.data.data;
        setUsers(usersArray);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setUsername(selectedUser.username);
      setPassword(selectedUser.password);
      setImgUrl(selectedUser.img_url);
    } else {
      setUsername("");
      setPassword("");
      setImgUrl("");
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
      role: "user", // Assuming 'user' role by default, adjust as needed for your use case.
    };

    if (selectedUser) {
      // Update user
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
        alert("User updated successfully");
      } catch (error) {
        console.error("Error updating user:", error);
        alert(error.response?.data?.message || "Failed to update user");
      }
    } else {
      // Create user
      try {
        const response = await axios.post(
          "http://127.0.0.1:4000/user/create",
          userData
        );
        setUsers([...users, response.data.data]);
        handleClosePopup();
        alert("User created successfully");
      } catch (error) {
        console.error("Error creating user:", error);
        alert(error.response?.data?.message || "Failed to create user");
      }
    }
  };

  const handleDelete = async () => {
    const id = userId;
    try {
      await axios.delete(`http://127.0.0.1:4000/user/delete/${id}`);
      setUsers(users.filter((user) => user._id !== id));
      handleClosePopup();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const pageNumbers = [];
  for (let i = 1; i <= users.length / usersPerPage; i++) {
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
                <th>Password</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td className="scrollable-cell">{user.password}</td>
                  <td>
                    <img
                      src={user.img_url}
                      alt={user.username}
                      width="50"
                      height="50"
                    />
                  </td>
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
              <input
                type="text"
                placeholder="Image URL"
                value={img_url}
                onChange={(e) => setImgUrl(e.target.value)}
                required
              />
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
            <label>Are you sure you want to Delete {userId} ?</label>
            <button onClick={handleDelete}>Delete Order</button>
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
