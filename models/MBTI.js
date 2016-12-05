/**
 * Created by User on 2016-11-30.
 */
var mongoose = require("mongoose");

// schema
var mbtiSchema = mongoose.Schema({
    code:{type:String},
    roll:{type:Number},
    description:{type:String},
    pattern:{
      p_1:{type:String},
      p_2:{type:String},
      p_3:{type:String}
    },
    recommend_pattern:{
        c_1:{type:String},
        c_2:{type:String},
        c_3:{type:String}
    }

},{
    toObject:{virtuals:true}
});

// model & export
var Mbti = mongoose.model("mbti", mbtiSchema);
module.exports = Mbti;

