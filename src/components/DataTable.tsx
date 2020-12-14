import React from 'react';
import ReactDatatable from 'storejars-react-datatable';

const config = {
  page_size: 50,
  length_menu: [50, 100, 150, 200],
  button: {
    excel: false,
    print: false,
    extra: false,
  },
};

const extraButtons = [];

interface IProps {
  records: any;
  columns: any;
}

export default function DataTable(props: IProps) {
  const { records, columns } = props;

  return <ReactDatatable config={config} records={records} columns={columns} extraButtons={extraButtons} />;
}
