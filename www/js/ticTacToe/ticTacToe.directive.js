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
            template:'<div class="global"><div class="people row"><a class="opponent col-6" tabindex="0" data-content data-placement="right" data-toggle="popover" data-trigger="focus"><img src="img/opponent.png"></a> <a class="user col-6" tabindex="1" data-content data-placement="left" data-toggle="popover" data-trigger="focus"><img src="img/user.png"></a></div><div class="board row"><div data-ng-repeat="cell in ctrl.cells track by $index" class="col-4" data-ng-class="{ \'disabled\': !ctrl.isUsersTurn || cell !== -1, \'x-cell\': cell === 0, \'o-cell\': cell === 1 }" data-ng-click="ctrl.select($index)">{{ cell }}</div></div></div>'
        };
    }
})();