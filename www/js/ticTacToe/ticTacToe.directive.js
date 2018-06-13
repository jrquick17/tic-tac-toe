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
            template:'<div class="global"><div class="players row"><a class="user col-6 animated bounceInLeft" tabindex="0" data-content data-placement="right" data-toggle="popover" data-trigger="focus"><img src="img/user.png"></a> <a class="opponent col-6 animated bounceInRight" tabindex="1" data-content data-placement="left" data-toggle="popover" data-trigger="focus"><img src="img/opponent.png"></a></div><scoreboard is-game-over="ctrl.isGameOver" losses="ctrl.losses" ties="ctrl.ties" wins="ctrl.wins"></scoreboard><div data-ng-if="ctrl.isGameOver" class="row animated fadeInDown"><button class="btn btn-primary btn-lg btn-block" data-ng-click="ctrl.restart()">PLAY AGAIN</button></div><board cells="ctrl.cells" on-click="ctrl.select" user-value="ctrl.userValue"></board></div>'
        };
    }
})();