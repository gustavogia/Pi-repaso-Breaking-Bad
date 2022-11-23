import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCharacters, filterCharactersBystatus, filterCreated, orderByName } from '../actions';
import { Link } from 'react-router-dom'
import Card from "./Card";
import Paginado from "./Paginado";
import {IoMdRefresh} from "react-icons/io"
import SearchBar from "./SearchBar";
import "../styles/Home.css"

export default function Home () {
    
    const dispatch = useDispatch()
    const allCharacters = useSelector((state) => state.characters)
    const [orden, setOrden] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [charactersPerPage, setCharactersPerPage] = useState(6)
    const indexOfLastCharacter = currentPage * charactersPerPage // 6
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage // 0
    const currentCharacters = allCharacters.slice(indexOfFirstCharacter, indexOfLastCharacter)
    const [carga, setCarga] = useState(true);
    // Pag.1 --> 0------6
    // Pag.2 --> 7------13

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect (() => {
        //lo mismo que mapStateToProps
        dispatch(getCharacters()).then(()=>setCarga(false))
            }, [dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getCharacters());
    }

    function handleFilterStatus(e) {
        if (e.target.value === "select") return e.preventDefault()
        e.preventDefault()
        dispatch(filterCharactersBystatus(e.target.value));
    }

    function handleFilterCreated(e) {
        if (e.target.value === "select") return e.preventDefault()
        e.preventDefault()
        dispatch(filterCreated(e.target.value));
    }

    function handleSort(e) {
        if (e.target.value === "select") return e.preventDefault()
        e.preventDefault()
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }
    if (carga) {
        return (<div ><h2 className="loading">Loading..</h2></div>)
      }
    return (
        <div className="home">
            <h1>Breaking Bad API</h1>
            <br/>
            <SearchBar/>
                       <Link to= '/character' className="linkCreate">
            <button className="btnCreate">Crear personaje</button>
            </Link>
            <div className="showAll">
              <span> Refresh </span>  
            <button onClick={e => {handleClick(e)}}>
            <IoMdRefresh/>
            </button>
            </div> 
            <br/>           
            <div className="select">
            <div className="span1" >
            <span className="span">Order by Characters Name</span>
                <select  onChange={e => handleSort(e)}>
                <option value="select">Seleccionar..</option>
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>
</div>
                <div className="span1" >
                <span className="span">Filter by Status</span>
                <select  onChange={e => handleFilterStatus(e)}>
                <option value="select">Seleccionar..</option>
                    <option value='All'>Todos</option>
                    <option value='Alive'>Vivo</option>
                    <option value='Deceased'>Muerto</option>
                    <option value='Unknown'>Desconocido</option>
                    <option value='Presumed dead'>Probablemente muerto</option>
                </select>
                </div>
               <div className="span1" >
                <span className="span">Filter by Existence</span>
                <select   onChange={e => handleFilterCreated(e)}>
                <option value="select" >Seleccionar..</option>
                    <option value='All'>Todos</option>
                    <option value='created'>Creados</option>
                    <option value='api'>Existente</option>
                </select>
                    </div>
                </div>
                <div className="paginate">
                <Paginado 
                charactersPerPage = {charactersPerPage}
                 allCharacters={allCharacters.length}
                  paginado={paginado}
                  currentPage={currentPage}
                  />
                </div>
                <div className="cards">
                {!currentCharacters.length?<h1 className="load">" Lo siento No hay Personajes para mostrar con esos filtros"</h1> :currentCharacters.map( (ch) => (
                    <div key={ch.id}>
                        <Link to={'/home/' + ch.id} className="linkCard">
                    <Card name={ch.name}
                     image={ch.img ? ch.img : ch.image} 
                     nickname={ch.nickname} 
                     />
                            </Link>
                            </div>
                            
                    ))}
                   </div>
      <div className="paginate">
        <Paginado
          charactersPerPage={charactersPerPage}
          allCharacters={allCharacters.length}
          paginado={paginado}
          currentPage={currentPage}
        />
      </div>
      </div>
             
    );}
