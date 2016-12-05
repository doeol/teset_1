/**
 * Created by User on 2016-10-28.
 */
var mongoose = require("mongoose");
var util = require("../util");

// schema
var projectSchema = mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref:"user", required:true },

    title:{type:String,
        required:[true,"프로젝트 제목은 필수 입니다."]
    },
    character_name:[{type:String}],
    situations:{type:String},
    synopsis:{type:String},
    chapter_synopsis:[{type:String}],
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date}
},{
    toObject:{virtuals:true}
});

// virtuals
projectSchema.virtual("createdDate")
    .get(function(){
        return util.getDate(this.createdAt);
    });

projectSchema.virtual("createdTime")
    .get(function(){
        return util.getTime(this.createdAt);
    });

projectSchema.virtual("updatedDate")
    .get(function(){
        return util.getDate(this.updatedAt);
    });

projectSchema.virtual("updatedTime")
    .get(function(){
        return util.getTime(this.updatedAt);
    });

// model & export
var Project = mongoose.model("project", projectSchema);
module.exports = Project;

