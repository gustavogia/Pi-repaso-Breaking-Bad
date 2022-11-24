import React from 'react';
import { useState, useEffect } from 'react';
import { CardUpdate } from './CardUpdate';
import { getDetail, deleteDetails } from '../actions/index';
import { updatecharacterbyid } from "../actions/index";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useNavigate, useParams } from 'react-router-dom';
import { RiArrowGoBackLine } from "react-icons/ri"
import Swal from "sweetalert2"
import "../styles/UpdateComponent.css"




const UpdateComponent = (props) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const characters = useSelector(state => state.detail);
    const { id } = useParams()

    useEffect(() => {
        dispatch(getDetail(id));
        return () => { dispatch(deleteDetails()) };
    }, [dispatch, id])



    const [input, setInput] = useState({
        name: "",
        nickname: "",

    })

    function handleChange(e) { //nickname y name
        setInput(() => ({
            ...input,
            name: e.target.value,
        }));
    }

    function handleChange1(e) { //nickname y name
        setInput(() => ({
            ...input,
            nickname: e.target.value,
        }));
    }

    const handleOnClick = (e) => {
        e.preventDefault();
        if (!input.name.length && !input.nickname || !input.nickname && input.name.length || input.nickname && !input.name.length) {
            Swal.fire("Are you sure don't make the changes ?");
          } else{
        Swal.fire({
            title: "Warning",
            text: "Are you sure you want to update this Character?",
            icon: "warning",
            showDenyButton: true,
            denyButtonText: "Cancel",
            denyButtonColor: "#72CE65",
            confirmButtonText: "Update",
            confirmButtonColor: "#FF5733",
      
          }).then((res) => {
            if (res.isConfirmed) {
        dispatch(updatecharacterbyid(input, id))
        // return Swal.fire("Personaje Actualizado")
        // navigate('/home');
        // .then((res) => {
        //     Swal.fire({
        //       title: "Success",
        //       text: "Your Character has been updated",
        //       icon: "success",
        //       confirmButtonText: "ok",
        //       confirmButtonColor: "rgb(9, 102, 74)"
        //     })})
            
        //     .then(()=>{navigate(-1)})
            
        .then(() => {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-right",
              iconColor: "white",
              customClass: {
                popup: "colored-toast",
              },
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: false,
            });
            Promise.resolve(
              Toast.fire({
                icon: "success",
                title: `Character updated!`,
              })
            );
            
           
          })
          .then(()=> {navigate(`/home/${id}`)});;}
          
        })}
    }
    




    return (
        <>
            <div className='boton'>
                <Link to="/home">
                    <button><RiArrowGoBackLine /></button>
                </Link>
            </div>
            <div className='conteiner'>
                <form>
                    <h1 className='titulo'>Actualizar Personaje</h1>
                    <div>
                        <h4 className="gust">Name: </h4>
                        <input
                            placeholder="Nombre del personaje"
                            type='text'
                            value={characters.name}
                            name='name'
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <h4 className="gust">Nickname: </h4>
                        <input

                            type='text'
                            placeholder="Nickname del personaje"
                            value={characters.nickname}
                            name='nickname'
                            onChange={handleChange1}
                        />

                    </div>

                    <div className="btnenviar">
                        <input className="boton" onClick={handleOnClick} value="Actualizar Personaje" />
                    </div>
                </form>
            </div>
            <div>

                {characters.length ?
                    (<CardUpdate
                        image={characters[0].image}
                        name={input.name ? input.name : characters[0].name}
                        nickname={input.nickname ? input.nickname : characters[0].name}
                        status={characters[0].status}
                        occupations={characters[0].occupations}

                    />) : (null)}
            </div>
        </>
    )
}

export default UpdateComponent