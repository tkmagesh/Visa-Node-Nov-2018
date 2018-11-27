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

router.put('/:id', function(req, res, next){
	var taskIdToUpdate = parseInt(req.params.id);
	var updatedTask = req.body;
	var taskToUpdate = tasks.find(function(task){
		return task.id === taskIdToUpdate;
	});
	if (taskToUpdate){
		tasks = tasks.map(function(task){
			return task.id === taskIdToUpdate ? updatedTask : task;
		});
		res.status(200).json(updatedTask);
	} else {
		res.status(404).end();
	}
});

module.exports = router;

/* http://localhost:3000/tasks */