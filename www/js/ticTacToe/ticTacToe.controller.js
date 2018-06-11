(function() {
    'use strict';

    angular.module('ticTacToe').controller(
        'TicTacToeController',
        TicTacToeController
    );

    TicTacToeController.$inject = [
        'MessageService',
        'OpponentService',
        'TicTacToeService'
    ];

    function TicTacToeController(
        MessageService,
        OpponentService,
        TicTacToeService
    ) {
        var TicTacToeController = this;

        TicTacToeController.beginOpponentsTurn = beginOpponentsTurn;
        function beginOpponentsTurn() {
            return OpponentService.makeMove(
                TicTacToeController.opponentValue,
                TicTacToeController.cells
            ).then(
                function(cell) {
                    if (cell !== null) {
                        TicTacToeController.cells[cell] = TicTacToeController.opponentValue;

                        TicTacToeController.switchTurn();
                    }
                }
            );
        }

        TicTacToeController.beginUsersTurn = beginUsersTurn;
        function beginUsersTurn() {
            TicTacToeController.showDialogue(
                false,
                'IT IS YOUR TURN.'
            );
        }

        TicTacToeController.select = select;
        function select(cell) {
            if (TicTacToeController.isGameOver) {
                TicTacToeController.showDialogue(
                    false,
                    'THE GAME IS ALREADY OVER.'
                );
            } else if (TicTacToeController.isUsersTurn) {
                if (TicTacToeController.cells[cell] === -1) {
                    TicTacToeController.cells[cell] = TicTacToeController.userValue;

                    TicTacToeController.switchTurn();
                } else {
                    TicTacToeController.showDialogue(
                        false,
                        'YOU CANNOT GO THERE!'
                    );
                }
            } else {
                TicTacToeController.showDialogue(
                    false,
                    'SIMMER DOWN! IT\'S MY TURN STILL!'
                );
            }
        }

        TicTacToeController.setOrder = setOrder;
        function setOrder() {
            var random = Math.floor(Math.random() * 100);
            if (random % 2 === 0) {
                TicTacToeController.opponentValue = 0;
                TicTacToeController.userValue = 1;
                TicTacToeController.isUsersTurn = true;
            } else {
                TicTacToeController.opponentValue = 1;
                TicTacToeController.userValue = 0;
                TicTacToeController.isUsersTurn = false;
            }
        }

        TicTacToeController.showDialogue = showDialogue;
        function showDialogue(fromUser, message) {
            var selector = fromUser ? '.user' : '.opponent';

            $(selector).attr('data-content', message).popover('show');
        }

        TicTacToeController.start = start;
        function start() {
            TicTacToeController.setOrder();

            if (TicTacToeController.isUsersTurn) {
                TicTacToeController.beginUsersTurn();
            } else {
                TicTacToeController.beginOpponentsTurn();
            }
        }

        TicTacToeController.switchTurn = switchTurn;
        function switchTurn() {
            var winner = TicTacToeService.getWinner(
                TicTacToeController.cells
            );

            if (winner === TicTacToeController.opponentValue) {
                TicTacToeController.isGameOver = true;

                TicTacToeController.showDialogue(
                    false,
                    MessageService.getWinMessage()
                );

                TicTacToeController.losses++;
            } else if (winner === TicTacToeController.userValue) {
                TicTacToeController.isGameOver = true;

                TicTacToeController.showDialogue(
                    false,
                    MessageService.getLossMessage()
                );

                TicTacToeController.wins++;
            } else if (winner === -1) {
                TicTacToeController.isGameOver = true;

                TicTacToeController.showDialogue(
                    false,
                    MessageService.getTieMessage()
                );

                TicTacToeController.ties++;
            } else {
                TicTacToeController.isUsersTurn = !TicTacToeController.isUsersTurn;

                if (TicTacToeController.isUsersTurn) {
                    TicTacToeController.beginUsersTurn();
                } else {
                    TicTacToeController.beginOpponentsTurn();
                }
            }
        }

        TicTacToeController.reset = reset;
        function reset() {
            TicTacToeController.cells = [
                -1, -1, -1,
                -1, -1, -1,
                -1, -1, -1
            ];

            TicTacToeController.isGameOver = false;

            TicTacToeController.opponentValue = 1;

            TicTacToeController.resetStats();

            TicTacToeController.userValue = 0;

            TicTacToeController.isUsersTurn = false;
        }

        TicTacToeController.resetStats = resetStats;
        function resetStats() {
            TicTacToeController.losses = 0;

            TicTacToeController.ties = 0;

            TicTacToeController.wins = 0;
        }

        TicTacToeController.init = init;
        function init() {
            TicTacToeController.reset();
            TicTacToeController.start();
        }

        TicTacToeController.init();
    }
})();