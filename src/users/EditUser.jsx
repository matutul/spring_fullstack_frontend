import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Modal, Row } from "react-bootstrap";

const EditUser = ({ isShow, setShow, userId }) => {
  const [user, setUser] = useState(null);
  // const [needUpdate, setNeedUpdate] = useState(true);
  // const [formData, setFormData] = useState({
  //   name: "",
  //   username: "",
  //   email: "",
  // });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    loadUser(userId);
  }, [userId]);

  const loadUser = async (userId) => {
    const url = `http://localhost:8080/user/${userId}`;
    const loadedUser = await axios.get(url);
    setUser(loadedUser.data);
    reset({ ...loadedUser.data });
    // console.log(user)
  };

  const onSubmit = async (data) => {
    if (data !== user) {
      const url = `http://localhost:8080/user/${userId}`;
      await axios.put(url, data);
    }
    setShow(false);
    // data.preventDefault();
  };
  // const handleOnchange = (e) => {
  //   if (e.target.name) {
  //     setFormData({ ...formData, [e.target.name]: e.target.value });
  //   }
  //   if (user !== formData) {
  //     setNeedUpdate(true);
  //   } else {
  //     setNeedUpdate(false);
  //   }
  // };
  return (
    <Modal show={isShow && user} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{userId}</Modal.Title>
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
              defaultValue={user?.name}
              // onChange={(e) => handleOnchange(e)}
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
              defaultValue={user?.username}
              // onChange={(e) => handleOnchange(e)}
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
              defaultValue={user?.email}
              // onChange={(e) => handleOnchange(e)}
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
              Update
            </button>
            <button
              className="w-auto px-3 btn btn-outline-danger py-1 justify-content-center"
              onClick={(e) => {
                e.preventDefault();
                setShow(false);
              }}
            >
              Close
            </button>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditUser;
