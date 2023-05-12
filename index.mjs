import chalk from 'chalk';
import _ from 'lodash';

let greed = [];

// 행과 열의 크기
let rows = 4;
let columns = 4;

let maxNum = Math.min(rows, columns) - 1;

let goal = {
    x: 3,
    y: 3,
    char: chalk.yellow('G'),
};

let player = {
    x: 0,
    y: 0,
    char: chalk.green('P'),
};

let maps = [];
let moves = [
    {x: 0, y: 1},
    {x: 0, y: -1},
    {x: 1, y: 0},
    {x: 1, y: 1},
    {x: 1, y: -1},
    {x: -1, y: 0},
    {x: -1, y: 1},
    {x: -1, y: -1},
];
const dfs = (graph, start, visited,depth) => {
    if ( depth > rows * columns / 2){
        return;
    }
    if (start.x === goal.x && start.y === goal.y) {
        maps.push(_.cloneDeep(visited)); 
        return;
    }
    visited.push(_.cloneDeep(start));
    for (let move of moves) {
        let next = {
            x: start.x + move.x,
            y: start.y + move.y,
        };
        if (next.x < 0 || next.x >= rows || next.y < 0 || next.y >= columns) {
            continue;
        }
        if (visited.filter(item => item.x === next.x && item.y === next.y).length >= 1) {
            continue;
        }
        dfs(graph, next, _.cloneDeep(visited),depth+1);
    }
};

let printGreeds = (greed) => {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            process.stdout.write(greed[i][j] + ' ');
        }
        console.log();
    }
};

let makeGreeds = (rows, columns) => {
    let greed = [];
    for (let i = 0; i < rows; i++) {
        greed[i] = [];
        for (let j = 0; j < columns; j++) {
            greed[i][j] = i * columns + j;
        }
    }
    return greed;
};


for (let i = 0; i < rows; i++) {
    greed[i] = [];
    for (let j = 0; j < columns; j++) {
        greed[i][j] = i * columns + j;
        greed[i][j] = greed[i][j] % maxNum + 1;
        if (i === goal.x && j === goal.y) {
            greed[i][j] = goal.char;
        }
        else if (i === player.x && j === player.y) {
            greed[i][j] = player.char;
        }
    }
}

// 배열 출력
printGreeds(greed);
let visited = new Array();
let start = {
    x: _.cloneDeep(player.x),
    y: _.cloneDeep(player.y),
}
dfs(greed, start,_.cloneDeep(visited),0)
console.log(maps);