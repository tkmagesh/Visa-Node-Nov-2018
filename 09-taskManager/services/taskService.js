var taskdb = require('./taskdb');

function getAll(){
	return taskdb.readAll();
}

function addNew(newTaskName){
	return taskdb
		.readAll()
		.then(function(tasks){
			var newTaskId = tasks.reduce(function(result, task){
				return result > task.id ? result : task.id;
			}, 0) + 1;
			var newTask = {
				id : newTaskId,
				name : newTaskName
			};
			tasks.push(newTask);
			return taskdb
				.save(tasks)
				.then(function(){
					return newTask;
				});
		})
}

/*function update(taskIdToUpdate, updatedTask){
	return taskdb.readAll()
		.then(function(tasks){
			var taskToUpdate = tasks.find(function(task){
				return task.id === taskIdToUpdate;
			});
			if (!taskToUpdate){
				throw new Error('task doesnot exist');
			}
			tasks = tasks.map(function(task){
				return task.id === taskIdToUpdate ? updatedTask : task;
			});
			return taskdb
				.save(tasks)
				.then(function(result){
					return updatedTask;
				});
		});

}*/

function update(taskIdToUpdate, updatedTask){
	return taskdb
		.readAll()
		.then(function(tasks){
			var taskToUpdate = tasks.find(function(task){
				return task.id === taskIdToUpdate;
			});
			if (!taskToUpdate){
				throw new Error('task doesnot exist');
			}
			return {
				tasks : tasks, 
				taskToUpdate : taskToUpdate
			};
		})
		.then(function(result){
			var tasks = result.tasks,
				taskToUpdate = result.taskToUpdate;
			tasks = tasks.map(function(task){
				return task.id === taskIdToUpdate ? updatedTask : task;
			});
			return taskdb
				.save(tasks)
				.then(function(result){
					return updatedTask;
				});
		});

}

function remove(taskIdToRemove, callback){
	return taskdb.readAll()
		.then(function(tasks){
			var taskToDelete = tasks.find(function(task){
				return task.id === taskIdToRemove;
			}); 

			if (!taskToDelete){
				throw new Error('task doesnot exist')
			}
			tasks = tasks.filter(function(task){
				return task.id !== taskIdToRemove;
			});
			return taskdb.save(tasks);
		});
}

module.exports = {
	getAll : getAll,
	addNew : addNew,
	update : update,
	remove : remove
};
