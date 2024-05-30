import { FC, useCallback } from "react";
import { EditToDoTaskFormValues, IToDoTask } from "../../../../types";
import { useTasks } from "../../../../hooks";
import { FormProvider, useForm } from "react-hook-form";
import { FormTextField } from "../../../../components/form";
import CancelIcon from "@mui/icons-material/Cancel";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";

interface Props {
  task: IToDoTask;
  projectId: string;
  onCancel: () => void;
}

const EditTaskInlineForm: FC<Props> = ({ task, projectId, onCancel }) => {
  const { editTask } = useTasks();

  const formMethods = useForm<EditToDoTaskFormValues>({
    defaultValues: {
      title: task.title,
      description: task.description,
      status: task.status,
    },
  });

  const { handleSubmit } = formMethods;

  const handleSubmitForm = useCallback(
    async (values: EditToDoTaskFormValues) => {
      if (values.title.trim() !== "") {
        editTask(task.id, projectId, values);
        onCancel();
      }
    },
    [editTask, onCancel, task.id]
  );

  return (
    <FormProvider {...formMethods}>
      <Stack
        direction={"row"}
        spacing={1}
        component={"form"}
        margin="dense"
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <FormTextField
          inputProps={{ maxLength: 43 }}
          sx={{
            height: "3rem",
            width: "100%",
          }}
          name={"title"}
          variant="filled"
          size="small"
          color="warning"
          placeholder="Edit task"
        />
        <IconButton onClick={handleSubmit(handleSubmitForm)}>
          <CheckIcon color="success" />
        </IconButton>
        <IconButton onClick={onCancel}>
          <CancelIcon />
        </IconButton>
      </Stack>
    </FormProvider>
  );
};

export default EditTaskInlineForm;
