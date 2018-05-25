(function() {
    'use strict';

    angular.module('ticTacToe').directive(
        'gameTree',
        gameTree
    );

    function gameTree() {
        return {
            controller:   'GameTreeController',
            controllerAs: 'ctrl',
            restrict:     'E',
            scope:        {},
            templateUrl:  'gameTree.html'
        };
    }
})();