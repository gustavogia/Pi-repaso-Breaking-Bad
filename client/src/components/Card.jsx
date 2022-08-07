import React from "react";



export default function Card({ name, image, nickname }) {
    return (
        <div className="centrar">
            <div className="cardComp">
            <h3>{name}</h3>
            <h3>{nickname}</h3>
            <img  src={image} alt='img not found' width='200px' height='250px' />
            </div>
        </div>
    )
}