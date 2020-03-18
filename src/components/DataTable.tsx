import React, { Component } from 'react';
import ReactDatatable from '@ashvin27/react-datatable';

const config = {
  page_size: 10,
  length_menu: [10, 20, 50],
  button: {
    excel: true,
    print: true,
    extra: true,
  }
};

const extraButtons = [
  {
    className: "btn btn-primary buttons-pdf",
    title: "Export TEst",
    children: [
      <span>
        <i className="glyphicon glyphicon-print fa fa-print" aria-hidden="true"></i>
      </span>
    ],
    onClick: (event) => {
      console.log(event);
    },
  },
  {
    className: "btn btn-primary buttons-pdf",
    title: "Export TEst",
    children: [
      <span>
        <i className="glyphicon glyphicon-print fa fa-print" aria-hidden="true"></i>
      </span>
    ],
    onClick: (event) => {
      console.log(event);
    },
    onDoubleClick: (event) => {
      console.log("doubleClick")
    }
  },
];

interface IProps {
  records: any;
  columns: any
}

export default class App extends Component<IProps> {
  editRecord(record) {
    console.log("Edit Record", record);
  }

  deleteRecord(record) {
    console.log("Delete Record", record);
  }

  render() {
    const { records, columns } = this.props;

    return (
      <ReactDatatable
        config={config}
        records={records}
        columns={columns}
        extraButtons={extraButtons}
      />
    )
  }
}
