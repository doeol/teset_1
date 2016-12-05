/**
 * Created by User on 2016-10-28.
 */
var express  = require("express");
var router   = express.Router();
var Character  = require("../models/Character");
var Project  = require("../models/Project");
var Plot = require("../models/Plot");

// Index
router.route("/").get(function(req, res){
    Character.find({project_id:req.session.project._id}, function(err, characters){
        if(err) return res.json(err);
        if(characters.length === 0){
            console.log("캐릭터를 만드세요.");
            res.redirect("/users/"+req.user.username+"/projects/");
        }else{
            var key_name = characters[0].name;
            var key_code = characters[0].mbti_code;
            var key_category = characters[0].mbti_category;
            res.render("plot/index", {characters:characters, projects:req.session.project, user:req.user, key_code:key_code, key_name:key_name, key_category:key_category});
        }
    });
});

// New
router.get("/new", function(req, res){
    res.render("plot/new", {projects:req.session.project});
});

// create
router.post("/", function(req, res){
    req.body.user_id = req.user.id;
    req.body.project_id = req.session.project._id;
    plot.create(req.body, function(err, plot){
        if(err) return res.json(err);
        res.redirect("/users/"+req.user.username+"/projects/"+req.session.project._id+"/matrix", {plot:plot});
    });
});

// show
router.get("/:id", function(req, res){
    Plot.findOne({_id:req.params.id}, function(err, plot){
        if(err) return res.json(err);
        res.render("plot/show", {plot:plot, user:req.user, projects:req.session.project});
    });
});

// edit
router.get("/:id/edit", function(req, res){
    Plot.findOne({_id:req.params.id}, function(err, plot){
        if(err) return res.json(err);
        res.render("plot/edit", {plot:plot, projects:req.session.project});
    });
});

// update
router.put("/:id", function(req, res){
    req.body.updatedAt = Date.now();
    Plot.findOneAndUpdate({_id:req.params.id}, req.body, function(err){
        if(err) return res.json(err);
        res.redirect("/users/"+req.user.username+"/projects/"+req.session.project._id+"/plot/"+req.params.id);
    });
});

// destroy
router.delete("/:id", function(req, res){
    Plot.remove({_id:req.params.id}, function(err){
        if(err) return res.json(err);
        res.redirect("/users/"+req.user.username+"/projects/"+req.session.project._id+"/plot");
    });
});

module.exports = router;
