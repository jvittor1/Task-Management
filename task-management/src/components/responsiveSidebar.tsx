import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import { FaBars } from "react-icons/fa";

import Sidebar from "./sidebar";

interface ResponsiveSidebarProps {
  selectedFilter: string;
  handleSidebarClick: (name: string) => void;
  handleFilter: (data: string) => void;
  filters: string[];
}

export default function ResponsiveSidebar({
  selectedFilter,
  handleFilter,
  handleSidebarClick,
  filters,
}: ResponsiveSidebarProps) {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, right: open });
    };

  const list = () => (
    <Box
      sx={{ width: 250, height: "100%", background: "#27272a" }}
      role="presentation"
    >
      <Sidebar
        selectedFilter={selectedFilter}
        handleFilter={handleFilter}
        handleSidebarClick={handleSidebarClick}
        filters={filters}
      />
    </Box>
  );

  return (
    <div className="block lg:block">
      <button
        className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-indigo-600 transition duration-150 ease-in-out hover:bg-zinc-800"
        onClick={toggleDrawer(true)}
      >
        <FaBars />
      </button>
      <Drawer
        anchor="right"
        open={state.right}
        onClose={() => setState({ ...state, right: false })}
      >
        {list()}
      </Drawer>
    </div>
  );
}
