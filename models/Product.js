const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
    },
    img: {
      type: String,
      required: true,
    },
    category: {
      type: Array,
    },
    size: {
      type: Array,
    },
    color: {
      type: Array,
    },
    price: {
      type: String,
      required: true,
    },
    inStock: {
      type: Boolean,
      default: 1,
    },
    width:{
      type:String,
    },
    height:{
      type:String
    },
   top:{
      type:Number,
    },
   left:{
      type:Number
    },
   bottom:{
      type:Number,
    },
   right:{
      type:Number
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", ProductSchema);
