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
    "w-full bg-cyan-700 text-white py-2 rounded-lg hover:bg-cyan-700",
    isLoading ? "cursor-not-allowed" : "",
    className
  );

  const handleButtonClick = () => {
    setLoading(true); // Start loading

    // Simulate an async action (replace this with your actual logic)
    setTimeout(() => {
      setLoading(false); // Stop loading

      // After the async action is complete, you can send the information associated with the button
      // For example, you can call a function passed through props
      if (onClick) {
        onClick(); // Trigger the click handler passed through props
      }
    }, 3000);
  };

  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={handleButtonClick} // Handle button click
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
