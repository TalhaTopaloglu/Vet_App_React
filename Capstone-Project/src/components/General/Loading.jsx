import { TableCell, TableRow } from "@mui/material";
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import React from "react";

function Loading() {
  return (
    <TableRow>
      <TableCell>
        <LoadingButton loading loadingPosition="start" startIcon={<SaveIcon />}>
          Loading
        </LoadingButton>
      </TableCell>
    </TableRow>
  );
}

export default Loading;
