import React from "react";
import { Link } from "react-router-dom";
import  "../styles/Landing.css"


export default function LandingPage() {
    return (
        <>
        <div className= "background"> 
        
        <div>
                    <Link to='/home'>
                <button className="btin">Ingresar</button>
            </Link>
            </div>
        <div className="titulo">
        <h1 className = "title" >Welcome to Breaking Bad API</h1>

        </div>
        </div>
            
        </>
    );
}