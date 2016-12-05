/**
 * Created by User on 2016-10-28.
 */
var express  = require("express");
var router   = express.Router();
var Character  = require("../models/Character");
var Project  = require("../models/Project");
var Matrix = require("../models/Matrix");

// Index
router.route("/").get(function(req, res){
    Project.findOne({_id:req.session.project._id}, function(err, matrix){
        if(err) return res.json(err);
        res.render("matrix/index", {matrix:matrix, projects:req.session.project, user:req.user});
    });
});

// New
router.get("/new", function(req, res){
    res.render("matrix/new", {projects:req.session.project});
});

// create
router.post("/", function(req, res){
    req.body.user_id = req.user.id;
    req.body.project_id = req.session.project._id;
    Matrix.create(req.body, function(err, matrix){
        if(err) return res.json(err);
        res.redirect("/users/"+req.user.username+"/projects/"+req.session.project._id+"/matrix");
    });
});

// show
router.get("/:id", function(req, res){
    Matrix.findOne({_id:req.params.id}, function(err, matrix){
        if(err) return res.json(err);
        res.render("matrix/show", {matrix:matrix, user:req.user, projects:req.session.project});
    });
});

// edit
router.get("/:id/edit", function(req, res){
    Matrix.findOne({_id:req.params.id}, function(err, matrix){
        if(err) return res.json(err);
        res.render("matrix/edit", {matrix:matrix, projects:req.session.project});
    });
});

// update
router.put("/:id", function(req, res){
    req.body.updatedAt = Date.now();
    Matrix.findOneAndUpdate({_id:req.params.id}, req.body, function(err, characters){
        if(err) return res.json(err);
        res.redirect("/users/"+req.user.username+"/projects/"+req.session.project._id+"/matrix/");
    });
});

// destroy
router.delete("/:id", function(req, res){
    Matrix.remove({_id:req.params.id}, function(err){
        if(err) return res.json(err);
        res.redirect("/users/"+req.user.username+"/projects/"+req.session.project._id+"/matrix");
    });
});

module.exports = router;
