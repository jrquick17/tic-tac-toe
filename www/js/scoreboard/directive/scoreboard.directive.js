(function() {
    'use strict';

    angular.module('ticTacToe').directive(
        'scoreboard',
        scoreboard
    );

    function scoreboard() {
        return {
            controller:   'ScoreboardController',
            controllerAs: 'ctrl',
            restrict:     'E',
            scope:        {
                losses: '=',
                ties:   '=',
                wins:   '='
            },
            templateUrl:  'scoreboard.html'
        };
    }
})();