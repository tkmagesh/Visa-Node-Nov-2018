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
	taskService.addNew(taskName, function(err, newTask){
		if (err){
			res.status(500).end();
			return;
		}	
		res.status(201).json(newTask);
	});
	
});

router.put('/:id', function(req, res, next){
	var taskIdToUpdate = parseInt(req.params.id);
	var updatedTask = req.body;
	taskService.update(taskIdToUpdate, updatedTask, function(err, task){
		if (err){
			res.status(404).end();
			return;
		}
		res.status(200).json(task);	
	});
});

router.delete('/:id', function(req, res, next){
	var taskIdToDelete = parseInt(req.params.id);
	taskService.remove(taskIdToDelete, function(err, result){
		if (err){
			res.status(404).end();
			return;	
		}
		res.status(200).json({});
	});		
});

module.exports = router;

/* http://localhost:3000/tasks */