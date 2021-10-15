import React from 'react';

interface IProps {
  parentLink: any;
  children: any;
  title: string;
  formTitle: string;
}

export default function FormContent(props: IProps) {
  const { parentLink, title, formTitle, children } = props;

  return (
    <div className="page-content">
      <nav className="page-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">{parentLink}</li>
          <li className="breadcrumb-item active" aria-current="page">
            {title}
          </li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">{formTitle}</h6>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
