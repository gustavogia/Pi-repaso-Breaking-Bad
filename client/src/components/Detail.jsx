import React , { Fragment, useEffect, useState } from "react";
import { Link , useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getDetail, deleteDetails,deletevideogamebyid} from "../actions/index.js";
import "../styles/Detail.css"

export default function Detail(props){
        const dispatch = useDispatch()
        const history = useHistory()

    // useEffect(() => {
    //     dispatch(getDetail(props.match.params.id));
    //     return () => {dispatch(deleteDetails())};
    // },[dispatch, props.match.params.id])
    
    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
        return () => {dispatch(deleteDetails())};
    },[dispatch, props.match.params.id])

    const myCharacter = useSelector((state) => state.detail)

    const handleDelete = () => {
        dispatch(deletevideogamebyid (myCharacter[0].id));
        alert("El juego ha sido eliminado")
        history.push("/home");
      };

    return (
       <Fragment>
        <div >
<div className="boton">
            <Link to='/home'>
            <button>Volver</button>
        </Link>
        </div>
        {
            myCharacter.length > 0 ?
            (<div>
                <div className="delete">
            {typeof myCharacter[0].id === "string" && (
              <button onClick={handleDelete} >
                DELETE
              </button>
            )}
          </div> 
          <div className="detail">
                <h1>Mi Nombre: {myCharacter[0].name}</h1>
                <img src={myCharacter[0].img ? myCharacter[0].img :  myCharacter[0].image} />
                
                <h1>Status: {myCharacter[0].status}</h1>
                
                <h2 >Fecha Nacimiento: {myCharacter[0].birthday}</h2>
                
                <h2>Ocupaciones: {!myCharacter[0].createdInDb ? myCharacter[0].occupation + ', ' : myCharacter[0].occupations.map(el => el.name + ', ')}</h2>
                
            </div> </div>) : (<h2>Loading...</h2>)
            
        }
        
        
        </div>
        </Fragment> 
    )
}

