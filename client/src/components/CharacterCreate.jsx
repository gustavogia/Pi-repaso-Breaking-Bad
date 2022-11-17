import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postCharacter, getOccupations } from '../actions/index.js'
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import "../styles/CharacterCreate.css";
import "../styles/button.css";

export default function CharacterCreate() {
    const allcharacters= useSelector(state => state.characters)
    const dispatch = useDispatch()
    const history = useHistory()
    const occupations = useSelector((state) => state.occupations)
    const [errors, setErrors] = useState({});
    const db = allcharacters.filter(e => e.createInDb === true)

    function validate(input) {
        let errors = {};
    
        if (!input.name === '') {
            errors.name = `Please, enter the name`;
            
            let search = db.find(e => e.name.toLowerCase() === input.name.toLowerCase())
             if(search){
                 errors.name = "El Nombre del personaje ya existe"
                 return errors
             }
            
        } else {
            if (!/^[a-zA-Z\s]*$/.test(input.name)) {
                errors.name = `The Name can only contain letters.`;
            }
        }
        if (!input.nickname === '') {
            errors.nickname = `Please, enter the name`;
        } else {
            if (!/^[a-zA-Z\s]*$/.test(input.nickname)) {
                errors.nickname = `The Nickname can only contain letters.`;
            }
        }
    input.occupation.length < 1
    ? (errors.occupation = "Choose at least one occupation")
    : (errors.occupation = "");
    
    return errors;
    }


    const ordenamiento = occupations.map((el)=>el.name).sort(
        function (a, b) {
          if (a < b) return -1;
          else return 1;
        })
        const nuevorden = [...new Set(ordenamiento)]

    const [input, setInput] = useState({
        name: "",
        nickname: "",
        birthday: "",
        status: "",
        occupation: []
    })

    
      
    function handleChange(e) {
        setInput((input) => ({
            ...input,
            [e.target.name]: e.target.value,
        }));
        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
    }

    function handleCheck(e) {
        if (e.target.checked) {
            setInput({
                ...input,
                [e.target.name]: e.target.value
            })
        } 
    }

    function handleSelect(e) {
        if(e.target.value === "select") return input
        if(!input.occupation.includes(e.target.value))
        setInput({
            ...input,
            occupation: [...input.occupation, e.target.value]
        })
        setErrors(
            validate({
                ...input,
                occupation: [...input.occupation, e.target.value]
            })
        );
    }

    function handleSubmit(e) {
        if(!input.name || !input.nickname || !input.birthday || !input.status || !input.occupation ){
        e.preventDefault();
        Swal.fire("Complete todos los campos para poder continuar")}
      
        else{
       e.preventDefault();
       Swal.fire("Personaje creado!!");
        dispatch(postCharacter(input))
        setInput({
            name: "",
            nickname: "",
            birthday: "",
            status: "",
            image:"" || "https://w7.pngwing.com/pngs/791/694/png-transparent-female-silhouette-user-avatar-animals-head-woman.png",
            occupation: []
        })
        
        // history.push("/home")
    }
    }

    function handleDelete(el) {
        setInput({
            ...input,
            occupation: input.occupation.filter(oc => oc !== el)
        })
    }
    


    useEffect(() => {
        dispatch(getOccupations())
    }, []);

   

    return (

        <div >
            <Link to='/home'>
                <button className="btn">Volver a Home</button>
            </Link>
           <div  className="cardComp">
            <h1 className="crumbs"> Crea tu personaje</h1>
            <form onSubmit={(e) => handleSubmit(e)} >
                <div className="crumbs">
                    <h4 className="gust">Nombre: </h4>
                    <input

                        placeholder="Nombre del personaje"
                        type='text'
                        value={input.name}
                        name='name'
                        onChange={(e) => handleChange(e)}
                                            />
            <div>
                <span>{errors.name}</span>
            </div>
                </div>
                <div className="crumbs">
                    <h4 className="gust">Nickname: </h4>
                    <input
                    
                        type='text'
                        placeholder="Nickname del personaje"
                        value={input.nickname}
                        name='nickname'
                        onChange={handleChange}
                                            />
             <div>
                <p>{errors.nickname}</p>
            </div>
                </div>
                <div className="crumbs">
                    <h4 className="gust">Birthday: </h4>
                    <input
                        type='date'
                        value={input.birthday}
                        name='birthday'
                        onChange={handleChange}
                        
                    />
                </div>
                
                <div className="crumbs">
                    <h4 className="gust">Image: </h4>
                    <input
                        type='text'
                        value={input.image}
                        name='image'
                        onChange={handleChange} 
                        placeholder="ingrese una imagen o deje por defecto la que esta"
                        />
                </div>
                <br/>
                <div className="crumbs">
                    <h4 className="gust">Status: </h4>
                    <h5 className="gus">Alive
                        <input type='radio' value='Alive' name='status' onChange={e => handleCheck(e)} />
                    </h5>
                    <h5 className="gus">Deceased
                        <input type='radio' value='Deceased' name='status' onChange={e => handleCheck(e)} />
                    </h5>
                    <h5 className="gus">Unknown
                        <input type='radio' value='Unknown' name='status' onChange={e => handleCheck(e)} />
                    </h5>
                    <h5 className="gus"> Presumed Dead
                        <input type='radio' value='Presumed Dead' name='status' onChange={e => handleCheck(e)} />
                    </h5>
                </div>
                <div className="crumbs">
                    <h4 className="gust">Ocupacion: </h4>
                    <select onChange={(e) => handleSelect(e)}>
                    <option value="select">Seleccionar....</option>
                        {nuevorden.map((ordenamiento) => {return ordenamiento?(
                            <option
                                value={ordenamiento.name}
                                key={ordenamiento.name}>
                                {ordenamiento}
                            </option>
                        ):("")})}
                    </select>
                    {input.occupation.map((d, i) => (
                        <div key={i}>
                            <li>{d}</li>
                            <button onClick={() => handleDelete(d, i)}>x</button>
                        </div>
                    ))}
<div>
             {errors.occupation && <p>{errors.occupation}</p>}
            </div>

                </div>
                <div className="btnenviar">

                    <input className="btn" type="submit" value="Crea Personaje" />
                </div>


            </form>
           </div>
            {/* {input.occupation.map(oc => 
                <div>
                    <p>{oc}</p>
                    <button onClick={() => handleDelete(oc)}>x</button>
                </div>
            )} */}
        </div>

    )
}
