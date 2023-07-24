import { useState } from "react";
import "./toggle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
export default function Toggle({ isChecked, setIsCheked }) {
  const handleOnChange = () => {
    setIsCheked(!isChecked);
  };
  return (
    <>
      <input
        type="checkbox"
        name="Toggle"
        id="chekbox-toggle"
        checked={isChecked}
        onChange={handleOnChange}
      />

      <label className="toggle-label" htmlFor="chekbox-toggle">
        <span>
          {isChecked ? (
            <FontAwesomeIcon icon={faArrowDown} />
          ) : (
            <FontAwesomeIcon icon={faArrowUp} />
          )}
        </span>
      </label>
    </>
  );
}
