import React from 'react';

function Button({ children }) {
  return (
    <button type="button" className="btn">{ children }</button>
  );
}

export default Button;
