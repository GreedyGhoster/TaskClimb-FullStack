import { FormProvider, useForm } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import { FC, useCallback } from "react";
import { EditToDoProjectFormValues, IToDoProject } from "../../../../../types";
import { useProjects } from "../../../../../hooks";
import { FormTextField } from "../../../../../components/form";

interface Props {
  project: IToDoProject;
  onCancel: () => void;
}

const EditProjectForm: FC<Props> = ({ project, onCancel }) => {
  const { editProject } = useProjects();
  const { trigger } = editProject(project.id);

  const formMethods = useForm<EditToDoProjectFormValues>({
    defaultValues: {
      title: project.title,
    },
  });

  const { handleSubmit } = formMethods;

  const handleSubmitForm = useCallback(
    async (values: EditToDoProjectFormValues) => {
      if (values.title.trim() !== "") {
        const data = { title: values.title };
        trigger(data as any);
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
          name={"title"}
          placeholder="Edit project"
          variant="filled"
          color="warning"
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

export default EditProjectForm;
