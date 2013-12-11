class Computer
  constructor: (@board) ->
  readSpaces: ->
    @board.spaces

  findBestMove: ->
    return @bestMove if @checkForComputerWin()
    return @bestMove if @checkForBlockPlayerWin()
    return @bestMove if @checkForComputerDoubleThreat()
    return @bestMove if @checkForPlayerDoubleThreat()
    return @bestMove if @checkMiddleAvailability()
    return @bestMove if @checkPlayerOppositeCorner()
    return @bestMove if @getAnyCorner()
    return @bestMove if @getAnyWall()

  checkForComputerWin: ->
    @checkForPossibleWin(@board.secondPlayerToken)

  checkForBlockPlayerWin: ->
    @checkForPossibleWin(@board.firstPlayerToken)

  checkForComputerDoubleThreat: ->
    return @getCornerDoubleThreat() if @checkCornerDoubleThreat(@board.secondPlayerToken)
    return true if @checkWallDoubleThreat(@board.secondPlayerToken)
    false

  checkForPlayerDoubleThreat: ->
    return true if @checkCornerDoubleThreat(@board.firstPlayerToken)
    return true if @checkWallDoubleThreat(@board.firstPlayerToken)
    false

  checkMiddleAvailability: ->
    @getEmpty([4])

  checkPlayerOppositeCorner: ->
    @checkOppositeCorner(@board.firstPlayerToken)

  getAnyCorner: ->
    @getEmpty(@board.cornerSpots)

  getAnyWall: ->
    @getEmpty(@board.wallSpots)

  getEmpty: (spaces) ->
    availableSpaces = @board.getSpaces(spaces, @board.emptyToken)
    if availableSpaces.length > 0
      @getBestMove(availableSpaces)
      return true
    false

  getCornerDoubleThreat: ->
    for edge in [[1,0,3],[5,8,7],[1,2,5],[3,6,7]]
      if @checkSpots(edge, @board.emptyToken)
        console.log(edge)
        console.log(edge[1])
        @getBestMove([edge[1]])
        return true
    false

  checkOppositeCorner: (token) ->
    filledSpaces = @board.getSpaces(@board.cornerSpots, token)
    @checkIfOppositeAvailable(filledSpaces)

  checkIfOppositeAvailable: (spaces) ->
    oppositeSpaces = (@board.oppositeSpots[space] for space in spaces)
    emptySpaces = @board.getSpaces(oppositeSpaces, @board.emptyToken)
    if emptySpaces.length > 0
      @getBestMove(emptySpaces)
      return true
    false

  checkWallDoubleThreat: (token) ->
   return true if @wallDoubleThreatPossible(token)
   false

  wallDoubleThreatPossible: (token) ->
    wallCombos = [[@board.rows[0],@board.columns[0]],
                  [@board.rows[0],@board.columns[2]],
                  [@board.rows[2],@board.columns[0]],
                  [@board.rows[2],@board.columns[2]]]
    for combos in wallCombos
      return true if @occupyBothWalls(combos, token)

  occupyBothWalls: (combos, token) ->
    if @occupyWall(combos[0], token) and @occupyWall(combos[1], token)
      @getBestMove(@intersection(combos[0], combos[1]))
      return true
    false

  intersection: (a, b) ->
    value for value in a when value in b

  occupyWall: (combo, token) ->
    @board.checkSpot(combo[1], token) and @board.getSpaces(combo, @board.emptyToken).length is 2

  checkCornerDoubleThreat: (token) ->
    if @cornerDoubleThreatPossible(token)
      @getBestMove(@board.wallSpots)
      return true
    false

  cornerDoubleThreatPossible: (token) ->
    return true if @firstCornersOccupied(token) and @firstEdgesEmpty()
    return true if @secondCornerOccupied(token) and @secondEdgesEmpty()
    false

  firstCornersOccupied: (token) ->
    @checkSpots([0,8], token)

  secondCornerOccupied: (token) ->
    @checkSpots([2,6], token)

  firstEdgesEmpty: ->
    @checkEdgesEmpty([[1,2,5],[3,6,7]])

  secondEdgesEmpty: ->
    @checkEdgesEmpty([[0,1,3],[5,7,8]])

  checkEdgesEmpty: (edges) ->
    for edge in edges
      return true if @checkSpots(edge, @board.emptyToken)
    false

  checkSpots: (locations, token) ->
    for spot in locations
      return false unless @board.checkSpot(spot, token)
    true

  checkForPossibleWin: (token) ->
    for winCombos in [@board.rows, @board.columns, @board.diagonals]
      for combo in winCombos
        return true if @winIsPossible(combo, token)
    false

  winIsPossible: (combo, token) ->
    if @twoInARow(combo, token) and @isWinnable(combo)
      @getBestMove(combo)
      return true
    false

  getBestMove: (combo) ->
    @bestMove = @board.getSpaces(combo, @board.emptyToken)[0]

  twoInARow: (combo, token) ->
    @board.getSpaces(combo, token).length is 2

  isWinnable: (combo) ->
    @board.getSpaces(combo, @board.emptyToken).length is 1


window.Computer = Computer
