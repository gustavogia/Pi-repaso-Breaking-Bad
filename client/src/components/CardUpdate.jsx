import React from 'react'
import avatar from "../images/avatar 1.gif"
import  "../styles/CardUpdate.css"


export const CardUpdate = ({image,nickname,name,status,occupations}) => {


  return (

        
      <div className='container'>
        <img src={image || avatar} 
            onError ={({currentTarget})=> {
                currentTarget.onerror=null;
                currentTarget.src= "https://i.stack.imgur.com/4powQ.gif"
              }}
              alt="" 
              className='imagen'/>
              <div className='letras'>
                <h1>Cambio en Vivo</h1>
        <h2>Name: <span> {name}</span></h2>
        <h2 >NickName: <span> {nickname}</span></h2>
        <h2 > Status: <span>{status}</span></h2>
        <h2>Occupation: <span>{occupations}</span></h2>
        </div>

    </div>
  )
}
