import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Progress() {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress sx={{ color: "#f4f4f5" }} size={24} />
    </Box>
  );
}
