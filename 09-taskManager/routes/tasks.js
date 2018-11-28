var express = require('express');
var router = express.Router();
var taskService = require('../services/taskService');


router.get('/', function(req, res, next){
	/*var promise = taskService.getAll();
	promise.then(function(tasks){
		res.json(tasks);
	});*/

	taskService
		.getAll()
		.then(function(tasks){
			res.json(tasks);
		});
});

router.post('/', function(req, res, next){
	var taskName = req.body.newTaskName;

	taskService
		.addNew(taskName)
		.then(function(newTask){
			res.status(201).json(newTask);
		})
		.catch(function(err){
			res.status(500).end();
		});
});

router.put('/:id', function(req, res, next){
	var taskIdToUpdate = parseInt(req.params.id);
	var updatedTask = req.body;
	taskService.update(taskIdToUpdate, updatedTask)
		.then(function(task){
			res.status(200).json(task);	
		})
		.catch(function(err){
			res.status(404).end();
		});	
});

router.delete('/:id', function(req, res, next){
	var taskIdToDelete = parseInt(req.params.id);
	taskService.remove(taskIdToDelete)
		.then(function(){
			res.status(200).json({});
		})
		.catch(function(err){
			res.status(404).end();
		});
		
});

module.exports = router;

/* http://localhost:3000/tasks */