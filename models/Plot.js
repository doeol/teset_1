/**
 * Created by User on 2016-12-02.
 */
var mongoose = require("mongoose");
var util = require("../util");

// schema
var plotSchema = mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref:'user', required:true},
    project_id: { type: mongoose.Schema.Types.ObjectId, ref:'project', required:true },
    roll:{type:String},
    pattern:
    {
        pattern_1:{
            plot:{type:String}
        },
        pattern_2:{
            plot:{type:String}
        },
        pattern_3:{
            plot:{type:String}
        }
    },
    chapter:{
        plot:{type:String},
        level: {type: Number, min:0, max: 100},
    },
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date}
},{
    toObject:{virtuals:true}
});

// virtuals
plotSchema.virtual("createdDate")
    .get(function(){
        return util.getDate(this.createdAt);
    });

plotSchema.virtual("createdTime")
    .get(function(){
        return util.getTime(this.createdAt);
    });

plotSchema.virtual("updatedDate")
    .get(function(){
        return util.getDate(this.updatedAt);
    });

plotSchema.virtual("updatedTime")
    .get(function(){
        return util.getTime(this.updatedAt);
    });

// model & export
var Plot = mongoose.model("plot", plotSchema);
module.exports = Plot;

