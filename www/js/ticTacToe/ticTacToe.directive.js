(function() {
    'use strict';

    angular.module('ticTacToe').directive(
        'ticTacToe',
        ticTacToe
    );

    function ticTacToe() {
        return {
            controller:   'TicTacToeController',
            controllerAs: 'ctrl',
            restrict:     'E',
            scope:        {},
            template:'<div class="board"><div>{{ ctrl.isUsersTurn ? \'YOUR TURN\' : \'OPPONENT\\\'S TURN\' }} <span data-ng-if="!ctrl.isUsersTurn">(YOUR OPPONENT IS THINKING...)</span><div class="row"><div data-ng-repeat="cell in ctrl.cells track by $index" class="col-4" data-ng-class="{ \'disabled\': !ctrl.isUsersTurn || cell !== -1, \'x-cell\': cell === 0, \'o-cell\': cell === 1 }" data-ng-click="ctrl.select($index)">{{ cell }}</div></div></div></div>'
        };
    }
})();