var tasks = [
	{id : 1, name : 'Watch Avengers'},
	{id : 2, name : 'Fix THAT bug!'}
];

function getAll(){
	return tasks.slice(0);
}

function addNew(newTaskName){
	var newTaskId = tasks.reduce(function(result, task){
		return result > task.id ? result : task.id;
	}, 0) + 1;
	var newTask = {
		id : newTaskId,
		name : newTaskName
	};
	tasks.push(newTask);
	return newTask;
}

function update(taskIdToUpdate, updatedTask){
	var taskToUpdate = tasks.find(function(task){
		return task.id === taskIdToUpdate;
	});
	if (taskToUpdate){
		tasks = tasks.map(function(task){
			return task.id === taskIdToUpdate ? updatedTask : task;
		});
		return updatedTask;
	} else {
		throw new Error('task doesnot exist');
	}
}

function remove(taskIdToRemove){
	var taskToDelete = tasks.find(function(task){
		return task.id === taskIdToRemove;
	}); 
	console.log(taskToDelete);

	if (taskToDelete){
		tasks = tasks.filter(function(task){
			return task.id !== taskIdToRemove;
		});
		return {};
	} else {
		throw new Error('task doesnot exist');
	}
}

module.exports = {
	getAll : getAll,
	addNew : addNew,
	update : update,
	remove : remove
};
