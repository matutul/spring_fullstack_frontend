import { useForm } from "react-hook-form";
import { Form, Modal, Row } from "react-bootstrap";
import axios from "axios";

const AddUser = ({ isShow, setShow }) => {
  const handleClose = () => {
    setShow(false);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await axios.post("http://localhost:8080/user", data);
    handleClose();
    data.preventDefault();
  };

  return (
    <Modal show={isShow} onHide={() => setShow(false)}>
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
            />
            {errors.name && (
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
            />
            {errors.username && (
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
            />
            {errors.email && (
              <span className="text-warning">Enter a valid email address</span>
            )}
          </Row>

          <Row className="d-flex justify-content-end gap-3">
            <button
              type="submit"
              className="w-auto px-4 btn btn-success py-1 justify-content-center"
            >
              Submit
            </button>
            <button
              className="w-auto px-3 btn btn-outline-danger py-1 justify-content-center"
              onClick={() => setShow(false)}
            >
              Close
            </button>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddUser;
