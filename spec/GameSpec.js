// Generated by CoffeeScript 1.6.2
(function() {
  describe("Game", function() {
    var game, player;

    player = game = void 0;
    beforeEach(function() {
      player = new Player;
      return game = new Game(player);
    });
    describe("New Game", function() {
      return it("board should be blank when game starts", function() {
        var position, _i, _len, _ref, _results;

        _ref = game.board;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          position = _ref[_i];
          _results.push(expect(position === " ").toBeTruthy());
        }
        return _results;
      });
    });
    return describe("Taking a turn", function() {
      return it("should change position to 'x' when first player selects a board location", function() {
        game.playerMove(1);
        return expect(game.checkLocation(1)).toEqual("X");
      });
    });
  });

}).call(this);
