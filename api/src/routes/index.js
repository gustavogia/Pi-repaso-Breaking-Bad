const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Character, Occupation } = require('../db');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
    const apiUrl = await axios.get('https://breakingbadapi.com/api/characters');
    const apiInfo = await apiUrl.data.map(el => {
        return {
            name: el.name,
            img: el.img,
            nickname: el.nickname,
            status: el.status,
            id: el.char_id,
            occupation: el.occupation.map(el => el),
            birthday: el.birthday,
            appearance: el.appearance.map(el => el)
        }
    })
    return apiInfo;
};

const getBbInfo = async () => {
    return await Character.findAll({
        include: {
            model: Occupation,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
};

const getAllCharacters = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getBbInfo();
    const dbformateo = dbInfo.map((e)=>e.dataValues)
    const dbformat= dbformateo.map((e)=>{
    e.occupations=e.occupations.map(el=>el.name)
    return e
    })
    const infoTotal = apiInfo.concat(dbformat);
    return infoTotal;
};
// const getAllCharacters = async () => {
//     const apiInfo = await getApiInfo();
//     const dbInfo = await getDbInfo();
//     const infoTotal = apiInfo.concat(dbInfo);
//     return infoTotal;
//   }

router.get('/characters', async (req, res) => {
    const name = req.query.name;
    let charactersTotal = await getAllCharacters();
    if (name) {
        let characterName = await charactersTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
        characterName.length ? res.status(200).send(characterName) : res.status(404).send('No se encuentra el personaje');
    } else {
        res.status(200).send(charactersTotal);
    }
});

// router.get('/occupations', async (req, res) => {
//     const occupationsApi = await axios.get('https://breakingbadapi.com/api/characters');
//     const occupations = occupationsApi.data.map(el => el.occupation)
//     const occEach = occupations.map(el => {
//         for (let i = 0; i < el.length; i++) 
//             return el[i] 
//         })
//         console.log(occEach)
        
//     occEach.forEach(el => {
//         Occupation.findOrCreate({
//             where: { name: el }
//         })
//     })
//     const allOccupations = await Occupation.findAll();
//     res.send(allOccupations);
//});
router.get('/occupations', async (req, res) => {
    const personajes =  await getApiInfo()
    personajes.forEach(el => {             //buscar como implementar el metodo flat !!!!
        el.occupation.forEach(oc => {
            Occupation.findOrCreate({
                where: {name: oc}
            })
        })
    })       
    const allOccupations = await Occupation.findAll()
    res.send(allOccupations)
})

router.post('/character', async (req, res) => {
    
    let {
        name,
        nickname,
        birthday,
        image ,
        status,
        createdInDb,
        occupation } = req.body

    console.log(req.body)
    let characterCreate = await Character.create({
        name, 
        nickname,
         birthday,
         image:image || "https://w7.pngwing.com/pngs/791/694/png-transparent-female-silhouette-user-avatar-animals-head-woman.png",
          status,
           createdInDb})

    let occupationDb = await Occupation.findAll({where: {name: occupation}})
    characterCreate.addOccupation(occupationDb)

    res.send(characterCreate)
})

router.get('/characters/:id', async (req, res) => {
    const id = req.params.id;
    const charactersTotal = await getAllCharacters();
    if (id) {
        let characterId = await charactersTotal.filter(el => el.id == id)
        characterId.length ?
        res.status(200).json(characterId) :
        res.status(404).send('Personaje no encontrado');
    }
})
///////////////////////////////////////////////////////////////////////
// Ruta para borrar personaje por id (funciona)

router.delete('/delete/:id', async (req,res)=>{
    const {id} = req.params;
    try{
        const destruir = await Character.destroy({
            where:{id:id}})
            res.send("El personaje con ese id fue eliminado")    
    }
    catch (error) {('error en la ruta')}
    })
    
    ////////////////////////////////////////////////////////////
    
    // Ruta para borrar personaje por nombre (funciona)
    
    router.delete('/delete', async (req,res)=>{
        const {name} = req.query;
        try{
            const destruir = await Character.destroy({
                where:{name:name}})
                res.send(`El personaje ${name} fue eliminado`)    
        }
        catch (error) {('error en la ruta')}
        })
    
    ///////////////////////////////////////////////////////
    
    // Ruta para actualizar los datos que tengo por body
    
    router.put('/:name', async ( req,res) => {
        
        try{
        const name = req.params.name
        const {nickname} = req.body
    const cambio = await Character.update(
            {nickname},
        {where : {name}},
        
    )
    res.status (200).send ("El nickname fue actualizado")
    }
    catch (error) {res.status(404).send("No se pudo actualizar el nickname")}
    })
    

module.exports = router;

// const { Router } = require('express');
// // Importar todos los routers;
// // Ejemplo: const authRouter = require('./auth.js');
// const axios = require('axios');
// const { Character, Occupation } = require('../db');

// const router = Router();

// // Configurar los routers
// // Ejemplo: router.use('/auth', authRouter);
// const getApiInfo = async () => {
//     const apiUrl = await axios.get('https://breakingbadapi.com/api/characters');
//     const apiInfo = await apiUrl.data.map(el => {
//         return {
//             name: el.name,
//             img: el.img,
//             nickname: el.nickname,
//             status: el.status,
//             id: el.char_id,
//             occupation: el.occupation.map(el => el),
//             birthday: el.birthday,
//             appearance: el.appearance.map(el => el)
//         }
//     })
//     return apiInfo;
// };

// const getBbInfo = async () => {
//     return await Character.findAll({
//         include: {
//             model: Occupation,
//             attributes: ['name'],
//             through: {
//                 attributes: [],
//             },
//         }
//     })
// };

// const getAllCharacters = async () => {
//     const apiInfo = await getApiInfo();
//     const dbInfo = await getBbInfo();
//     const infoTotal = apiInfo.concat(dbInfo);
//     return infoTotal;
// };

// router.get('/characters', async (req, res) => {
//     const name = req.query.name;
//     let charactersTotal = await getAllCharacters();
//     if (name) {
//         let characterName = await charactersTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
//         characterName.length ? res.status(200).send(characterName) : res.status(404).send('No se encuentra el personaje');
//     } else {
//         res.status(200).send(charactersTotal);
//     }
// });

// router.get('/occupations', async (req, res) => {
//     const occupationsApi = await axios.get('https://breakingbadapi.com/api/characters');
//     const occupations = occupationsApi.data.map(el => el.occupation)
//     const occEach = occupations.map(el => {
//         for (let i = 0; i < el.length; i++) 
//             return el[i] 
//         })
//         console.log(occEach)
        
//     occEach.forEach(el => {
//         Occupation.findOrCreate({
//             where: { name: el }
//         })
//     })
//     const allOccupations = await Occupation.findAll();
//     res.send(allOccupations);
// });

// router.post('/character', async (req, res) => {
//     const { name, nickname, birthday, image, status, createdInDb, occupation } = req.body
//     let characterCreated = await Character.create ({
//         name,
//         nickname,
//         birthday,
//         image,
//         status,
//         createdInDb
//     })

//     let occupationDb = await Occupation.findAll({
//         where: { name: occupation }
//     })
//     characterCreated.addOccupation(occupationDb);
//     res.send('Personaje creada con exito');
// });

// router.get('/characters/:id', async (req, res) => {
//     const id = req.params.id;
//     const charactersTotal = await getAllCharacters();
//     if (id) {
//         let characterId = await charactersTotal.filter(el => el.id == id)
//         characterId.length ?
//         res.status(200).json(characterId) :
//         res.status(404).send('Personaje no encontrado');
//     }
// })

// module.exports = router;
