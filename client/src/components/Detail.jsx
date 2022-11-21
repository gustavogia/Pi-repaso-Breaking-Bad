import React , { Fragment, useEffect, useState } from "react";
import {Link,  useNavigate, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getDetail, deleteDetails,deletecharacterbyid,updatecharacterbyid} from "../actions/index.js";
import {AiFillDelete} from "react-icons/ai"
import {RiArrowGoBackLine} from "react-icons/ri"
import {BiEdit} from "react-icons/bi"
import Swal from "sweetalert2"
import "../styles/Detail.css"

export default function Detail(props){
        const dispatch = useDispatch()
        const navigate = useNavigate()
        const id =useParams().id
       

    useEffect(() => {
        dispatch(getDetail(id));
        return () => {dispatch(deleteDetails())};
    },[dispatch, id])
    
    // useEffect(() => {
    //     dispatch(getDetail(props.match.params.id));
    //     return () => {dispatch(deleteDetails())};
    // },[dispatch,props.match.params.id])

    const myCharacter = useSelector((state) => state.detail)

    const handleDelete = () => {
        dispatch(deletecharacterbyid (myCharacter[0].id));
        Swal.fire("El Personaje ha sido eliminado")
        navigate("/home");
      };

      const handleUpdate = () => {
        dispatch(updatecharacterbyid(myCharacter.id));
        navigate("/home");
      };
    return (
       <>

        <div className="boton">
          <Link to={'/home'}>
            <button ><RiArrowGoBackLine/></button>
            </Link>
            </div>
        <div className="detail">
        {
           myCharacter.length > 0 ?
            (
            <div>
                <div className="delete">
            {typeof myCharacter[0].id === "string" && (
              <button onClick={handleDelete} >
                <AiFillDelete/>
              </button>
            )}
          </div> 
          <div >
            {typeof myCharacter[0].id === "string" && (
              
              <button onClick={()=>navigate(/update/ + myCharacter[0].id)}>
                <BiEdit/>
              </button>
              
            )}
          </div> 
          <div >
                <h1>Mi Nombre: {myCharacter[0].name}</h1>
                <img src={myCharacter[0].img ? myCharacter[0].img :  myCharacter[0].image} />
                
                <h1>Status: {myCharacter[0].status}</h1>
                
                <h2 >Fecha Nacimiento: {myCharacter[0].birthday}</h2>
                
                <h2>Ocupaciones: {!myCharacter[0].createdInDb ? myCharacter[0].occupation + ' ' : myCharacter[0].occupations.map(el => el.name + (' '))}</h2>
                
            </div> </div>) : (<h2 className="loading">Loading...</h2>)
            
        }
        
        
        </div>
        </> 
    )
}

