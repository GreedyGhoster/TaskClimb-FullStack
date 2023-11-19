import { APP_SIDEBAR_WIDTH } from "./AppSidebar.constants";
import { UseTodoProvider, useAuth, useTodo } from "../../../../hooks";
import { FormProvider, useForm } from "react-hook-form";
import { AddToDoProjectFormValues } from "../../../../types";
import { useCallback, useState } from "react";
import { FormTextField } from "../../../../components/form";
import { AppProjectItem } from "./AppProjectItem";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import axios from "axios";

export const AppSidebar = () => {
  const { projects, addProject } = useTodo();
  const { getTokenFromLocalStorage } = useAuth();
  const token = getTokenFromLocalStorage();

  const theme = useTheme();

  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchData = async (title: string) => {
    const URL = "http://localhost:4580/projects";

    const authToken = `Bearer ${token}`;

    const data = {
      title: title,
    };

    try {
      const res = await axios.post(URL, data, {
        headers: { Authorization: authToken },
      });
      console.log(res);
    } catch {
      alert("Please sign in");
    }
  };

  const formMethods = useForm<AddToDoProjectFormValues>({
    defaultValues: {
      title: "",
    },
  });
  const { handleSubmit, reset } = formMethods;

  const handleSubmitForm = useCallback(
    async (values: AddToDoProjectFormValues) => {
      if (values.title.trim() !== "") {
        fetchData(values.title);
        addProject(values.title);
        reset({ title: "" });
      }
    },
    [addProject, reset, fetchData]
  );

  return (
    <UseTodoProvider>
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              name={"title"}
              placeholder="Find project"
            />
          </Stack>
          <List
            sx={{
              display: "flex",
              flexDirection: "column-reverse",
            }}
          >
            {projects
              .filter((val) => {
                if (
                  searchTerm === "" ||
                  val.title.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((project) => (
                <AppProjectItem key={project.id} project={project} />
              ))}
          </List>
        </Box>
      </Box>
    </UseTodoProvider>
  );
};
