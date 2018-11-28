var taskdb = require('./taskdb');

function getAll(callback){
	taskdb.readAll(function(err, tasks){
		callback(err,tasks);
	});
}

function addNew(newTaskName, callback){
	taskdb.readAll(function(err, tasks){
		var newTaskId = tasks.reduce(function(result, task){
			return result > task.id ? result : task.id;
		}, 0) + 1;
		var newTask = {
			id : newTaskId,
			name : newTaskName
		};
		tasks.push(newTask);
		taskdb.save(tasks, function(err, result){
			if (err){
				callback(err, null);
			} else {
				callback(null, newTask);
			}
			
		});
	})
	
}

function update(taskIdToUpdate, updatedTask, callback){
	taskdb.readAll(function(err, tasks){
		var taskToUpdate = tasks.find(function(task){
			return task.id === taskIdToUpdate;
		});
		if (taskToUpdate){
			tasks = tasks.map(function(task){
				return task.id === taskIdToUpdate ? updatedTask : task;
			});
			taskdb.save(tasks, function(err, result){
				if (err){
					callback(err);
				} else {
					callback(null, updatedTask);
				}
			})
			
		} else {
			callback(new Error('task doesnot exist'));
		}
	});
}

function remove(taskIdToRemove, callback){
	taskdb.readAll(function(err, tasks){
		var taskToDelete = tasks.find(function(task){
			return task.id === taskIdToRemove;
		}); 


		if (taskToDelete){
			tasks = tasks.filter(function(task){
				return task.id !== taskIdToRemove;
			});
			taskdb.save(tasks, function(err, result){
				callback(err, result);
			});
		} else {
			callback(new Error('task doesnot exist'));
		}
	})
}

module.exports = {
	getAll : getAll,
	addNew : addNew,
	update : update,
	remove : remove
};
