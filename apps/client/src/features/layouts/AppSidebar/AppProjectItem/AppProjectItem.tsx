import CreateIcon from "@mui/icons-material/Create";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FC, Fragment } from "react";
import { EditProjectForm } from "./EditProjectForm";
import { useParams } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import { RenderModeController } from "../../../../components/ctrl";
import { UseRenderModeProvider, useProjects } from "../../../../hooks";
import { IToDoProject, RenderMode } from "../../../../types";

interface Props {
  project: IToDoProject;
}

const AppProjectItem: FC<Props> = ({ project }) => {
  const { deleteProject } = useProjects();

  const { projectId: currentProjectId } = useParams<{ projectId: string }>();

  const { trigger } = deleteProject(project.id);

  const theme = useTheme();

  return (
    <ListItem
      component={"div"}
      sx={{
        padding: 0,
        height: "3.4rem",
        backgroundColor:
          project.id === currentProjectId
            ? theme.palette.mode === "dark"
              ? "#4f2929"
              : "#fee6e3"
            : "",
      }}
      key={project.id}
    >
      <UseRenderModeProvider defaultMode={RenderMode.View}>
        <RenderModeController
          renderEdit={(onChangeRenderMode) => (
            <EditProjectForm
              project={project}
              onCancel={() => onChangeRenderMode(RenderMode.View)}
            />
          )}
          renderView={(onChangeRenderMode) => (
            <>
              <Tooltip
                title={
                  <Fragment>
                    <Box
                      sx={{
                        marginTop: "1.5%",
                        display: "inline-flex",
                        width: "40%",
                      }}
                    >
                      <Button
                        onClick={() => onChangeRenderMode(RenderMode.Edit)}
                      >
                        <CreateIcon
                          sx={{
                            marginRight: "5px",
                          }}
                          color="secondary"
                        />
                      </Button>
                      <Button onClick={() => trigger()}>
                        <DeleteForeverIcon color="error" />
                      </Button>
                    </Box>
                  </Fragment>
                }
                placement="right"
              >
                <ListItemButton
                  sx={{
                    height: "100%",
                  }}
                  href={`/projects/${project.id}`}
                >
                  <ListItemText
                    sx={{
                      overflowWrap: "break-word",
                    }}
                    primary={project.title}
                  />
                </ListItemButton>
              </Tooltip>
            </>
          )}
        />
      </UseRenderModeProvider>
    </ListItem>
  );
};

export default AppProjectItem;
