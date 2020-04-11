import React from 'react';

export default function BusinessTypesList({ children, title, formTitle }) {

  return (
    <div className="page-content">
      <nav className="page-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="#">Forms</a></li>
          <li className="breadcrumb-item active" aria-current="page">{title}</li>
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
  )
}
