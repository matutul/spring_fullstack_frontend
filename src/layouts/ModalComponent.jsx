import { useForm } from "react-hook-form";
import { Form, Modal, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ModalComponent({ modalHandler, eventType, userId }) {
  console.log(userId);
  const [user, setUser] = useState(null);
  useEffect(() => {
    loadUsers();
  }, []);
  const loadUsers = async () => {
    const url = `http://localhost:8080/user/${userId}`
    const loadedUsers = await axios.get(url);
    setUser(loadedUsers.data);
  };
  console.log(user);





  const { show, handleClose, handleShow, onSubmit } = modalHandler;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <Modal show={show} onHide={(e) => handleClose(e)}>
      <Modal.Header closeButton>
        <Modal.Title>New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)} className="p-4">
          <Row className="my-2">
            <label className="px-0" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              className="w-100"
              {...register("name", { required: true })}
              disabled={eventType === "view" ? true : false}
              defaultValue={user?.name}
            />
            {errors.name && eventType !== "view" && (
              <span className="text-warning">Enter your fullname</span>
            )}
          </Row>

          <Row className="my-2">
            <label className="px-0" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              className="w-100"
              {...register("username", { required: true })}
              disabled={eventType === "view" ? true : false}
              defaultValue={user?.username}
            />
            {errors.username && eventType !== "view" && (
              <span className="text-warning">Choose a proper username</span>
            )}
          </Row>
          <Row className="my-2">
            <label className="px-0" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              className="w-100"
              {...register("email", { required: true })}
              disabled={eventType === "view" ? true : false}
              defaultValue={user?.email}
            />
            {errors.email && eventType !== "view" && (
              <span className="text-warning">Enter a valid email address</span>
            )}
          </Row>

          <Row className="d-flex justify-content-end gap-3">
            {(eventType === "edit" || eventType === "") && (
              <button
                type="submit"
                className="w-auto px-4 btn btn-success py-1 justify-content-center"
              >
                Submit
              </button>
            )}
            <button
              className="w-auto px-3 btn btn-outline-danger py-1 justify-content-center"
              onClick={(e) => {handleClose(e)}}
            >
              Close
            </button>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
