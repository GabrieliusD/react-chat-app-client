import React, { useState } from "react";
import "./formInput.css";
export default function FormInput(props) {
  const [focused, setFocused] = useState(false);
  const { label, onChange, errorMessage, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="formInput">
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        focused={focused.toString()}
      />
      <div className="formText">
        <lable>{label}</lable>
        <span>{errorMessage}</span>
      </div>
    </div>
  );
}
