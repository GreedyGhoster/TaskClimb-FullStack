import { APP_SIDEBAR_WIDTH } from "./AppSidebar.constants";
import { FormProvider, useForm } from "react-hook-form";
import { Suspense, lazy, useCallback } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import { FormTextField } from "../../../components/form";
import { AddToDoProjectFormValues } from "../../../types";
import { useProjects } from "../../../hooks";
import { useSearchParams } from "react-router-dom";

const AppProjectItem = lazy(() => import("./AppProjectItem/AppProjectItem"));

export const AppSidebar = () => {
  const { createProject, getProjects, filterProjects } = useProjects();
  const { isLoading, data } = getProjects();
  const projects = filterProjects(data);

  const [searchParams, setSearchParams] = useSearchParams();

  const searchProjects = searchParams.get("searchProjects") || "";

  const theme = useTheme();

  const formMethods = useForm<AddToDoProjectFormValues>({
    defaultValues: {
      title: "",
    },
  });
  const { handleSubmit, reset } = formMethods;

  const handleSubmitForm = useCallback(
    async (values: AddToDoProjectFormValues) => {
      if (values.title.trim() !== "") {
        createProject(values.title);
        reset({ title: "" });
      }
    },
    [createProject, reset]
  );

  return (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        width: APP_SIDEBAR_WIDTH,
        maxWidth: APP_SIDEBAR_WIDTH,
        backgroundColor: `${
          theme.palette.mode === "dark" ? "#303030" : "#fafafa"
        }`,
        zIndex: 1,
        overflow: "auto",
      }}
      component={"nav"}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          padding: 2,
        }}
      >
        <Typography variant="h6">Projects</Typography>
        <Stack spacing={1}>
          <FormProvider {...formMethods}>
            <Box component={"form"} onSubmit={handleSubmit(handleSubmitForm)}>
              <FormTextField
                fullWidth
                inputProps={{ maxLength: 46 }}
                name="title"
                placeholder="Add project"
              />
            </Box>
          </FormProvider>
          <TextField
            inputProps={{ maxLength: 46 }}
            value={searchProjects}
            onChange={(e) =>
              setSearchParams((prev) => {
                prev.set("searchProjects", e.target.value);
                return prev;
              })
            }
            name={"title"}
            placeholder="Find project"
          />
        </Stack>
        <Suspense fallback={<h3>Loading...</h3>}>
          <List
            sx={{
              display: "flex",
              flexDirection: "column-reverse",
            }}
          >
            {!isLoading ? (
              projects && projects.length > 0 ? (
                <>
                  {projects.map((project) => (
                    <AppProjectItem key={project.id} project={project} />
                  ))}
                </>
              ) : (
                <Box sx={{ textAlign: "center" }} component={"h2"}>
                  No projects
                </Box>
              )
            ) : (
              <Box sx={{ textAlign: "center" }} component={"h2"}>
                Loading...
              </Box>
            )}
          </List>
        </Suspense>
      </Box>
    </Box>
  );
};
