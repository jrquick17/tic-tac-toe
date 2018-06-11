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
            template:'<div class="row"><div class="col text-center"><h3>WINS</h3><p>{{ ctrl.wins }}</p></div><div class="col text-center"><h3>LOSSES</h3><p>{{ ctrl.losses }}</p></div><div class="col text-center"><h3>TIES</h3><p>{{ ctrl.ties }}</p></div></div>'
        };
    }
})();