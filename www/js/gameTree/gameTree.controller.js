(function() {
    'use strict';

    angular.module('ticTacToe').controller(
        'GameTreeController',
        GameTreeController
    );

    GameTreeController.$inject = [
        'OpponentService',
        '$scope'
    ];

    function GameTreeController(
        OpponentService,
        $scope
    ) {
        var GameTreeController = this;

        $scope.$watch(
            function() {
                return OpponentService.getTree();
            },
            function(tree) {
                GameTreeController.tree = tree;
            }
        );

        GameTreeController.reset = reset;
        function reset() {

        }

        GameTreeController.init = init;
        function init() {
            GameTreeController.reset();
        }

        GameTreeController.init();
    }
})();