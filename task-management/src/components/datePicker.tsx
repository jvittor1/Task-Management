import dayjs, { Dayjs } from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from "@mui/material/styles";
import { Control, Controller } from "react-hook-form";
import { formattedDateStringToDate } from "../helper/formattedDate";

interface ResponsiveDatePickersProps {
  onChange?: (newValue: Dayjs | null) => void;
  control?: Control<any>;
  defaultValue?: string;
}

const CustomDatePicker = styled(DatePicker)(() => ({
  "& .MuiInputBase-root": {
    fontSize: "0.875rem",
    color: "#fff",
    padding: "0 8px",
    width: "100%",
    height: "42px",
    overflow: "hidden",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#4f46e5",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#4f46e5",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#4f46e5",
    },
  },
  "& .MuiButtonBase-root": {
    color: "#4f46e5",
  },
  "& .MuiPaper-root": {
    overflow: "hidden",
  },
}));

export default function ResponsiveDatePickers(
  props: ResponsiveDatePickersProps,
) {
  const { onChange, control, defaultValue } = props;

  const handleChange = (newValue: Dayjs | null) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        sx={{ paddingTop: 0 }}
        components={[
          "DatePicker",
          "MobileDatePicker",
          "DesktopDatePicker",
          "StaticDatePicker",
        ]}
      >
        <DemoItem>
          {control ? (
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <CustomDatePicker
                  {...field}
                  defaultValue={
                    defaultValue
                      ? dayjs(formattedDateStringToDate(defaultValue))
                      : null
                  }
                  onChange={(date) => {
                    const formattedDate = dayjs(date).toDate();
                    field.onChange(formattedDate);
                  }}
                  value={field.value ? dayjs(field.value) : null}
                />
              )}
            />
          ) : (
            <CustomDatePicker onChange={handleChange} />
          )}
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
