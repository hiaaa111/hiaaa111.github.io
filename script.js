const win = 40;
const draw = 20;
const lose = 40;

var mode = null; //true -> 홈 선택모드 | false -> 원정 선택모드 | null -> 초기설정

var home = null;
var expedition = null;

function setSelect(element){
    if(element === home || element === expedition){
        alert('변경 후 다시 선택해주세요.');
        return;
    }
    if(mode === null){
        alert('선택모드를 선택한 후에 선택해 주세요.');
        return;
    }
    if(mode) {
        if (home === null) {
            document.getElementById(element).style.background = "deepskyblue";
            home = element;
        } else {
            document.getElementById(home).style.background = "white";
            document.getElementById(element).style.background = "deepskyblue";
            home = element;
        }
    }else{
        if (expedition === null) {
            document.getElementById(element).style.background = "crimson";
            expedition = element;
        } else {
            document.getElementById(expedition).style.background = "white";
            document.getElementById(element).style.background = "crimson";
            expedition = element;
        }
    }
    // console.log(home)
    // console.log(expedition)
}

function setMode(selectMode){
    if(mode === null){
        mode = selectMode;
    }
    mode = selectMode;
    if(selectMode){
        document.getElementById("home").style.background = "deepskyblue";
        document.getElementById("expedition").style.background = "white";
    }else{
        document.getElementById("expedition").style.background = "crimson";
        document.getElementById("home").style.background = "white";
    }
}

// 홈팀 원정팀 이길 확률, 질 확률 계산
function calculate(home, expedition) {
    let home_num;
    let expedition_num;
    if(home === "btn1"){
        home_num = 1;
    }else if(home === "btn2"){
        home_num = 2;
    }else if(home === "btn3"){
        home_num = 3;
    }else if(home === "btn4"){
        home_num = 4;
    }else if(home === "btn5"){
        home_num = 5;
    }else if(home === "btn6"){
        home_num = 6;
    }else if(home === "btn7"){
        home_num = 7;
    }else if(home === "btn8"){
        home_num = 8;
    }else if(home === "btn9"){
        home_num = 9;
    }else if(home === "btn10"){
        home_num = 10;
    }else if(home === "btn11"){
        home_num = 11;
    }else if(home === "btn12"){
        home_num = 12;
    }
    if(expedition === "btn1"){
        expedition_num = 1;
    }else if(expedition === "btn2"){
        expedition_num = 2;
    }else if(expedition === "btn3"){
        expedition_num = 3;
    }else if(expedition === "btn4"){
        expedition_num = 4;
    }else if(expedition === "btn5"){
        expedition_num = 5;
    }else if(expedition === "btn6"){
        expedition_num = 6;
    }else if(expedition === "btn7"){
        expedition_num = 7;
    }else if(expedition === "btn8"){
        expedition_num = 8;
    }else if(expedition === "btn9"){
        expedition_num = 9;
    }else if(expedition === "btn10"){
        expedition_num = 10;
    }else if(expedition === "btn11"){
        expedition_num = 11;
    }else if(expedition === "btn12"){
        expedition_num = 12;
    }

    let subtraction = Math.abs(home_num - expedition_num);
    let win_rate;
    let lose_rate;
    let num = getRandomInt(1, 100);

    if(home_num < expedition_num){
        win_rate = win + (2 * subtraction) + 3;
        lose_rate = lose - (2 * subtraction) - 3;
    }else{
        win_rate = win - (2 * subtraction) - 3;
        lose_rate = lose + (2 * subtraction) + 3;
    }
    let num1 = score();
    let num2 = score();
    while (num1 === num2){
         num2 = score()
    }
    return [win_rate, lose_rate, num1, num2];
}

function score(){
    // 2 > 1 > 0 > 3 > 4
    // 30 25 20 15 10
    let num = getRandomInt(1, 100);
    let result = 0;
    if(30 >= num){
        result = 2;
    }else if(31 <= num && num <= 56){
        result = 1;
    }else if(57 <= num && num <= 72){
        result = 0;
    }else if(73 <= num && num <= 88){
        result = 3;
    }else if(89 <= num && num <= 100){
        result = 4;
    }
    return result;
}

function play(rate){
    let win_rate = rate[0];
    let lose_rate = rate[1];
    let num = getRandomInt(1, 100);
    let result = 0; //0 => 승 | 1 => 비김 | 2 => 패
    if(win_rate >= num){
        result = 0;
    }else if(win_rate + 1 <= num && num <= win_rate + draw + 1){
        result = 1;
    }else if(win_rate + draw + 2 <= num && num <= 100){
        result = 2;
    }
    return result;
}

function startGame(){
    if(home === null || expedition === null){
        alert('홈팀 원정팀을 선택 후 다시 실행해주세요.')
        return;
    }
    let result = calculate(home, expedition);
    var title = document.getElementById('title');
    title.innerText = document.getElementById(home).innerText + ' V.S ' + document.getElementById(expedition).innerText;

    let game_result = play(result);
    let win_score = Math.max(result[2], result[3]);
    let lose_score = Math.min(result[2], result[3]);
    var info = document.getElementById('info');
    var score = document.getElementById('score');

    if(game_result === 0){
        info.innerText = '승 패'
        score.innerText = win_score + ' : ' + lose_score;
    }else if(game_result === 1){
        info.innerText = '  무승부'
        score.innerText = lose_score + ' : ' + lose_score;
    }else if(game_result === 2){
        info.innerText = '패 승'
        score.innerText = lose_score + ' : ' + win_score;
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}
