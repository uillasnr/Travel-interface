import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import ClipLoader from "react-spinners/ClipLoader";

function Button({ className, children, onClick, ...props }) {
  const [isLoading, setLoading] = useState(false);
  const [color, setColor] = useState("#ffffff");

  const override = {
    display: "block",
    margin: "auto",

  };

  const buttonClasses = twMerge(
    "w-full bg-cyan-700 hover:bg-cyan-600 text-white py-2 h-10 rounded-lg",
    isLoading ? "cursor-not-allowed" : "",
    className
  );
  
  const handleButtonClick = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (onClick) {
        onClick();
      }
    }, 1000);
  };

  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={handleButtonClick}
      {...props}
    >
      {isLoading ? (
        <div className=" inset-0  flex items-center justify-center">
          <ClipLoader
            color={color}
            loading={isLoading}
            css={override}
            size={24} // Adjust the size as needed
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
