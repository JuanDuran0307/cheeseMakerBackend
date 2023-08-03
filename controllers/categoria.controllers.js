const Categoria  = require('../models/Categoria.js');  



const getCategoria = async(req,res)=>{
    const {desde, hasta} = req.query;
    const query = {estado:true};
    /* const categoria = await Categoria.find(query); */

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query).skip(Number(desde)).limit(Number(hasta))
    ]);
    res.json({
        total,
        categorias
    })
} 



const postCategoria = async(req, res ) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if ( categoriaDB ) {
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre }, ya existe`
        });
    }
   /*  console.log("usuario:",usuario); */
    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    
    const categoria = new Categoria( data );

    // Guardar DB
    await categoria.save();

    res.status(201).json(categoria);



};
const deleteCategoria = async(req,res)=>{
    const {id} = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id,{estado:false});
    res.json ("Borro",categoria);

}

const putCategoria = async(req,res)=>{
    const {id} = req.params;

    const { _id, ...rest}= req.body;
    const categoria = await Categoria.findByIdAndUpdate(id, rest);

    res.json({
        msg:"Categoria Actualizada",
        categoria : categoria
    });
    
}


module.exports = {
    postCategoria,
    getCategoria,
    deleteCategoria,
    putCategoria
 
}