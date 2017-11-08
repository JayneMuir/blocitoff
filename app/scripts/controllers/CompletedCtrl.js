(function() {
    function CompletedCtrl($scope, FirebaseService)
    {
        this.taskListTitle = "Task Archive";

        FirebaseService.load();
        this.tasks = FirebaseService.getTasks();
        $scope.tasks = this.tasks;
    }
    angular
        .module('blocitoff')
        .controller('CompletedCtrl', ["$scope", "FirebaseService", CompletedCtrl]);
})();

