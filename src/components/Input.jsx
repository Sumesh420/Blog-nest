import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div>
      {label && <label className="inline-block mb-1 pl-1" htmlFor={id}></label>}
      <input
        type={type}
        className={`${className} bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full`}
        ref={ref}
        id={id}
        {...props}
      />
    </div>
  );
});
export default Input;
