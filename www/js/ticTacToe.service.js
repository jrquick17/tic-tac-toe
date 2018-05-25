(function() {
    'use strict';

    angular.module('ticTacToe').service(
        'TicTacToeService',
        TicTacToeService
    );

    TicTacToeService.$inject = [];

    function TicTacToeService() {
        var TicTacToeService = this;

        TicTacToeService.getAvailableMoves = getAvailableMoves;
        function getAvailableMoves(cells) {
            var availableMoves = [];

            for (var i = 0; i < 9; i++) {
                if (cells[i] === -1) {
                    availableMoves.push(i);
                }
            }

            return availableMoves;
        }

        TicTacToeService.getWinner = getWinner;
        function getWinner(cells) {
            // Horizontal
            if (cells[0] !== -1 && cells[0] === cells[1] && cells[1] === cells[2]) {
                return cells[0];
            } else if (cells[3] !== -1 && cells[3] === cells[4] && cells[4] === cells[5]) {
                return cells[3];
            } else if (cells[6] !== -1 && cells[6] === cells[7] && cells[7] === cells[8]) {
                return cells[6];
            }

            // Vertical
            if (cells[0] !== -1 && cells[0] === cells[3] && cells[3] === cells[6]) {
                return cells[0];
            } else if (cells[1] !== -1 && cells[1] === cells[4] && cells[4] === cells[7]) {
                return cells[1];
            } else if (cells[2] !== -1 && cells[2] === cells[5] && cells[5] === cells[8]) {
                return cells[2];
            }

            // Diagonal
            if (cells[0] !== -1 && cells[0] === cells[4] && cells[4] === cells[8]) {
                return cells[0];
            } else if (cells[2] !== -1 && cells[2] === cells[4] && cells[4] === cells[6]) {
                return cells[2];
            }

            for (var i = 0; i < 9; i++) {
                if (cells[i] === -1) {
                    return null;
                }
            }

            return -1;
        }

        TicTacToeService.getOtherValue = getOtherValue;
        function getOtherValue(value) {
            return value === 1 ? 0 : 1;
        }

        TicTacToeService.reset = reset;
        function reset() {

        }
        
        TicTacToeService.reset();

        return TicTacToeService;
    }
})();