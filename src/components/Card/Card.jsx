import React from 'react';
import style from "./Card.module.css";

/**
 * A card component displaying character information.
 * @param {Object} props - Component properties.
 * @param {Object} props.character - The character data to be displayed.
 * @param {string} props.character.name - The name of the character.
 * @param {string} props.character.image - The URL of the character's image.
 * @param {Object} props.character.location - The location information of the character.
 * @param {string} props.character.location.name - The name of the last known location.
 * @param {string} props.character.status - The status of the character (Alive, Dead, etc.).
 * @returns {JSX.Element} Card element.
 */

const Card = ({ character }) => {
    let { name, image, location, status } = character;

    return (
        <div className={style.card}>
            {/* Display badge based on character status */}
            {status === "Alive" ? (
                <div className={style.badge} style={{ backgroundColor: "green" }}>
                    {status}
                </div>
            ) : status === "Dead" ? (
                <div className={style.badge} style={{ backgroundColor: "red" }}>
                    {status}
                </div>
            ) : (
                <div className={style.badge} style={{ backgroundColor: "gray" }}>
                    {status}
                </div>
            )}

            <img src={image} alt={name} />
            <div className={style.description}>
                <span>{name}</span>
                <p>Last location: <span>{location?.name}</span></p>
            </div>
        </div>
    );
}

export default Card;
