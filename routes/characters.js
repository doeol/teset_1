/**
 * Created by User on 2016-10-28.
 */
var express  = require("express");
var router   = express.Router();
var Character  = require("../models/Character");
var Project  = require("../models/Project");

// Index
router.route("/").get(function(req, res){
    var num=0;
    Character.find({project_id:req.session.project._id}, function(err, characters, num){
            var _num = num;
            if(err) return res.json(err);
            res.render("characters/index", {characters:characters, projects:req.session.project, user:req.user, num:_num});
        });
});

// New
router.get("/new/", function(req, res){
    res.render("characters/new", {projects:req.session.project});
});

// create
router.post("/", function(req, res){
    req.body.user_id = req.user.id;
    req.body.project_id = req.session.project._id;
    Character.create(req.body, function(err, characters){
        if(err) return res.json(err);
        res.redirect("/users/"+req.user.username+"/projects/"+req.session.project._id+"/characters");
    });
});

// show
router.get("/:id", function(req, res){
    Character.findOne({_id:req.params.id}, function(err, characters){
        if(err) return res.json(err);
        res.render("characters/show", {characters:characters, user:req.user, projects:req.session.project});
    });
});

// edit
router.get("/:id/edit", function(req, res){
    Character.findOne({_id:req.params.id}, function(err, characters){
        if(err) return res.json(err);
        res.render("characters/edit", {characters:characters, projects:req.session.project});
    });
});

// update
router.put("/:id", function(req, res){
    req.body.updatedAt = Date.now();
    Character.findOneAndUpdate({_id:req.params.id}, req.body, function(err, characters){
        if(err) return res.json(err);
        res.redirect("/users/"+req.user.username+"/projects/"+req.session.project._id+"/characters/"+req.params.id);
    });
});

// destroy
router.delete("/:id", function(req, res){
    Character.remove({_id:req.params.id}, function(err){
        if(err) return res.json(err);
        res.redirect("/users/"+req.user.username+"/projects/"+req.session.project._id+"/characters");
    });
});

module.exports = router;
