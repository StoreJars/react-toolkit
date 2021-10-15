import React from 'react';

export default function Checkbox() {
  return (
    <div className="form-check form-check-flat form-check-primary">
      <label className="form-check-label">
        <input type="checkbox" className="form-check-input" />
        Remember me
      </label>
    </div>
  );
}
