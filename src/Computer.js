// Generated by CoffeeScript 1.6.2
(function() {
  var Computer;

  Computer = (function() {
    function Computer(computerToken, playerToken) {
      this.computerToken = computerToken;
      this.playerToken = playerToken;
    }

    Computer.prototype.cornerSpots = [0, 2, 6, 8];

    Computer.prototype.wallSpots = [1, 3, 5, 7];

    Computer.prototype.oppositeSpots = [8, 7, 6, 5, 4, 3, 2, 1, 0];

    Computer.prototype.rows = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];

    Computer.prototype.columns = [[0, 3, 6], [1, 4, 7], [2, 5, 8]];

    Computer.prototype.diagonals = [[0, 4, 8], [2, 4, 6]];

    Computer.prototype.gameLogic = function(board) {
      this.board = board;
      if (this.winningLocation()) {
        return this.winningLocation();
      }
      if (this.blockLocation()) {
        return this.blockLocation();
      }
      if (this.blockDoubleThreatLocation()) {
        return this.blockDoubleThreatLocation();
      }
      if (this.playCenterLocation()) {
        return this.playCenterLocation();
      }
      if (this.playOppositeCornerLocation()) {
        return this.playOppositeCornerLocation();
      }
      if (this.playAnyCornerLocation()) {
        return this.playAnyCornerLocation();
      }
      if (this.playWallLocation()) {
        return this.playWallLocation();
      }
    };

    Computer.prototype.winningLocation = function() {
      return this.checkForWin(this.computerToken);
    };

    Computer.prototype.blockLocation = function() {
      return this.checkForWin(this.playerToken);
    };

    Computer.prototype.checkForWin = function(symbol) {
      if (this.check(symbol, this.rows)) {
        return this.check(symbol, this.rows);
      }
      if (this.check(symbol, this.columns)) {
        return this.check(symbol, this.columns);
      }
      if (this.check(symbol, this.diagonals)) {
        return this.check(symbol, this.diagonals);
      }
    };

    Computer.prototype.check = function(symbol, values) {
      var value, _i, _len;

      for (_i = 0, _len = values.length; _i < _len; _i++) {
        value = values[_i];
        if (this.checkWin(symbol, value)) {
          return this.checkWin(symbol, value);
        }
      }
    };

    Computer.prototype.checkWin = function(symbol, list) {
      if (this.checkSpaces(list, symbol).length === 2 && this.checkSpaces(list, " ").length === 1) {
        return this.checkSpaces(list, " ");
      }
    };

    Computer.prototype.blockDoubleThreatLocation = function() {
      if (this.doubleThreatPresent()) {
        return this.checkSpaces(this.wallSpots, " ");
      }
    };

    Computer.prototype.doubleThreatPresent = function() {
      var corners, doubleThreat, spot;

      corners = this.checkSpaces([0, 2], this.playerToken);
      doubleThreat = this.checkSpaces((function() {
        var _i, _len, _results;

        _results = [];
        for (_i = 0, _len = corners.length; _i < _len; _i++) {
          spot = corners[_i];
          _results.push(this.oppositeSpots[spot]);
        }
        return _results;
      }).call(this), this.playerToken);
      if (doubleThreat.length > 0) {
        return true;
      }
    };

    Computer.prototype.playCenterLocation = function() {
      if (this.checkSpaces([4], " ").length > 0) {
        return this.checkSpaces([4], " ");
      }
    };

    Computer.prototype.playOppositeCornerLocation = function() {
      if (this.getUnoccupiedOpposites(this.checkSpaces(this.cornerSpots, this.playerToken)).length > 0) {
        return this.getUnoccupiedOpposites(this.checkSpaces(this.cornerSpots, this.playerToken));
      }
    };

    Computer.prototype.getUnoccupiedOpposites = function(coordinates) {
      var spot;

      return this.checkSpaces((function() {
        var _i, _len, _results;

        _results = [];
        for (_i = 0, _len = coordinates.length; _i < _len; _i++) {
          spot = coordinates[_i];
          _results.push(this.oppositeSpots[spot]);
        }
        return _results;
      }).call(this), " ");
    };

    Computer.prototype.playAnyCornerLocation = function() {
      if (this.checkSpaces(this.cornerSpots, " ").length > 0) {
        return this.checkSpaces(this.cornerSpots, " ");
      }
    };

    Computer.prototype.playWallLocation = function() {
      if (this.checkSpaces(this.wallSpots, " ").length > 0) {
        return this.checkSpaces(this.wallSpots, " ");
      }
    };

    Computer.prototype.checkSpaces = function(coordinates, character) {
      var spot, _i, _len, _results;

      _results = [];
      for (_i = 0, _len = coordinates.length; _i < _len; _i++) {
        spot = coordinates[_i];
        if (this.board[spot] === character) {
          _results.push(spot);
        }
      }
      return _results;
    };

    return Computer;

  })();

  window.Computer = Computer;

}).call(this);