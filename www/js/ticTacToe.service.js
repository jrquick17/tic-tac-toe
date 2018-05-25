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
            return $q.resolve().then(
                function() {
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
            );
        }
        
        TicTacToeService.makeMove = makeMove;
        function makeMove(value, cells, difficulty) {
            return $q.resolve().then(
                function() {
                    // if (typeof difficulty === 'undefined' || difficulty === 'easy') {
                    //     return TicTacToeService.makeEasyMove(value, cells);
                    // } else if (difficulty === 'hard') {
                        return TicTacToeService.makeHardMove(value, cells);
                    // }
                }
            );
        }

        TicTacToeService.makeHardMove = makeHardMove;
        function makeHardMove(value, cells) {
            var parentNode = {
                move:   null,
                parent: null,
                points: null,
                cells:  cells,
                value:  value
            };

            var tree = [
                parentNode
            ];

            TicTacToeService.expandTree(tree);
        }

        TicTacToeService.getChildren = getChildren;
        function getChildren(node) {
            var availableMoves = TicTacToeService.getAvailableMoves(node.cells);
            var numberOfAvailableMoves = availableMoves.length;

            var value = TicTacToeService.getOtherValue(node.value);

            for (var i = 0; i < numberOfAvailableMoves; i++) {
                var move = availableMoves[i];

                var tempCells = angular.copy(node.cells);
                tempCells[move] = value;

                var points = 0;

                var winner = TicTacToeService.getWinner(tempCells);
                if (winner === value || winner === -1) {
                    points = 1;
                }

                return {
                    children: [],
                    move:     move,
                    parent:   node,
                    points:   points,
                    cells:    tempCells,
                    value:    value
                };
            }
        }

        TicTacToeService.getOtherValue = getOtherValue;
        function getOtherValue(value) {
            return value === 1 ? 0 : 1;
        }

        TicTacToeService.expandTree = buildTree;
        function buildTree(tree) {
            var treeLength = tree.length;

            for (var j = 0; j < treeLength; j++) {
                var node = tree[j];

                var children = node.children;
                var childrenLength = children.length;

                for (var k = 0; k < childrenLength; k++) {
                    var childNode = node.children[k];

                    childNode.children = TicTacToeService.getChildren(childNode);
                }
            }

            return tree;
        }

        TicTacToeService.makeEasyMove = makeEasyMove;
        function makeEasyMove(value, cells) {
            do {
                var random = Math.round(Math.random() * 9);

                if (cells[random] === -1 && cells[random] !== value) {
                    return random;
                }
            } while (true);
        }

        TicTacToeService.reset = reset;
        function reset() {

        }
        
        TicTacToeService.reset();

        return TicTacToeService;
    }
})();