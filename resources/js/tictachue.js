var TicTacJoe = TicTacJoe || {};


TicTacJoe.Game = (function() {
  var _gameBoard = [[null,null,null],[null,null,null],[null,null,null]], $logDomElement, $boardDomElement, turnNumber;

  function _renderBoard () {
    var xcounter = 0;
    var ycounter = 0;

    $boardDomElement.html('');
    $logDomElement.html('');

    for (var i = 0; i < 9; i++) {
      $boardDomElement.append('<div class="square col-xs-4" data-x = "' + xcounter + '" data-y = "' + ycounter + '"></div>');
      xcounter++;
      if (xcounter === 3) {
        $boardDomElement.append('</div>');
        xcounter = 0;
        ycounter++;
      }
    }
  }

  function _init (boardDomElement, logDomElement) {
    $boardDomElement = boardDomElement;
    $logDomElement = logDomElement;
    _gameBoard = [[0,0,0],[0,0,0],[0,0,0]];
    _renderBoard();
  }


  function _getDomEl (xcoord,ycoord) {
    var tempString = '.square data-x ="' +xcoord + '" data-y ="'+ycoord+'"';
    newDom = $(tempString);
    return  tempString;
  }


  function _setBoard (ycoord, xcoord, player, domEl) {
    if(domEl){
      _addOwner(domEl,player);
    } else {
      var newDomEl = _getDomEl(xcoord,ycoord);
      _addOwner(newDomEl, player);
    }

   _gameBoard[ycoord][xcoord] = player;

  }


  function _getBoard () {
    return _gameBoard;
  }

  function _addOwner (domEl,player) {
    // body...//If it's player one, add x, else give it o
    if (domEl) {
      if (player === 'X'){
        $(domEl).addClass('x');
      } else {
        $(domEl).addClass('o');
      }
    } else {}
  }

  function _checkBoard (ycoord, xcoord) {
    if (_gameBoard[ycoord][xcoord] === 0) {
      return true;
    } else {
      return false;
    }
  }

  function _check_diags (player) {
    if (_gameBoard[0][0] ===player && _gameBoard[1][1] === player && _gameBoard[2][2]===player) {
      return true;
    } else if (_gameBoard[0][2] ===player && _gameBoard[1][1] === player && _gameBoard[2][0]===player) {
      return true;
    }
    else {
      return false;
    }
  }

  function _check_rows (player) {

    if(_gameBoard[0][0] === player && _gameBoard[0][1] ===player && _gameBoard[0][2]===player) {
      return true;
    } else if (_gameBoard[1][0] === player && _gameBoard[1][1] ===player && _gameBoard[1][2]===player) {
      return true;
    } else if (_gameBoard[2][0] === player && _gameBoard[2][1] ===player && _gameBoard[2][2]===player) {
      return true;
    } else {
      return false;
    }
  }

  function _check_columns (player) {
    if(_gameBoard[0][0] === player && _gameBoard[1][0] ===player && _gameBoard[2][0]===player) {
      return true;
    } else if (_gameBoard[0][1] === player && _gameBoard[1][1] ===player && _gameBoard[2][1]===player) {
      return true;
    } else if (_gameBoard[0][2] === player && _gameBoard[1][2] ===player && _gameBoard[2][2]===player) {
      return true;
    } else {
      return false;
    }
  }

  function _addPoint (player) {
    var playerDiv = ("#p"+player+"-score");
    var oldScore = parseInt($(playerDiv).html());
    $(playerDiv).html(oldScore+=1);
  }

  function _testWin (player){
    if( _check_rows(player) || _check_columns(player) || _check_diags(player)) {
      return true;
    } else {
      return false;
    }

  }

  function _victory (player) {
    if (player) {
      _addPoint(player);
      $('.modal-content p').html("Player " + player + " has emerged victorious, gaining them 1 victory point");
    } else {
      $('.modal-content p').html("Game Over: Resulted in Draw");
    }
      $('.bs-example-modal-sm').modal('show');
      $('button:hidden').toggleClass('hidden');
  }

  return {
    init: _init,
    renderBoard: _renderBoard,
    gameBoard: _gameBoard,
    testWinner: _testWin,
    setBoard: _setBoard,
    checkBoard: _checkBoard,
    getBoard: _getBoard,
    addVictory: _victory
  };
}) ();


// Two-dimensional array
// given a  board, is this state valid?
// one-dimensional - 0x+3y
// two-dimensional - x and $apply
// var board = new Board();
// b.getSquareAt(x,y);







