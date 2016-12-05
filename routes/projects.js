/**
 * Created by User on 2016-10-28.
 */
var express  = require("express");
var router   = express.Router();
var Project  = require("../models/Project");
var Character = require("../models/Character");

// Index
router.route("/").get(function(req, res){
    Project.find({user_id:req.user.id}).populate("user").sort('-createdAT').exec(
        function(err, projects){
            if(err) return res.json(err);
            res.render("projects/index", {projects:projects, user:req.user});
        });
});

// New
router.get("/new", function(req, res){
    var project = req.flash("project")[0] || {};
    var errors = req.flash("errors")[0] || {};
    var character = new Character;
    res.render("projects/new", {user:req.user, project:project, errors:errors, character:character});
});

// create
router.post("/", function(req, res){
    req.body.user_id = req.user.id;
    Project.create(req.body, function(err, project){
        if(err){
          /*  req.flash("project", req.body);
            req.flash("errors", util.parseError(err));
          */  return res.redirect("/users/"+req.user.username+"/projects/new");
        }
            req.session.project = project;
            res.redirect("/users/"+req.user.username+"/projects/"+project._id+"/characters");
    });
});

// show
router.get("/:id", function(req, res){
     Project.findOne({_id:req.params.id}, function(err, projects){
        if(err) return res.json(err);
        req.session.project = projects;
        res.render("projects/show", {projects:projects});
    });
});

// edit
router.get("/:id/edit", function(req, res){
    Project.findOne({_id:req.params.id}, function(err, projects){
            if(err) {
                return res.json(err);
                res.render("projects/edit", {projects:projects});
            }
            else{
            projects._id = req.params.id;
            req.session.project = projects;
            res.render("projects/edit", {projects:projects});
        }
    });
});

// update
router.put("/:id", function(req, res){
    req.body.updatedAt = Date.now();
    Project.findOneAndUpdate({_id:req.params.id}, req.body, function(err, projects){
        if(err) {
            return res.redirect("/users/"+req.user.username+"/projects/"+req.params.id);
        }
        res.redirect("/users/"+req.user.username+"/projects/"+req.params.id);
    });
});

// destroy
router.delete("/:id", function(req, res){
    Project.remove({_id:req.params.id}, function(err){
        if(err) return res.json(err);
        res.redirect("/users/"+req.user.username+"/projects");

    });
});


module.exports = router;
