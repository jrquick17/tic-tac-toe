(function() {
    'use strict';

    angular.module('ticTacToe', []);
})();
(function() {
    'use strict';

    angular.module('ticTacToe', []);
})();
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
(function() {
    'use strict';

    angular.module('ticTacToe').service(
        'NodeService',
        NodeService
    );

    NodeService.$inject = [
        'TicTacToeService'
    ];

    function NodeService(
        TicTacToeService
    ) {
        var NodeService = this;

        function Node(cells, value, move, parent) {
            var Node = this;

            Node.children = [];
            Node.move = typeof move === 'undefined' ? null : move;
            Node.parent = typeof parent === 'undefined' ? null : parent;
            Node.cells = cells;
            Node.value = value;

            Node.expand = function() {
                var availableMoves = TicTacToeService.getAvailableMoves(
                    this.cells
                );

                var childrenValue = TicTacToeService.getOtherValue(this.value);

                var numberOfAvailableMoves = availableMoves.length;

                for (var i = 0; i < numberOfAvailableMoves; i++) {
                    var move = availableMoves[i];

                    var tempCells = angular.copy(this.cells);
                    tempCells[move] = childrenValue;

                    var newChild = NodeService.getNode(
                        tempCells,
                        childrenValue,
                        move,
                        this
                    );

                    this.children.push(newChild);
                }

                var childCount = this.children.length;

                for (var j = 0; j < childCount; j++) {
                    var winner = TicTacToeService.getWinner(
                        this.children[j].getCells()
                    );

                    if (winner === null) {
                        this.children[j].expand();
                    }
                }
            };

            Node.getCells = function() {
                return this.cells;
            };

            Node.getMove = function() {
                return this.move;
            };

            Node.getPoints = function(value) {
                var points = 0;

                var winner = TicTacToeService.getWinner(
                    this.getCells()
                );

                if (winner !== null) {
                    if (winner === value) {
                        points = 1;
                    } else if (winner === TicTacToeService.getOtherValue(value)) {
                        points = -1;
                    } else {
                        points = 0;
                    }

                    return points;
                }

                var childCount = this.children.length;
                for (var i = 0; i < childCount; i++) {
                    var child = this.children[i];

                    points += child.getPoints(value);
                }

                return points;
            };
        }

        NodeService.getNode = getNode;
        function getNode(cells, value, move, parent) {
            return new Node(cells, value, move, parent);
        }

        NodeService.reset = reset;
        function reset() {

        }
        
        NodeService.reset();

        return NodeService;
    }
})();
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
            var tree = TreeService.getTree(cells, value);

            tree.expand();

            var moves = tree.getMoves();
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

        }
        
        OpponentService.reset();

        return OpponentService;
    }
})();
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
(function() {
    'use strict';

    angular.module('ticTacToe').service(
        'TreeService',
        TreeService
    );

    TreeService.$inject = [
        'MoveService',
        'NodeService'
    ];

    function TreeService(
        MoveService,
        NodeService
    ) {
        var TreeService = this;

        function Tree(cells, value) {
            var Tree = this;

            Tree.parentNode = NodeService.getNode(cells, value);

            Tree.expand = function() {
                Tree.parentNode.expand();
            };
            
            Tree.getMoves = function() {
                var moves = [];
                
                var childCount = this.parentNode.children.length;
                
                for (var i = 0; i < childCount; i++) {
                    var child = this.parentNode.children[i];
                    
                    var points = child.getPoints(
                        this.parentNode.value
                    );
                    
                    var move = MoveService.getMove(
                        child.getMove(),
                        points
                    );
                    
                    moves.push(move);
                }

                return moves;
            };
        }

        TreeService.getTree = getTree;
        function getTree(cells, value) {
            return new Tree(cells, value);
        }

        TreeService.reset = reset;
        function reset() {

        }
        
        TreeService.reset();

        return TreeService;
    }
})();
(function() {
    'use strict';

    angular.module('ticTacToe').controller(
        'TicTacToeController',
        TicTacToeController
    );

    TicTacToeController.$inject = [
        'OpponentService',
        'TicTacToeService'
    ];

    function TicTacToeController(
        OpponentService,
        TicTacToeService
    ) {
        var TicTacToeController = this;

        TicTacToeController.beginOpponentsTurn = beginOpponentsTurn;
        function beginOpponentsTurn() {
            return OpponentService.makeMove(
                TicTacToeController.opponenentValue,
                TicTacToeController.cells
            ).then(
                function(cell) {
                    if (cell !== null) {
                        TicTacToeController.cells[cell] = TicTacToeController.opponenentValue;

                        TicTacToeController.switchTurn();
                    }
                }
            );
        }

        TicTacToeController.beginUsersTurn = beginUsersTurn;
        function beginUsersTurn() {
            TicTacToeController.showMessage(
                false,
                'IT IS YOUR TURN.'
            );
        }

        TicTacToeController.select = select;
        function select(cell) {
            if (TicTacToeController.isGameOver) {
                TicTacToeController.showMessage(
                    false,
                    'THE GAME IS ALREADY OVER.'
                );
            } else if (TicTacToeController.isUsersTurn) {
                if (TicTacToeController.cells[cell] === -1) {
                    TicTacToeController.cells[cell] = TicTacToeController.userValue;

                    TicTacToeController.switchTurn();
                } else {
                    TicTacToeController.showMessage(
                        false,
                        'YOU CANNOT GO THERE!'
                    );
                }
            } else {
                TicTacToeController.showMessage(
                    false,
                    'SIMMER DOWN! IT\'S MY TURN STILL!'
                );
            }
        }

        TicTacToeController.setOrder = setOrder;
        function setOrder() {
            var random = Math.floor(Math.random() * 100);
            if (random % 2 === 0) {
                TicTacToeController.opponenentValue = 0;
                TicTacToeController.userValue = 1;
                TicTacToeController.isUsersTurn = true;
            } else {
                TicTacToeController.opponenentValue = 1;
                TicTacToeController.userValue = 0;
                TicTacToeController.isUsersTurn = false;
            }
        }

        TicTacToeController.showMessage = showMessage;
        function showMessage(fromUser, message) {
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

            if (winner === TicTacToeController.opponenentValue) {
                TicTacToeController.isGameOver = true;

                TicTacToeController.showMessage(
                    false,
                    'HAHA LOSER.'
                );
            } else if (winner === TicTacToeController.userValue) {
                TicTacToeController.isGameOver = true;

                TicTacToeController.showMessage(
                    false,
                    'GOOD JOB.'
                );
            } else if (winner === -1) {
                TicTacToeController.isGameOver = true;

                TicTacToeController.showMessage(
                    false,
                    'WE TIED.'
                );

                TicTacToeController.showMessage(
                    true,
                    'WE TIED.'
                );
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

            TicTacToeController.opponenentValue = 1;

            TicTacToeController.stats = false;

            TicTacToeController.userValue = 0;

            TicTacToeController.isUsersTurn = false;
        }

        TicTacToeController.init = init;
        function init() {
            TicTacToeController.reset();
            TicTacToeController.start();
        }

        TicTacToeController.init();
    }
})();
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
            template:'<div class="global"><div class="players row"><a class="opponent col-6" tabindex="0" data-content data-placement="right" data-toggle="popover" data-trigger="focus"><img src="img/opponent.png"></a> <a class="user col-6" tabindex="1" data-content data-placement="left" data-toggle="popover" data-trigger="focus"><img src="img/user.png"></a></div><div class="board row"><div data-ng-repeat="cell in ctrl.cells track by $index" class="col-4 cell" data-ng-class="{ \'empty-cell\': cell === -1, \'opponent-x-cell\': cell === 0 && ctrl.opponenentValue === 0, \'opponent-o-cell\': cell === 1 && ctrl.opponenentValue === 1, \'user-x-cell\': cell === 0 && ctrl.userValue === 0, \'user-o-cell\': cell === 1 && ctrl.userValue === 1 }" data-ng-click="ctrl.select($index)"></div></div></div>'
        };
    }
})();