var mongoose = require("mongoose");
var util = require("../util");

// schema
var characterSchema = mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref:'user', required:true},
    project_id: { type: mongoose.Schema.Types.ObjectId, ref:'project', required:true },
    name:{type:String,
        required:[true,"캐릭터 이름은 필수 입니다."]
    },
    roll:{type:String},
    motivation:{type:String},
    sex:{type:String},
    age:{type:Number},
    job:{type:String},
    mbti_category:{type:String},
    mbti_code:{type:String},
    mbti_des:{type:String},
    description:{type:String},
    trauma: {type:String},
    pathology: {type:String},
    openness: {type: Number, min:0, max: 10},
    faithfulness: {type: Number, min:0, max: 10},
    sensitiveness: {type: Number, min:0, max: 10},
    synchronism: {type: Number, min:0, max: 10},
    extroversion: {type: Number, min:0, max: 10},
    intelligence: {type: Number, min:0, max: 10},
    physical: {type: Number, min:0, max: 10},
    emotional: {type: Number, min:0, max: 10},
    social: {type: Number, min:0, max: 10},
    wealth: {type: Number, min:0, max: 10},
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date}
},{
    toObject:{virtuals:true}
});

// virtuals
characterSchema.virtual("createdDate")
    .get(function(){
        return util.getDate(this.createdAt);
    });

characterSchema.virtual("createdTime")
    .get(function(){
        return util.getTime(this.createdAt);
    });

characterSchema.virtual("updatedDate")
    .get(function(){
        return util.getDate(this.updatedAt);
    });

characterSchema.virtual("updatedTime")
    .get(function(){
        return util.getTime(this.updatedAt);
    });

// model & export
var Character = mongoose.model("character", characterSchema);
module.exports = Character;

