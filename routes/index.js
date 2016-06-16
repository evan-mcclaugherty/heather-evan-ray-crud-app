var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
require('dotenv').load();


/* GET home page. */
router.get('/', function(req, res, next) {
    knex.table('sandwiches').select().then(sandwiches => {
        res.render('index', {
            sandwiches: sandwiches
        });
    })
});

router.get('/create', function(req, res, next) {
    res.render('create');
});

router.get('/:id', function(req, res, next) {
    knex.table('sandwiches').where({
        id: req.params.id
    }).first().then(sandwich => {
        console.log(sandwich);
        res.render('details', {
            sandwiches: sandwich
        });
    })
});

router.get('/:id/delete', function(req, res, next) {
    knex.table('sandwiches').where({
        id: req.params.id
    }).del().then(() => {
        res.redirect('/');
    })
});

router.get('/:id/edit', function(req, res, next) {
    knex.table('sandwiches').where({
        id: req.params.id
    }).first().then(sandwich => {
        res.render('edit', {
            sandwich: sandwich
        });
    })
});

router.post('/:id/edit', function(req, res, next) {
    console.log(req.body);
    knex.table('sandwiches').where({
        id: req.params.id
    }).update(req.body).then(() => {
        res.redirect('/' + req.params.id);
    })
});

router.post('/create', function(req, res, next) {
    var data = {
        name: req.body.name,
        directions: req.body.directions,
        imageurl: req.body.imageurl,
        rating: req.body.rating
    }
    knex('sandwiches').insert(data).then(function() {
        res.redirect('/');
    }).catch(function(error) {
        next(error);
    })
})
module.exports = router;
