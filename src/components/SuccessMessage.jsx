import React from 'react';

function SuccessMessage({ onClose }) {
  const successMessageStyle = {
    position: 'fixed',
    bottom: '10%',
    right: '10%',
    width: '300px',
  };

  return (
    <div
      className="alert alert-success alert-dismissible fade show"
      role="alert"
      style={successMessageStyle} // Apply custom styles
    >
      <strong>Success!</strong> Product created successfully.
      <button type="button" className="btn-close" onClick={onClose} />
    </div>
  );
}

export default SuccessMessage;

