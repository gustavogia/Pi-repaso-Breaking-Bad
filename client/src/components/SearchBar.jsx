import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCharacters } from "../actions";
import {BsSearch} from "react-icons/bs"

export default function SearchBar () {
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [error, setError] = useState("");

  const validate = (value) => {
      let error = "";
      let testLetter = /^[a-zA-Z][^$()@!¡""#/=¿{},.?*-_%&|<>#]*$/; //validate letter
      if(!testLetter.test(value)){
          error = 'Only letters are accepted for the search'
      }
      return error;
  }

    function handleInputChange(e) {
        e.preventDefault(e)
        setName(e.target.value)
        setError(validate(e.target.value))
        //console.log(name)
    }

    function handleSubmit(e) {
        e.preventDefault(e)
        if(!name) {
            alert('Por favor ingrese el nombre de un Personaje')
        }else if(!error){
            dispatch(getNameCharacters(name));
            setName('')
            
        }else {
            alert(error)
        }
    }

    return (
        <div>
            <input
            type = "text"
            value={name}
            placeholder= "Buscar..."
            onChange = {(e) => handleInputChange(e)}
            
            />
            <button type="submit" onClick={e => handleSubmit(e)}><BsSearch/></button>
            
        </div>
    )
}