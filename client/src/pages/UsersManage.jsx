import React, { useState, useEffect } from "react";
import Sidebar from "../components/sideBar";
import TopBar from "../components/topBar";
import dummyUsers from "../dummyDb/users";
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
  };

  const handleCreateOrUpdate = (event) => {
    event.preventDefault();
    if (selectedUser) {
      // Update user
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id
            ? {
                ...selectedUser,
                username,
                password,
                img_url,
              }
            : user
        )
      );
    } else {
      // Create user
      setUsers([
        ...users,
        {
          id: users.length + 1,
          username,
          password,
          img_url,
        },
      ]);
    }
    handleClosePopup();
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
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
                  <td>{user.password}</td>
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
                      onClick={() => handleDelete(user.id)}
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
    </div>
  );
};

export default UsersManage;
