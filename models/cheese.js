const {Schema,model}= require('mongoose');

const CheeseSchema = Schema({
    name:{
        type:String,
        required:[true, 'Name is required'],

    },
    state:{
        type:Boolean,
        required:[true, 'State is required']
    },
    price:{
        type:Number,
        required: [true, 'Price is required']
    },
    descripcion:{
        type:String,
        unique:true
    },
    avalaible:{
        type:Boolean,
        required: [true, 'Avalaibled is required']
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    }
});

module.exports = model( 'Cheese',CheeseSchema )