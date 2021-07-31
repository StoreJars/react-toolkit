import React from 'react';
import ReactDatatable from 'storejars-react-datatable';

const extraButtons = [];

interface IProps {
  records: any;
  columns: any;
  excel?: boolean;
  print?: boolean;
}

export default function DataTable(props: IProps) {
  const { records, columns, excel, print } = props;

  const config = {
    page_size: 50,
    length_menu: [50, 100, 150, 200],
    button: {
      excel,
      print,
      extra: false,
    },
  };

  return <ReactDatatable config={config} records={records} columns={columns} extraButtons={extraButtons} />;
}
