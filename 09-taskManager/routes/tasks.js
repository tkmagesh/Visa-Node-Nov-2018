var express = require('express');
var router = express.Router();

var tasks = [
	{id : 1, name : 'Watch Avengers'},
	{id : 2, name : 'Fix THAT bug!'}
];

router.get('/', function(req, res, next){
	res.json(tasks);
});

router.post('/', function(req, res, next){
	var taskName = req.body.newTaskName;
	var newTaskId = tasks.reduce(function(result, task){
		return result > task.id ? result : task.id;
	}, 0) + 1;
	var newTask = {
		id : newTaskId,
		name : taskName
	};
	tasks.push(newTask);
	res.status(201).json(newTask);
});

module.exports = router;

/* http://localhost:3000/tasks */