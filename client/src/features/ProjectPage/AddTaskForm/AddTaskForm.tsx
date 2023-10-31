import { FC, useCallback } from "react";
import { FormTextField } from "../../../components/form";
import { FormProvider, useForm } from "react-hook-form";
import { AddToDoTaskFormValues, ToDoTaskStatus } from "../../../types";
import { useTodo } from "../../../hooks";
import Box from "@mui/material/Box";
import axios from "axios";

interface Props {
  projectId: string;
}

const AddTaskForm: FC<Props> = ({ projectId }) => {
  const { addTask, token } = useTodo();

  // const URL = `http://localhost:4580/projects/${projectId}`;

  // const authToken = `Bearer ${token}`;

  // const fetchData = (title: string) => {
  //   const data = {
  //     title: title,
  //   };

  //   axios
  //     .post(URL, data, { headers: { Authorization: authToken } })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch(() => {
  //       alert("The user does not exist or Password is incorrect");
  //     });
  // };

  const formMethods = useForm<AddToDoTaskFormValues>({
    defaultValues: {
      title: "",
      status: ToDoTaskStatus.new,
    },
  });

  const { handleSubmit, reset } = formMethods;

  const handleSubmitForm = useCallback(
    async (values: AddToDoTaskFormValues) => {
      if (values.title.trim() !== "") {
        addTask(projectId, values);
        reset({
          ...values,
          title: "",
        });
        // fetchData(values.title);
      }
    },
    [addTask, reset, projectId]
  );

  return (
    <FormProvider {...formMethods}>
      <Box
        sx={{
          marginTop: "7px",
        }}
        component={"form"}
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <FormTextField
          label={"Add task"}
          inputProps={{ maxLength: 43 }}
          name={"title"}
          placeholder="Add task"
        />
      </Box>
    </FormProvider>
  );
};

export default AddTaskForm;
