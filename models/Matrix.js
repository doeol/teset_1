/**
 * Created by User on 2016-10-28.
 */
var mongoose = require("mongoose");
var util = require("../util");

// schema
var matrixSchema = mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref:"user", required:true },
    project_id: { type: mongoose.Schema.Types.ObjectId, ref:'project', required:true },
    plot:{type:String},
    synopsis:{type:String},
    scene:[{
        chapter_id:[{type:mongoose.Schema.Types.ObjectId}],
        background:{type:String},
        scene_synopsis:{type:String},
        situations:{type:String},
        stage:{type:String},
        character_id:[{type:mongoose.Schema.Types.ObjectId}],
        character_name:[{type:String}]
    }],
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date}
},{
    toObject:{virtuals:true}
});

// virtuals
matrixSchema.virtual("createdDate")
    .get(function(){
        return util.getDate(this.createdAt);
    });

matrixSchema.virtual("createdTime")
    .get(function(){
        return util.getTime(this.createdAt);
    });

matrixSchema.virtual("updatedDate")
    .get(function(){
        return util.getDate(this.updatedAt);
    });

matrixSchema.virtual("updatedTime")
    .get(function(){
        return util.getTime(this.updatedAt);
    });

// model & export
var Matrix = mongoose.model("matrix", matrixSchema);
module.exports = Matrix;

