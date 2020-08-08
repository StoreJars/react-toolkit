import React from 'react';
import ReactDatatable from 'react-data-table-component';

interface IProps {
  data: any;
  columns: any;
}

export default function DataTable(props: IProps) {
  const { data, columns } = props;

  const [selectableRows, setSelectableRows] = React.useState(false);
  const [noSelectAll, setNoSelectAll] = React.useState(false);
  const [selectableRowsVisibleOnly, setSelectableRowsVisibleOnly] = React.useState(false);
  const [selectableRowsHighlight, setSelectableRowsHighlight] = React.useState(false);
  const [expandableRows, setExpandableRows] = React.useState(false);
  const [expandOnRowClick, setExpandOnRowClick] = React.useState(false);
  const [pagination, setPagination] = React.useState(true);
  const [highlight, setHighlight] = React.useState(false);
  const [striped, setStriped] = React.useState(false);
  const [pointer, setPointer] = React.useState(false);
  const [dense, setDense] = React.useState(false);
  const [persist, setPersist] = React.useState(false);
  const [tableHead, setNoHead] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [noHeader, setNoHeader] = React.useState(false);
  const [subHeader, setSubHeader] = React.useState(false);
  const [subHeaderAlign, setSubHeaderAlign] = React.useState('right');
  const [fixedHeader, setFixedheader] = React.useState(false);

  return (
    <ReactDatatable
      title="Movie List"
      columns={columns}
      data={data}
      defaultSortField="title"
      selectableRows={selectableRows}
      selectableRowsNoSelectAll={noSelectAll}
      selectableRowsHighlight={selectableRowsHighlight}
      selectableRowsVisibleOnly={selectableRowsVisibleOnly}
      expandableRows={expandableRows}
      expandOnRowClicked={expandOnRowClick}
      pagination={pagination}
      highlightOnHover={highlight}
      striped={striped}
      pointerOnHover={pointer}
      dense={dense}
      noTableHead={tableHead}
      persistTableHead={persist}
      progressPending={loading}
      noHeader={noHeader}
      subHeader={subHeader}
      subHeaderComponent={<div style={{ display: 'flex', alignItems: 'center' }} />}
      subHeaderAlign={subHeaderAlign}
      fixedHeader={fixedHeader}
      fixedHeaderScrollHeight="300px"
    />
  );
}
