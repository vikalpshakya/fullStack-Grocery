import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material';
import MaterialTable from 'material-table';


const DataTable = ({ columns, data, title, action}) => {
    const defaultMaterialTheme = createTheme();

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable
            columns={columns}
            data={data}
            title={title}
            actions={action}
        />        
    </ThemeProvider>
  )
}

export default DataTable