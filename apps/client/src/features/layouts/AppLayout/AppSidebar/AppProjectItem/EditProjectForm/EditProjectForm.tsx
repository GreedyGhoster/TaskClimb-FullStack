import { useTodo } from "../../../../../../hooks";
import { FormProvider, useForm } from "react-hook-form";
import {
  EditToDoProjectFormValues,
  IToDoProject,
} from "../../../../../../types";
import { FormTextField } from "../../../../../../components/form";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import { FC, useCallback } from "react";

interface Props {
  project: IToDoProject;
  onCancel: () => void;
}

const EditProjectForm: FC<Props> = ({ project, onCancel }) => {
  const { editProject } = useTodo();

  const formMethods = useForm<EditToDoProjectFormValues>({
    defaultValues: {
      title: project.title,
    },
  });

  const { handleSubmit } = formMethods;

  const handleSubmitForm = useCallback(
    async (values: EditToDoProjectFormValues) => {
      if (values.title.trim() !== "") {
        editProject(project.id, values.title);
        onCancel();
      }
    },
    [editProject, onCancel, project.id]
  );

  return (
    <FormProvider {...formMethods}>
      <Stack
        direction={"row"}
        spacing={1}
        component={"form"}
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <FormTextField
          inputProps={{ maxLength: 46 }}
          sx={{
            width: "12.5rem",
          }}
          name={"title"}
          placeholder="Edit project"
          variant="standard"
          color="warning"
        />
        <IconButton onClick={handleSubmit(handleSubmitForm)}>
          <AddCircleIcon color="success" />
        </IconButton>
        <IconButton onClick={onCancel}>
          <CancelIcon />
        </IconButton>
      </Stack>
    </FormProvider>
  );
};

export default EditProjectForm;
