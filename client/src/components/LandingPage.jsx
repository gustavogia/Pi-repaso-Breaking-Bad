import React from "react";
import { Link } from "react-router-dom";


export default function LandingPage() {
    return (
        <div className= "background"> 
        <div className="overlay"></div>
        <div className="titulo">
        <h1 className = "title" >Welcome to Breaking Bad API</h1>
            <Link to='/home'>
                <button>Ingresar</button>
            </Link>
        </div>
            
        </div>
    );
}