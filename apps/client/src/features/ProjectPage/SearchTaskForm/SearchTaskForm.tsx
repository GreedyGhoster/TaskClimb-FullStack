import TextField from "@mui/material/TextField";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const SearchTaskForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTasks = searchParams.get("searchTasks") || "";

  const handleChange = useCallback((e: any) => {
    const value = e.target.value;
    setSearchParams((prev) => {
      prev.set("searchTasks", value);
      return prev;
    });
  }, []);

  return (
    <TextField
      sx={{
        marginTop: "7px",
      }}
      inputProps={{ maxLength: 43 }}
      value={searchTasks}
      label={"Find task"}
      onChange={handleChange}
      name={"title"}
      placeholder="Find task"
    />
  );
};

export default SearchTaskForm;
