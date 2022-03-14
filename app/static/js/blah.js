/*
-1: mine
 f: flagged empty spot
 F: flagged mine
0-5: number of surrounding mines
None: uncovered spot */

IMG_CODES = {
  "0": "zero",
  "1": "one",
  "2": "two",
  "3": "three",
  "4": "four",
  "5": "five",
  "F": "flag",
  "M": "mine",
  "?": "uncovered"
}
          
function adjusted_board(arr) {
  var forprint_arr, forweb_arr, new_li;
  forprint_arr = [];

  for (var li, _pj_c = 0, _pj_a = arr, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
    li = _pj_a[_pj_c];
    new_li = [];

    for (var elem, _pj_f = 0, _pj_d = li, _pj_e = _pj_d.length; _pj_f < _pj_e; _pj_f += 1) {
      elem = _pj_d[_pj_f];
      if (elem === "blank") {
        new_li.push("?");
      } else {
        if (elem === "f") {
          new_li.push("F");
        } else {
          if (elem === -1) {
            new_li.push(USER === "admin" ? "M" : "?");
          } else {
            new_li.push(elem.toString());
          }
        }
      }
    }

    forprint_arr.push(new_li);
  }
  return forprint_arr;
}

function create_board(width, height) {
  var gameboard;
  gameboard = [];

  for (var i = 0, _pj_a = height; i < _pj_a; i += 1) {
    tmp = [];
    for (var j = 0; j < width; j++) {
        tmp.push("blank");
    }
    gameboard.push(tmp);
  }
  return gameboard;
}

  
function bury_mines(gameboard, n, x, y) {
  var CurrentRow, checkdown, checkleft, checkright, checkup, mine_column, mine_row, minenum;
  minenum = 0;

  while (minenum < n) {
    mine_row = Math.floor(Math.random() * (gameboard.length - 1));
    mine_column = Math.floor(Math.random() * (gameboard.length - 1));
    CurrentRow = gameboard[mine_row];

    if (!(CurrentRow[mine_column] === -1)) {
      CurrentRow[mine_column] = -1;
      minenum += 1;
      checkleft = 0 < x;
      checkup = 0 < y;
      checkright = x < gameboard[0].length - 1;
      checkdown = y < gameboard.length - 1;

      if (gameboard[y][x] === -1) {
        gameboard[y][x] = "blank";
        minenum--;
      }

      if (checkleft && checkdown && gameboard[y + 1][x - 1] === -1 || checkleft && checkdown && gameboard[y + 1][x - 1] === "F") {
        gameboard[y + 1][x - 1] = "blank";
        minenum--;
      }

      if (checkleft && gameboard[y][x - 1] === -1 || checkleft && gameboard[y][x - 1] === "F") {
        gameboard[y][x - 1] = "blank";
        minenum--;
      }

      if (checkup && checkleft && gameboard[y - 1][x - 1] === -1 || checkup && checkleft && gameboard[y - 1][x - 1] === "F") {
        gameboard[y - 1][x - 1] = "blank";
        minenum--;
      }

      if (checkdown && gameboard[y + 1][x] === -1 || checkdown && gameboard[y + 1][x] === "F") {
        gameboard[y + 1][x] = "blank";
        minenum--;
      }

      if (checkup && gameboard[y - 1][x] === -1 || checkup && gameboard[y - 1][x] === "F") {
        gameboard[y - 1][x] = "blank";
        minenum--;
      }

      if (checkup && checkright && gameboard[y - 1][x + 1] === -1 || checkup && checkright && gameboard[y - 1][x + 1] === "F") {
        gameboard[y - 1][x + 1] = "blank";
        minenum--;
      }

      if (checkright && gameboard[y][x + 1] === -1 || checkright && gameboard[y][x + 1] === "F") {
        gameboard[y][x + 1] = "blank";
        minenum--;
      }

      if (checkdown && checkright && gameboard[y + 1][x + 1] === -1 || checkdown && checkright && gameboard[y + 1][x + 1] === "F") {
        gameboard[y + 1][x + 1] = "blank";
        minenum--;
      }
    }
  }

  return gameboard;
}


function get_mine_count(gameboard, x, y) {
  var checkdown, checkleft, checkright, checkup, minecount;
  minecount = 0;
  checkleft = 0 < x;
  checkup = 0 < y;
  checkright = x < gameboard[0].length - 1;
  checkdown = y < gameboard.length - 1;

  if (checkleft && checkdown && gameboard[y + 1][x - 1] === -1 || checkleft && checkdown && gameboard[y + 1][x - 1] === "F") {
    minecount += 1;
  }

  if (checkleft && gameboard[y][x - 1] === -1 || checkleft && gameboard[y][x - 1] === "F") {
    minecount += 1;
  }

  if (checkup && checkleft && gameboard[y - 1][x - 1] === -1 || checkup && checkleft && gameboard[y - 1][x - 1] === "F") {
    minecount += 1;
  }

  if (checkdown && gameboard[y + 1][x] === -1 || checkdown && gameboard[y + 1][x] === "F") {
    minecount += 1;
  }

  if (checkup && gameboard[y - 1][x] === -1 || checkup && gameboard[y - 1][x] === "F") {
    minecount += 1;
  }

  if (checkup && checkright && gameboard[y - 1][x + 1] === -1 || checkup && checkright && gameboard[y - 1][x + 1] === "F") {
    minecount += 1;
  }

  if (checkright && gameboard[y][x + 1] === -1 || checkright && gameboard[y][x + 1] === "F") {
    minecount += 1;
  }

  if (checkdown && checkright && gameboard[y + 1][x + 1] === -1 || checkdown && checkright && gameboard[y + 1][x + 1] === "F") {
    minecount += 1;
  }

  return minecount;
}

function uncover_board(gameboard, x, y) {
  var checkdown, checkleft, checkright, checkup;

  if (gameboard[y][x] === "blank") {
    if (get_mine_count(gameboard, x, y) === 0) {
      checkleft = 0 < x;
      checkup = 0 < y;
      checkright = x < gameboard[0].length - 1;
      checkdown = y < gameboard.length - 1;
      gameboard[y][x] = 0;

      if (checkleft && checkdown) {
        uncover_board(gameboard, x - 1, y + 1);
      }

      if (checkleft) {
        uncover_board(gameboard, x - 1, y);
      }

      if (checkup && checkleft) {
        uncover_board(gameboard, x - 1, y - 1);
      }

      if (checkdown) {
        uncover_board(gameboard, x, y + 1);
      }

      if (checkup) {
        uncover_board(gameboard, x, y - 1);
      }

      if (checkup && checkright) {
        uncover_board(gameboard, x + 1, y - 1);
      }

      if (checkright) {
        uncover_board(gameboard, x + 1, y);
      }

      if (checkdown && checkright) {
        uncover_board(gameboard, x + 1, y + 1);
      }
    } else {
      gameboard[y][x] = get_mine_count(gameboard, x, y);
    }
  }
}

var gameboard = create_board(9, 9);
var USER = "norm"
var MODE = "dark"
var flagged_mines = 0;
var unflagged_mines = [];
var original = {};
var gameover = false;
var first_uncover = true;

function myprint(arr) {
  for (let i = 0; i < arr.length; i++) {
      console.log(arr[i].join(" "))
  } 
}

function Flag(x, y) {
  if (gameboard[y][x] !== "f" && gameboard[y][x] !== "F") {
    original[[x, y]] = gameboard[y][x];

    if (gameboard[y][x] === -1) {
      gameboard[y][x] = "F";
      flagged_mines += 1;
    } else {
      gameboard[y][x] = "f";
    }
  } else {
    unflagged_mines.append(y);
    gameboard[y][x] = original[[x, y]];
  }

  return adjusted_board(gameboard);
}


function uncover(x, y) {
var Cell;
Cell = gameboard[y][x];

if (Cell === -1) {
  console.log("game over");
  return [true, adjusted_board(gameboard)];
} else {
  uncover_board(gameboard, x, y);
  return [false, adjusted_board(gameboard)];
}
}

function run() {
  var choice, gui_board, x, y;
  myprint(adjusted_board(gameboard));

  x = 0;
  y = 0;
  choice = "uncover"
  
  if (choice === "uncover") {
      if (first_uncover) {
        gameboard = bury_mines(gameboard, 10, x, y);
        first_uncover = false;
      }
  
      [gameover, gui_board] = uncover(x, y);
  } else {
      new Flag(x, y);
  }
  
  if (flagged_mines === 10) {
      console.log("yay");
      gameover = true;
  }
  
  myprint(gui_board);
}

run()