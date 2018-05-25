(function() {
    'use strict';

    angular.module('ticTacToe').directive(
        'board',
        board
    );

    function board() {
        return {
            controller:   'BoardController',
            controllerAs: 'ctrl',
            restrict:     'E',
            scope:        {
                cells:     '=',
                onClick:   '=',
                userValue: '='
            },
            templateUrl:  'board.html'
        };
    }
})();