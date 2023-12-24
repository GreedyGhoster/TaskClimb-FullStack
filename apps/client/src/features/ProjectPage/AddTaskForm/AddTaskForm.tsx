import { FC, useCallback } from "react";
import { FormTextField } from "../../../components/form";
import { FormProvider, useForm } from "react-hook-form";
import { AddToDoTaskFormValues, ToDoTaskStatus } from "../../../types";
import { useTodo } from "../../../hooks";
import Box from "@mui/material/Box";

interface Props {
  projectId: string;
}

const AddTaskForm: FC<Props> = ({ projectId }) => {
  const { addTask } = useTodo();

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
