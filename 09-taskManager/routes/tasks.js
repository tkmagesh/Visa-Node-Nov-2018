var express = require('express');
var router = express.Router();
var taskService = require('../services/taskService');


router.get('/', function(req, res, next){
	taskService.getAll(function(err, tasks){
		res.json(tasks);
	});
});

router.post('/', function(req, res, next){
	var taskName = req.body.newTaskName;
	var newTask = taskService.addNew(taskName);
	res.status(201).json(newTask);
});

router.put('/:id', function(req, res, next){
	var taskIdToUpdate = parseInt(req.params.id);
	var updatedTask = req.body;
	try{
		taskService.update(taskIdToUpdate, updatedTask);
		res.status(200).json(updatedTask);
	} catch (err) {
		res.status(404).end();
	}
});

router.delete('/:id', function(req, res, next){
	var taskIdToDelete = parseInt(req.params.id);
	try{
		taskService.remove(taskIdToDelete);
		res.status(200).json({});
	} catch (err) {
		res.status(404).end();
	}
});

module.exports = router;

/* http://localhost:3000/tasks */