import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Contexts/userContext";

export default function CreateGroup({ show, setShow }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { token } = useUser();

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post(process.env.REACT_APP_API_URL + "/group/create", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response);
        setShow(false);
        navigate("/group/" + response.data.group._id);
      });
  };

  return (
    <div className="modal" style={{ display: show ? "block" : "none" }}>
      <div className="modal-content create-group">
        <span className="close" onClick={() => setShow(false)}>
          &times;
        </span>
        <h1>Create Group</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              type="text"
              id="group-name"
              className="form-control"
              placeholder="Group Name"
              {...register("name", { required: true })}
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
