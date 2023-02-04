import React from "react";

const { div, lab, btn, inp } = {
  div: "flex items-center gap-2 mb-2",
  lab: "block text-sm font-medium text-gray-900",
  btn: "font-semibold text-xs bg-[#EcECF1] py-1 px-2 rounded-[5px] text-black",
  inp: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3",
};

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => {
  return (
    <div>
      <div className={div}>
        <label htmlFor={name} className={lab}>
          {labelName}
        </label>
        {isSurpriseMe && (
          <button type="button" onClick={handleSurpriseMe} className={btn}>
            Surprise Me
          </button>
        )}
      </div>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className={inp}
      />
    </div>
  );
};

export default FormField;
