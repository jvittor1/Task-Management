import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from "@mui/material/styles";

const CustomDatePicker = styled(DatePicker)(() => ({
  "& .MuiInputBase-root": {
    fontSize: "0.875rem",
    color: "#fff",
    padding: "0 8px",
    width: "200px",
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

export default function ResponsiveDatePickers() {
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
          <CustomDatePicker defaultValue={dayjs()} />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
