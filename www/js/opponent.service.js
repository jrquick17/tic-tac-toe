(function() {
    'use strict';

    angular.module('ticTacToe').service(
        'OpponentService',
        OpponentService
    );

    OpponentService.$inject = [
        '$q',
        'TreeService'
    ];

    function OpponentService(
        $q,
        TreeService
    ) {
        var OpponentService = this;

        OpponentService.getTree = getTree;
        function getTree() {
            return OpponentService.tree;
        }
        
        OpponentService.makeMove = makeMove;
        function makeMove(value, cells, difficulty) {
            return $q.resolve().then(
                function() {
                    // if (typeof difficulty === 'undefined' || difficulty === 'easy') {
                    //     return OpponentService.makeEasyMove(value, cells);
                    // } else if (difficulty === 'hard') {
                        return OpponentService.makeHardMove(value, cells);
                    // }
                }
            );
        }

        OpponentService.makeHardMove = makeHardMove;
        function makeHardMove(value, cells) {
            OpponentService.tree = TreeService.getTree(cells, value);

            OpponentService.tree.expand();

            var moves = OpponentService.tree.getMoves();
            var moveCount = moves.length;

            var best = null;
            var bestValue = Number.NEGATIVE_INFINITY;

            for (var i = 0; i < moveCount; i++) {
                var move = moves[i];

                var candidateValue = move.getPoints();
                if (candidateValue > bestValue) {
                    best = move.getWhere();
                    bestValue = move.getPoints();
                }
            }

            return best;
        }

        OpponentService.makeEasyMove = makeEasyMove;
        function makeEasyMove(value, cells) {
            do {
                var random = Math.round(Math.random() * 9);

                if (cells[random] === -1 && cells[random] !== value) {
                    return random;
                }
            } while (true);
        }

        OpponentService.reset = reset;
        function reset() {
            OpponentService.tree = {};
        }
        
        OpponentService.reset();

        return OpponentService;
    }
})();