var express = require('express');
var router = express.Router();

var tasks = [
	{id : 1, name : 'Watch Avengers'},
	{id : 2, name : 'Fix THAT bug!'}
];

router.get('/', function(req, res, next){
	res.json(tasks);
});

module.exports = router;

/* http://localhost:3000/tasks */