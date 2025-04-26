import React, { useState } from 'react';
import { Box, TablePagination } from '@mui/material';

function VideoPagination({ totalItems, onPageChange }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    onPageChange(newPage + 1, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRows = parseInt(event.target.value, 10);
    setRowsPerPage(newRows);
    setPage(0);
    onPageChange(1, newRows);
  };

  return (
    <Box sx={{ display: 'flex' }} className="text-gray-800 dark:text-gray-300">
      <TablePagination
        sx={(theme) => ({
          color: theme.palette.mode === 'dark' ? '#1d2939' : '#d0d5dd',

          '& .MuiTablePagination-toolbar': {
            color: theme.palette.mode === 'dark' ? '#1d2939' : '#d0d5dd',
          },

          '& .MuiSelect-select': {
            color: theme.palette.mode === 'dark' ? '#1d2939' : '#d0d5dd',
          },

          '& .MuiSvgIcon-root': {
            color: theme.palette.mode === 'dark' ? '#1d2939' : '#d0d5dd',
          },
        })}
        component="div"
        count={totalItems}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={totalItems + ' Videos'}
        rowsPerPageOptions={[10, 20, 50]}
        className="px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:text-gray-800 dark:border-gray-700 dark:text-gray-400"
      />
    </Box>
  );
}

export default VideoPagination;
