import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";

function CustomDataGrid({ rows, columns, pageSize = 30 }: any) {
  return (
    <Box
      sx={{
        height: (pageSize + 2) * 52,
        width: "100%",
      }}
    >
      <DataGrid
        sx={{
          "&, & p, & svg": { color: "#f7f7f7", fontWeight: 500 },
        }}
        pagination
        pageSize={pageSize}
        rowsPerPageOptions={[30]}
        columns={columns}
        rows={rows}
      />
    </Box>
  );
}

export default CustomDataGrid;
