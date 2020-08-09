import React from 'react';
import ReactDatatable from 'storejars-react-datatable';

const config = {
  page_size: 10,
  length_menu: [10, 20, 50],
  button: {
    excel: true,
    print: true,
    extra: true,
  },
};

const extraButtons = [
  // {
  //   className: "btn btn-primary buttons-pdf",
  //   title: "Export Test",
  //   children: [
  //     <span>
  //       <i className="glyphicon glyphicon-print fa fa-print" aria-hidden="true"></i>
  //     </span>
  //   ],
  //   onClick: (event) => { },
  // },
];

interface IProps {
  records: any;
  columns: any;
}

export default function DataTable(props: IProps) {
  const { records, columns } = props;

  return <ReactDatatable config={config} records={records} columns={columns} extraButtons={extraButtons} />;
}
