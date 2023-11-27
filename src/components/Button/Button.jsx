import React from 'react';
import style from "./Button.module.css"

/**
 * A reusable button component.
 * @param {Object} props - Component properties.
 * @param {string} props.placeholder - The text content of the button.
 * @returns {JSX.Element} Button element.
 */
const Button = ({ placeholder }) => {
    return (
        <button type='button' className={style.btn}>{placeholder}</button>
    )
}

export default Button;
