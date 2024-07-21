import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { Control, Controller, useFormState } from "react-hook-form";
import { useEffect, useState } from "react";
import { getTasksType } from "../service/taskService";

interface SelectButtonProps {
  control: Control<any>;
  defaultValue?: string;
}

const StyledFormControl = styled(FormControl)({
  width: "100%",
  "& .MuiInputLabel-root": {
    color: "#fff",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#4f46e5",
    },
    "&:hover fieldset": {
      borderColor: "#4f46e5",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#4f46e5",
    },
    "& .MuiSelect-icon": {
      color: "#4f46e5",
    },
    color: "#fff",
  },
});

export default function SelectButton({
  control,
  defaultValue,
}: SelectButtonProps) {
  const { errors } = useFormState({ control });
  const [types, setTypes] = useState<string[]>([]);

  const fetchTypes = async () => {
    const typesData = await getTasksType();
    if (typesData && typesData.length > 0) {
      setTypes(typesData.map((type) => type.name));
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  if (defaultValue) console.log(defaultValue);

  return (
    <Box sx={{ minWidth: 120 }}>
      <Controller
        name="type"
        defaultValue={defaultValue ? defaultValue : ""}
        control={control}
        render={({ field }) => (
          <StyledFormControl fullWidth error={Boolean(errors.type)}>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Type"
              {...field}
              value={field.value || ""}
              onChange={(e) => field.onChange(e.target.value)}
            >
              {types.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
        )}
      />
    </Box>
  );
}
