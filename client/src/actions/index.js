import axios from 'axios';

export function getCharacters(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/characters');

        return dispatch({
            type: 'GET_CHARACTERS',
            payload: json.data
        })
    }
}

export function getNameCharacters(name){
    return async function (dispatch){
        try {
            var json = await axios.get('http://localhost:3001/characters?name=' + name);
            return dispatch ({
                type: 'GET_NAME_CHARACTERS',
                payload: json.data
            })
        } catch (error) {
           alert("El Personaje no existe")
        }
    }
}

export function getOccupations(){
    return async function (dispatch){
        var info = await axios.get('http://localhost:3001/occupations')
        return dispatch({
            type: 'GET_OCCUPATIONS',
            payload: info.data
        })
    }
}

export function postCharacter(payload){
    return async function (){
        const response = await axios.post('http://localhost:3001/character', payload)
        console.log(response)
        return response;
    }
}

export function getDetail(id){
    return async function(dispatch){
        try{
            var json = await axios.get('http://localhost:3001/characters/' + id);
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
            })
        } catch(error) {
            console.log(error)
        }
    }
}

export function filterCharactersBystatus(payload) {
    return {
        type: 'FILTER_BY_STATUS',
        payload
    }
}

export function filterCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}
export function deleteDetails() {
    return async function (dispatch){
    return dispatch({
        type: 'DELETE_DETAILS'
    })
}
}
export function deletevideogamebyid(id) {
    return async function (dispatch) {
      try {
        await axios.delete(`http://localhost:3001/delete/${id}`);
        return dispatch({ type:'DELETE_VIDEOGAME_BYID' });
      } catch (error) {
        console.log(error);
      }
    };
  }


// export function isloading(loading) {
//         return {
//         type: 'IS_LOADING',
//         payload: loading

// }}