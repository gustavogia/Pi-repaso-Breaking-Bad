import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCharacters, filterCharactersBystatus, filterCreated, orderByName } from '../actions';
import { Link } from 'react-router-dom'
import Card from "./Card";
import Paginado from "./Paginado";
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

    // Pag.1 --> 0------6
    // Pag.2 --> 7------13

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect (() => {
        //lo mismo que mapStateToProps
        dispatch(getCharacters())
            }, [])

    function handleClick(e){
        e.preventDefault();
        dispatch(getCharacters());
    }

    function handleFilterStatus(e) {
        dispatch(filterCharactersBystatus(e.target.value));
    }

    function handleFilterCreated(e) {
        dispatch(filterCreated(e.target.value));
    }

    function handleSort(e) {
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    return (
        <div className="home">
            <h1>Breaking Bad API</h1>
            <SearchBar/>
            <Link to= '/character' className="linkCreate">
            <button className="btnCreate">Crear personaje</button>
            </Link>
            <div className="showAll">
            <button onClick={e => {handleClick(e)}}>
                Volver a cargar todos los personajes
            </button>
            </div>            
            <div className="select">
            <span className="span">Order by Characters Name</span>
                <select className="span" onChange={e => handleSort(e)}>
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>
                <span className="span">Filter by Status</span>
                <select className="span" onChange={e => handleFilterStatus(e)}>
                    <option value='All'>Todos</option>
                    <option value='Alive'>Vivo</option>
                    <option value='Deceased'>Muerto</option>
                    <option value='Unknown'>Desconocido</option>
                    <option value='Presumed dead'>Probablemente muerto</option>
                </select>
                <span className="span">Filter by Existence</span>
                <select className="span"   onChange={e => handleFilterCreated(e)}>
                    <option value='All'>Todos</option>
                    <option value='created'>Creados</option>
                    <option value='api'>Existente</option>
                </select>
                </div>
                <div className="paginate">
                <Paginado charactersPerPage = {charactersPerPage}
                 allCharacters={allCharacters.length}
                  paginado={paginado}
                  />
                </div>
                <div className="cards">
                {currentCharacters && currentCharacters.map( (ch) => (
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
        />
      </div>
      </div>
             
    );}
