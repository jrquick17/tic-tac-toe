(function() {
    'use strict';

    angular.module('ticTacToe').service(
        'MoveService',
        MoveService
    );

    MoveService.$inject = [];

    function MoveService() {
        var MoveService = this;

        function Move(where, points) {
            var Move = this;

            Move.points = points;
            Move.where = where;

            Move.getPoints = function() {
                return this.points;
            };

            Move.getWhere = function() {
                return this.where;
            };
        }

        MoveService.getMove = getMove;
        function getMove(where, points) {
            return new Move(where, points);
        }

        MoveService.reset = reset;
        function reset() {

        }
        
        MoveService.reset();

        return MoveService;
    }
})();