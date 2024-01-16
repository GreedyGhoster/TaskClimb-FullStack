import React, { useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  EditToDoTaskFormValues,
  IToDoProject,
  IToDoTask,
} from "../../../types";
import { useTodo } from "../../../hooks";
import { FormTextField } from "../../../components/form";
import { Button, Tooltip } from "@mui/material";
import TaskStatusItem from "../../../components/tasks/TaskStatusItem";

interface TaskEditFormProps {
  project: IToDoProject;
  task: IToDoTask;
}

export const TaskEditForm: React.FC<TaskEditFormProps> = ({
  project,
  task,
}) => {
  const { editTask } = useTodo();
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
      editTask(task.id, project.id, values);
    },
    [editTask, task.id, project.id]
  );

  return (
    <>
      <TaskStatusItem task={task} project={project} />
      <FormProvider {...formMethods}>
        <FormTextField
          sx={{
            width: "100%",
          }}
          name={"description"}
          spellCheck="false"
          variant="standard"
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
