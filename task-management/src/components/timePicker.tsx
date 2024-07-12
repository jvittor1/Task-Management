import { styled } from "@mui/material/styles";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Controller, Control } from "react-hook-form";
import dayjs from "dayjs";
import { formattedStringToDate } from "../helper/formattedDate";

interface TimePickerComponentProps {
  control: Control<any>;
  name: string;
  label: string;
  defaultValue?: string;
}

const StyledTimePicker = styled(TimePicker)({
  "& .MuiInputBase-root": {
    border: "1px solid #6366f1",
    color: "#fff",
    height: "42px",
    overflow: "hidden",
  },
  "& .MuiInputBase-input": {
    color: "#fff",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#6366f1",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#6366f1",
  },
  "& .MuiInputAdornment-root .MuiSvgIcon-root": {
    color: "#4f46e5",
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#fff",
  },
});

export default function TimePickerComponent({
  control,
  name,
  label,
  defaultValue: defualtValue,
}: TimePickerComponentProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          "DatePicker",
          "TimePicker",
          "DateTimePicker",
          "DateRangePicker",
        ]}
      >
        <DemoItem label={label}>
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <StyledTimePicker
                {...field}
                onChange={(time) => {
                  const formattedTime = dayjs(time).toDate();
                  field.onChange(formattedTime);
                }}
                value={field.value ? dayjs(field.value) : null}
                defaultValue={
                  defualtValue
                    ? dayjs(formattedStringToDate(defualtValue))
                    : null
                }
              />
            )}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
