import axios from "axios";

import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import AddUser from "../users/AddUser";
import ViewUser from "../users/ViewUser";
import EditUser from "../users/EditUser";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [modalEvent, setModalEvent] = useState(null);
  const [userId, setUserId] = useState(null);

  const handleShow = (e) => {
    e.preventDefault();
    if (e.target.name) {
      setModalEvent(e.target.name);
      // setModalEvent("view");
      setUserId(e.target.value);
      setShow(true);
    }
    console.log(modalEvent, userId);
  };

  useEffect(() => {
    loadUsers();
  }, [show, users]);

  const loadUsers = async () => {
    const loadedUsers = await axios.get("http://localhost:8080/users");
    setUsers(loadedUsers.data);
  };

  const handleDeleteUserBtn = async (e) => {
    e.preventDefault();
    const url = `http://localhost:8080/user/${e.target.value}`;
    const deleteUserResponse = await axios.delete(url);
    if (deleteUserResponse.status == 200) {
      const updatedUser = users.filter((user) => user.id !== e.target.value);
      setUsers(updatedUser);
    }
  };
  return (
    <div className="container min-vh-100 py-5">
      <Button
        variant="primary"
        name="addNew"
        onClick={(e) => handleShow(e)}
        className="my-2 ml-auto"
      >
        Add new user
      </Button>

      {modalEvent == "addNew" && <AddUser isShow={show} setShow={setShow} />}
      {modalEvent == "view" && (
        <ViewUser isShow={show} setShow={setShow} userId={userId} />
      )}
      {modalEvent == "edit" && (
        <EditUser isShow={show} setShow={setShow} userId={userId} />
      )}

      {users.length ? (
        <table className="table table-responsive caption-top p-0 bg-white rounded-4 shadow overflow-hidden">
          <caption>List of users</caption>
          <thead>
            <tr>
              <th scope="col" className="text-center">
                #
              </th>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col" className="text-center fit-content">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <th scope="row" className="text-center">
                  {index}
                </th>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td className="text-end">
                  <button
                    name="view"
                    value={user.id}
                    className="btn btn-primary py-0 mx-1"
                    onClick={(e) => {
                      handleShow(e);
                    }}
                  >
                    View
                  </button>
                  <button
                    name="edit"
                    value={user.id}
                    className="btn btn-outline-primary py-0 mx-1"
                    onClick={(e) => {
                      handleShow(e);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger py-0 mx-1"
                    value={user.id}
                    onClick={(e) => {
                      handleDeleteUserBtn(e);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="h-100 w-100 d-flex justify-content-center pt-5">
          <p className="fs-2 text-warning">No users are existed!!</p>
        </div>
      )}
    </div>
  );
};

export default Home;
