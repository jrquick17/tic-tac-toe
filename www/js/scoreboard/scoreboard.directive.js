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
                isGameOver: '=',
                losses:     '=',
                ties:       '=',
                wins:       '='
            },
            template:'<div class="row"><div class="col text-center animated jackInTheBox" data-ng-class="{ \'animated flip\': ctrl.isGameOver && ctrl.lastResult === true }"><h3>WINS</h3><p>{{ ctrl.wins }}</p></div><div class="col text-center animated jackInTheBox" data-ng-class="{ \'animated flip\': ctrl.isGameOver && ctrl.lastResult === null }"><h3>TIES</h3><p>{{ ctrl.ties }}</p></div><div class="col text-center animated jackInTheBox" data-ng-class="{ \'animated flip\': ctrl.isGameOver && ctrl.lastResult === false }"><h3>LOSSES</h3><p>{{ ctrl.losses }}</p></div></div>'
        };
    }
})();