export enum Status {
    White,
    Black,
    Empty,
    Out
}

export type BoardCharacters = '.' | 'o' | '#'
type GobanBoard = Status[][]
type Key = string;

export class Goban {
    goban: GobanBoard

    // pass in a board which in a '. . o . #' row format, convert it to goban type

    constructor(gobanBoard: BoardCharacters[][]) {
        let newGoban: Status[][] = gobanBoard.map((row) => {
             return row.map((boardCharacter) => {
                if(boardCharacter === '.') return Status.Empty
                else if (boardCharacter === 'o') return Status.White
                else if (boardCharacter === '#') return Status.Black
                 else return Status.Out
            })
        })
        this.goban = newGoban;
    }

    getStatus(row: number, col: number): Status {
        if(!this.goban.length || row < 0 || col < 0 || col >= this.goban.length || row >= this.goban[0].length){
            return Status.Out
        }
        else return this.goban[row][col]
    }

    getKey(row: number, col: number): Key {
        return `${row}:${col}`
    }

    // Instead of checking if each shape is fully surrounded by opposite color statuses, or out of bounds,
    // it makes more sense to check for any empty around a shape, and exit the check early, knowing that as soon
    // as you find any adjacent empty, the shape will not be taken

    // This was my first quick implementation, using a Depth first search, going down a full path and
    // checking for empty at the end adjacents of each path.

    // isTaken(row: number, col: number): boolean {
    //     const seen = new Set<Key>();
    //     const sourceStatus = this.getStatus(row, col);
    //
    //     if (sourceStatus === Status.Empty || sourceStatus === Status.Out)
    //         return false;
    //
    //     const checkNodeForEmpty = (
    //         row: number,
    //         col: number,
    //         sourceStatus: Status
    //     ): boolean => {
    //         const nodeStatus = this.getStatus(row, col);
    //         // if empty we immediately know the shape is not taken
    //         if (nodeStatus === Status.Empty) return true;
    //         // we are following the path of a shape
    //         else if (nodeStatus === sourceStatus) {
    //             return checkPathForEmpty(row, col, nodeStatus);
    //         } else {
    //             return false;
    //         }
    //     };
    //
    //     const checkPathForEmpty = (
    //         row: number,
    //         col: number,
    //         sourceStatus: Status
    //     ): boolean => {
    //         const key: Key = this.getKey(row, col);
    //
    //         if (seen.has(key)) {
    //             return false; // no need to memo - if the result was true the stack would already collapse to true anyways
    //         }
    //
    //         seen.add(key);
    //
    //         const checkNorth = () => checkNodeForEmpty(row - 1, col, sourceStatus);
    //         const checkEast = () => checkNodeForEmpty(row, col + 1, sourceStatus);
    //         const checkSouth = () => checkNodeForEmpty(row + 1, col, sourceStatus);
    //         const checkWest = () => checkNodeForEmpty(row, col - 1, sourceStatus);
    //
    //         return checkNorth() || checkEast() || checkSouth() || checkWest();
    //     };
    //
    //     return !checkPathForEmpty(row, col, sourceStatus);
    // }

    // Some thought and second implementation was to go for a Breadth first search, most the time this should be quicker
    // and less complex as you can find any Status.Empty nodes immediately adjacent to the starting node, then go out in
    // bfs, allowing for a quicker exit when finding an empty.

    isTaken(row: number, col: number): boolean {
        const visitedNodes = new Set<string>();
        const status = this.getStatus(row, col);

        if (status === Status.Empty || status === Status.Out) return false;

        const checkPathForEmpty = (row: number, col: number): boolean => {
            const key = this.getKey(row, col);

            // make sure we are not running any checks on already visited nodes
            if (visitedNodes.has(key)) {
                return false;
            }

            visitedNodes.add(key);

            const nodesInShape: Set<[number, number]> = new Set();
            // for ... of allows for early exit, so we go through all the adjacent nodes of our current node
            // if it is a matching Black/White status, we add it to the nodesInShape
            for (const [adjacentRow, adjacentCol] of [
                [row - 1, col],
                [row, col + 1],
                [row + 1, col],
                [row, col - 1],
            ]) {
                const adjacentStatus = this.getStatus(adjacentRow, adjacentCol);
                if (adjacentStatus === Status.Empty) {
                    return true;
                } else if (adjacentStatus === status && !visitedNodes.has(this.getKey(adjacentRow, adjacentCol))) {
                    nodesInShape.add([adjacentRow, adjacentCol]);
                }
            }
            // as we collect all the nodes in immediate (adjacent) shape, we check for any adjacent empty
            for (const [adjRow, adjCol] of Array.from(nodesInShape)) {
                // return exits a for ... of, so we only return if true, otherwise we want the loop to continue
                if(checkPathForEmpty(adjRow, adjCol)){ return true};
            }
            return false
        };

        return !checkPathForEmpty(row, col);
    }


}