import {BoardCharacters, Goban, Status} from "./Goban";

test("check building a goban board and assert statuses are properly assigned", () => {
 const charBoard: BoardCharacters[][] = [['.', '.', 'o'], ['#', '.', 'o'], ['.', '.', '#']];
 const goban = new Goban(charBoard);

 expect(goban.getStatus(0,0)).toBe(Status.Empty)
 expect(goban.getStatus(1,0)).toBe(Status.Black)
 expect(goban.getStatus(1,2)).toBe(Status.White)
});


test("check most basic isTaken correct in 3x3 board", () => {
 const charBoard: BoardCharacters[][] = [['.', 'o', '.'], ['o', '#', 'o'], ['.', 'o', '.']];
 const goban = new Goban(charBoard);

 expect(goban.isTaken(0,0)).toBe(false)
 expect(goban.isTaken(0,1)).toBe(false)
 expect(goban.isTaken(0,2)).toBe(false)
 expect(goban.isTaken(1,0)).toBe(false)
 expect(goban.isTaken(1,1)).toBe(true)
 expect(goban.isTaken(1,2)).toBe(false)
 expect(goban.isTaken(2,0)).toBe(false)
 expect(goban.isTaken(2,1)).toBe(false)
 expect(goban.isTaken(2,2)).toBe(false)
});


test("check simple shape isTaken correct in 4x4 board", () => {
 const charBoard: BoardCharacters[][] = [['.', 'o', 'o', '.'], ['o', '#', '#', 'o'], ['o', '#', '#', 'o'], ['.', 'o', 'o', '.']];
 const goban = new Goban(charBoard);

 expect(goban.isTaken(0,0)).toBe(false)
 expect(goban.isTaken(0,1)).toBe(false)
 expect(goban.isTaken(0,2)).toBe(false)
 expect(goban.isTaken(0,3)).toBe(false)
 expect(goban.isTaken(1,0)).toBe(false)
 expect(goban.isTaken(1,1)).toBe(true)
 expect(goban.isTaken(1,2)).toBe(true)
 expect(goban.isTaken(1,3)).toBe(false)
 expect(goban.isTaken(2,0)).toBe(false)
 expect(goban.isTaken(2,1)).toBe(true)
 expect(goban.isTaken(2,2)).toBe(true)
 expect(goban.isTaken(2,3)).toBe(false)
 expect(goban.isTaken(3,0)).toBe(false)
 expect(goban.isTaken(3,1)).toBe(false)
 expect(goban.isTaken(3,2)).toBe(false)
 expect(goban.isTaken(3,3)).toBe(false)
});


test("check shape isTaken correct in 5x5 board with shape on edge", () => {
 const charBoard: BoardCharacters[][] = [['.', 'o', 'o', 'o', '#'], ['.', 'o', '#', '#', '#'], ['.', 'o', 'o', '#', '#'], ['.', 'o', 'o', 'o', '#'], ['.', 'o', 'o', 'o', 'o']];
 const goban = new Goban(charBoard);

 expect(goban.isTaken(0,0)).toBe(false)
 expect(goban.isTaken(0,1)).toBe(false)
 expect(goban.isTaken(0,2)).toBe(false)
 expect(goban.isTaken(0,3)).toBe(false)
 expect(goban.isTaken(0,4)).toBe(true)

 expect(goban.isTaken(1,0)).toBe(false)
 expect(goban.isTaken(1,1)).toBe(false)
 expect(goban.isTaken(1,2)).toBe(true)
 expect(goban.isTaken(1,3)).toBe(true)
 expect(goban.isTaken(1,4)).toBe(true)

 expect(goban.isTaken(2,0)).toBe(false)
 expect(goban.isTaken(2,1)).toBe(false)
 expect(goban.isTaken(2,2)).toBe(false)
 expect(goban.isTaken(2,3)).toBe(true)
 expect(goban.isTaken(2,4)).toBe(true)

 expect(goban.isTaken(3,0)).toBe(false)
 expect(goban.isTaken(3,1)).toBe(false)
 expect(goban.isTaken(3,2)).toBe(false)
 expect(goban.isTaken(3,3)).toBe(false)
 expect(goban.isTaken(3,4)).toBe(true)

 expect(goban.isTaken(4,0)).toBe(false)
 expect(goban.isTaken(4,1)).toBe(false)
 expect(goban.isTaken(4,2)).toBe(false)
 expect(goban.isTaken(4,3)).toBe(false)
 expect(goban.isTaken(4,4)).toBe(false)

});
