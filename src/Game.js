// Generated by CoffeeScript 1.6.2
(function() {
  var Game;

  Game = (function() {
    function Game(player) {
      this.player = player;
      this.board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
      this.turn = "player";
    }

    Game.prototype.playerMove = function(position) {
      if (this.checkLocation(position) === " ") {
        this.board[position] = "X";
        return this.changeTurn();
      }
    };

    Game.prototype.checkLocation = function(position) {
      return this.board[position];
    };

    Game.prototype.computerMove = function() {
      var position;

      position = this.computerLogic();
      if (this.checkLocation(position) === " ") {
        this.board[position] = "O";
        return this.changeTurn();
      }
    };

    Game.prototype.changeTurn = function() {
      return this.turn = this.turn === "player" ? "computer" : "player";
    };

    Game.prototype.computerLogic = function() {};

    return Game;

  })();

  window.Game = Game;

}).call(this);
