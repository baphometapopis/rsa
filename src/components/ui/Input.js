import React from "react";
import classNames from "classnames";

const Input = ({
  id,
  name,
  type,
  value,
  max,
  formik,
  placeholder,
  className,
  onInputChange,
  label,
  maxLength,
  required,
  alphanumeric,
  capitalize,
  sentences,
  isVehicleNo,
  regnType,
  numericOnly,
  disabled,
  alphabets,
  removeError,
}) => {
  const classes = classNames(
    `px-3 py-1 placeholder-neutral-dark border border-neutral-dark rounded-sm focus:outline-none focus:border focus:border-primary`,
    className
  );

  const hasError = formik.touched[name] && formik.errors[name];
  const formatVehicleNumber = (input) => {
    if (isVehicleNo) {
      // Check if input is BH Series
      if (value && regnType === "BH Series") {
        return `${value.slice(0, 2)}-${value.slice(2, 4)}-${value.slice(
          4,
          8
        )}-${value.slice(8, 10)}`;
      } else if (value && regnType === "Vehicle No") {
        return `${value.slice(0, 2)}-${value.slice(2, 4)}-${value.slice(
          4,
          6
        )}-${value.slice(6, 10)}`;
      }
    }
    return input;
  };
  return (
    <div
      className="flex flex-col"
      style={{ alignItems: "center", position: "relative" }}
    >
      {label && (
        <label
          style={{ alignSelf: "flex-start", color: "#686464" }}
          htmlFor={id}
        >
          {label} {required && <span style={{ color: "red" }}>*</span>}
        </label>
      )}
      <input
        id={id}
        name={name}
        className={classes}
        type={type}
        max={max}
        // value={
        //   capitalize
        //     ? value?.toUpperCase()
        //     : isVehicleNo
        //     ? formatVehicleNumber(value)
        //     : value
        // }
        value={
          isVehicleNo
            ? formatVehicleNumber(value)
            : capitalize
            ? value?.toUpperCase()
            : value
        }
        placeholder={placeholder || "Type Here..."}
        disabled={disabled}
        maxLength={maxLength || 25} // Add maxLength attribute for character limitation
        onChange={(e) => {
          if (numericOnly) {
            //allow NUMBERS
            e.target.value = e.target.value.replace(/[^0-9]/g, "");
          }
          if (alphabets) {
            //allow ALPHABETS NO SPACE

            e.target.value = e.target.value.replace(/[^a-zA-Z]/g, "");
          }
          if (alphanumeric) {
            //allow ALPHANUMERIC

            e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
          }
          if (sentences) {
            //allow ALPHANUMERIC

            e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
          }

          formik.handleChange(e);
          if (onInputChange) {
            onInputChange(e.target.value);
          }
        }}
      />

      {!removeError && (hasError || id === "dob") && (
        <p
          style={{
            fontSize: "12px",
            position: "absolute",
            bottom: "-16px",
            alignSelf: "flex-start",
            color: "red",
          }}
        >
          {formik.errors[name]}
        </p>
      )}
    </div>
  );
};

export default Input;
