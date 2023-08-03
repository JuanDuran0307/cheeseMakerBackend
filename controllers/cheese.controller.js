const Cheese  = require('../models/cheese.js');  



const getCheese = async(req,res)=>{
    const {desde, hasta} = req.query;
    const query = {state:true};
    /* const Cheese = await Cheese.find(query); */

    const [total, cheeses] = await Promise.all([
        Cheese.countDocuments(query),
        Cheese.find(query).skip(Number(desde)).limit(Number(hasta))
    ]);
    res.json({
        total,
        cheeses
    })
} 



const postCheese = async(req, res ) => {

    const nombre = req.body.nombre.toUpperCase();

    const cheeseDB = await Cheese.findOne({ nombre });

    if ( cheeseDB ) {
        return res.status(400).json({
            msg: `La cheese ${ cheeseDB.nombre }, ya existe`
        });
    }

    const name = req.boy.name.toUpperCase();
    const cheeseCA = await Cheese.findOne({name})

    if(cheeseCA){
        return res.status(400).json({
            msg: `La cheese ${ cheeseCA.name }, ya existe`
        });
    }
   /*  console.log("usuario:",usuario); */
    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id,
        name,
        categoria: req.categoria._id
    }

    
    const cheese = new Cheese( data );

    // Guardar DB
    await cheese.save();

    res.status(201).json(cheese);



};
const deleteCheese = async(req,res)=>{
    const {id} = req.params;
    const cheese = await Cheese.findByIdAndUpdate(id,{estado:false});
    res.json ("Borro",cheese);

}

const putCheese = async(req,res)=>{
    const {id} = req.params;

    const { _id, ...rest}= req.body;
    const cheese = await Cheese.findByIdAndUpdate(id, rest);

    res.json({
        msg:"Cheese Actualizada",
        cheese : cheese
    });
    
}


module.exports = {
    postCheese,
    getCheese,
    deleteCheese,
    putCheese
 
}