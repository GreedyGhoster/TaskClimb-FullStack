import TextField from "@mui/material/TextField";
import { FC, useCallback, useState } from "react";

interface Props {
  projectId: string;
  onSearch: (searchTerm: string) => void;
}

const SearchTaskForm: FC<Props> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleChange = useCallback(
    (e: any) => {
      const value = e.target.value;
      setSearchTerm(value);
      onSearch(value);
    },
    [onSearch]
  );

  return (
    <TextField
      sx={{
        marginTop: "7px",
      }}
      inputProps={{ maxLength: 43 }}
      value={searchTerm}
      label={"Find task"}
      onChange={handleChange}
      name={"title"}
      placeholder="Find task"
    />
  );
};

export default SearchTaskForm;
