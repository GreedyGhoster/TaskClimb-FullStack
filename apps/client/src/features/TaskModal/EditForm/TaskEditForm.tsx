import React, { useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { EditToDoTaskFormValues, IToDoTask } from "../../../types";
import { useTasks } from "../../../hooks";
import { FormTextField } from "../../../components/form";
import { Button, Tooltip } from "@mui/material";
import TaskStatusItem from "../../../components/tasks/TaskStatusItem";

interface TaskEditFormProps {
  projectId: string;
  task: IToDoTask;
}

export const TaskEditForm: React.FC<TaskEditFormProps> = ({
  projectId,
  task,
}) => {
  const { editTask } = useTasks();
  const { trigger } = editTask(task.id, projectId);

  const formMethods = useForm<EditToDoTaskFormValues>({
    defaultValues: {
      description: task.description,
      title: task.title,
      status: task.status,
    },
  });

  const { handleSubmit } = formMethods;

  const handleClickForm = useCallback(
    async (values: EditToDoTaskFormValues) => {
      trigger(values as any);
    },
    [trigger, task.id, projectId]
  );

  return (
    <>
      <FormProvider {...formMethods}>
        <TaskStatusItem />
        <FormTextField
          sx={{
            width: "100%",
            marginTop: "1rem",
          }}
          name={"description"}
          spellCheck="false"
          variant="standard"
          label="Description"
          placeholder="Description in several rows"
          multiline
        />
      </FormProvider>
      <Tooltip title="Save changes">
        <Button
          sx={{
            float: "right",
            marginBottom: "2%",
            marginTop: "2%",
            marginRight: "1%",
          }}
          color="success"
          variant="outlined"
          onClick={handleSubmit(handleClickForm)}
        >
          Save
        </Button>
      </Tooltip>
    </>
  );
};
