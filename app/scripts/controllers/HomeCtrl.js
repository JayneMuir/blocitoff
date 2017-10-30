(function() {
    function HomeCtrl($scope, $firebaseArray) 
    {
        this.taskListTitle = "To Do List";
        
        var ref = blocitoffDB.database().ref();

        var tasks = $firebaseArray(ref);
        
        // make the tasks available in the DOM
        $scope.tasks = tasks;
        
        // add a task
        $scope.addTask = function () {
            var todaysDateTime = new Date();
            var newTask = {};
            newTask.Description = $scope.newTaskDescription;
            newTask.InsertedDate = todaysDateTime.toDateString();
            tasks.$add(newTask).then(function(ref) {
                console.log("added record with description " + newTask.Description);
            });
        };
        
        // remove task
	   $scope.removeTask = function (task) {
            tasks.$remove(task).then(function(ref) {
                console.log("removed record with description " + task.Description);
            });
        };
    }
    angular
        .module('blocitoff')
        .controller('HomeCtrl', ["$scope", "$firebaseArray", HomeCtrl]);
})();