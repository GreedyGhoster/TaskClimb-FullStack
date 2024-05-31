import { FC, useCallback } from "react";
import { FormTextField } from "../../../components/form";
import { FormProvider, useForm } from "react-hook-form";
import { AddToDoTaskFormValues } from "../../../types";
import { useTasks } from "../../../hooks";
import Box from "@mui/material/Box";

interface Props {
  projectId: string;
}

const AddTaskForm: FC<Props> = ({ projectId }) => {
  const { addTask } = useTasks();
  const { trigger } = addTask(projectId);

  const formMethods = useForm<AddToDoTaskFormValues>({
    defaultValues: {
      title: "",
      status: "New",
    },
  });

  const { handleSubmit, reset } = formMethods;

  const handleSubmitForm = useCallback(
    async (values: AddToDoTaskFormValues) => {
      if (values.title.trim() !== "") {
        trigger(values as any);
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
