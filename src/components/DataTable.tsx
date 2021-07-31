import React from 'react';
import ReactDatatable from 'storejars-react-datatable';

const extraButtons = [];

interface IProps {
  records: any;
  columns: any;
  excel?: boolean;
  print?: boolean;
  csv?: boolean;
  filename?: string;
}

export default function DataTable(props: IProps) {
  const { records, columns, csv, print, filename } = props;

  const config = {
    page_size: 50,
    length_menu: [50, 100, 150, 200],
    filename,
    button: {
      csv,
      print,
      excel: false,
      extra: false,
    },
  };

  return <ReactDatatable config={config} records={records} columns={columns} extraButtons={extraButtons} />;
}
