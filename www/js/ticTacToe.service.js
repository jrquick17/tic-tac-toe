(function() {
    'use strict';

    angular.module('ticTacToe').service(
        'TicTacToeService',
        TicTacToeService
    );

    TicTacToeService.$inject = [
        '$q'
    ];

    function TicTacToeService(
        $q
    ) {
        var TicTacToeService = this;

        TicTacToeService.getWinner = getWinner;
        function getWinner(cells) {
            return $q.resolve().then(
                function() {
                    // Horizontal
                    if (cells[0] === cells[1] && cells[1] === cells[2]) {
                        return cells[0];
                    } else if (cells[3] === cells[4] && cells[4] === cells[5]) {
                        return cells[3];
                    } else if (cells[6] === cells[7] && cells[7] === cells[8]) {
                        return cells[6];
                    }

                    // Vertical
                    if (cells[0] === cells[3] && cells[3] === cells[6]) {
                        return cells[0];
                    } else if (cells[1] === cells[4] && cells[4] === cells[7]) {
                        return cells[1];
                    } else if (cells[2] === cells[5] && cells[5] === cells[8]) {
                        return cells[2];
                    }

                    // Diagonal
                    if (cells[0] === cells[4] && cells[4] === cells[8]) {
                        return cells[0];
                    } else if (cells[2] === cells[4] && cells[4] === cells[6]) {
                        return cells[2];
                    }

                    return null;
                }
            );
        }
        
        TicTacToeService.makeMove = makeMove;
        function makeMove(value, cells) {
            return $q.resolve().then(
                function() {
                    for (var i = 0; i < 9; i++) {
                        if (cells[i] === -1 && cells[i] !== value) {
                            return i;
                        }
                    }

                    return null;
                }
            );
        }

        TicTacToeService.reset = reset;
        function reset() {

        }
        
        TicTacToeService.reset();

        return TicTacToeService;
    }
})();