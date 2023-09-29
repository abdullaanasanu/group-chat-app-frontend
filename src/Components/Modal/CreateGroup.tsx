import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Contexts/userContext";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";

interface ICreateGroupForm {
  name: string;
}

const CreateGroup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<ICreateGroupForm>();
  const { token } = useUser();

  const onSubmit = async (data: ICreateGroupForm) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/group/create",
        data,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response);
      // setShow(false);
      navigate("/group/" + response.data.group._id);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Dialog.Content style={{ maxWidth: 450 }}>
      <Dialog.Title>Edit profile</Dialog.Title>
      <Dialog.Description size="2" mb="4">
        Create new group to start chatting with your friends
      </Dialog.Description>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Name
            </Text>
            <TextField.Input
              placeholder="Enter your group name"
              {...register("name", { required: true })}
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button color="green" type="submit" >Create</Button>
          </Dialog.Close>
        </Flex>
      </form>
    </Dialog.Content>
    // <div className="modal" style={{ display: show ? "block" : "none" }}>
    //   <div className="modal-content create-group">
    //     <span className="close" onClick={() => setShow(false)}>
    //       &times;
    //     </span>
    //     <h1>Create Group</h1>
    //     <form onSubmit={handleSubmit(onSubmit)}>
    //       <div className="form-group">
    //         <input
    //           type="text"
    //           id="group-name"
    //           className="form-control"
    //           placeholder="Group Name"
    //           {...register("name", { required: true })}
    //         />
    //       </div>
    //       <button className="btn btn-primary" type="submit">
    //         Create
    //       </button>
    //     </form>
    //   </div>
    // </div>
  );
};

export default CreateGroup;
