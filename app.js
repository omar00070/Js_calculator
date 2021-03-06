//selectors
const number = document.querySelectorAll('.number button');
const display = document.querySelector('.num h1');
const operator = document.querySelector('.operator h4')
const action = document.querySelectorAll('.action button');
const answer = document.querySelector('.answer h3');
const canvasBtn = document.querySelector('.canvas button');

let displayNum = display.innerText;
let Dot = false;
let zeroClick = false;
let nums = []
let ans = 0;

//listeners
for(let i = 0; i < number.length; i++){
    number[i].addEventListener('click', addNumber);
};

for(let i = 0; i < action.length; i++){
    action[i].addEventListener('click', addAction);
};

canvasBtn.addEventListener('click', function(){
    let classes = canvasBtn.parentElement.classList
    if(classes.value.includes('on')){
        canvasBtn.innerHTML = "<h2>OFF</h2>";
        canvas.classList.toggle('canvas-on');
        canvas.classList.toggle('canvas-off');
    }else{
        canvasBtn.innerHTML = "<h2>ON</h2>";
        canvas.classList.toggle('canvas-on');
        canvas.classList.toggle('canvas-off');
    }
    canvasBtn.parentElement.classList.toggle('off');
    canvasBtn.parentElement.classList.toggle('on');
})


//functions
function addNumber(event){
    const numBtn = event.target;
    if(numBtn.innerText ==='0'){
        zeroClick = true
    } 
    if(displayNum === '0'){
        displayNum = numBtn.innerText
    }else if(displayNum.length < 10){
            displayNum = displayNum + numBtn.innerText
        }
    display.innerText = displayNum;
};

function addAction(e){
    const actionBtn = e.target.innerText;
    if(actionBtn !== '.' && actionBtn!=='CE' && actionBtn !=='AC' && actionBtn != 'NEG'){
        Dot = false
        operator.innerText = actionBtn;     
        
        if(displayNum == '0'){
            if(zeroClick){
                nums.push(Number(displayNum));
            }
        }else{
            nums.push(Number(displayNum));
        }
        if(nums.length > 0){
            if(typeof nums[nums.length - 1] == 'string'){
                nums[nums.length - 1] = actionBtn;
            }else{
                nums.push(actionBtn);
            }
            //2nd element in the list should always be an operator else, we remove the first element(ans)
            if(typeof nums[1] == 'number'){
                nums.shift();
            }
        }
        zeroClick = false
        console.log(nums);
        displayNum = '0';
        ans = nums[0];
        for(let i = 0; i < nums.length; i++){
            if(i + 1 < nums.length){
                switch(nums[i]){
                    case '+':
                        ans = ans + nums[i + 1]
                        break;
                    case '-':
                        ans = ans - nums[i + 1]
                        break;
                    case '/':
                        ans = ans / nums[i + 1]
                        break;
                    case 'x':
                        ans = ans * nums[i + 1]
                        break;
                }
            }
        }
        console.log(ans)
    }else{
        if(actionBtn === '.' && !Dot){
            displayNum = displayNum + '.';
            Dot = true;
        }
        if(actionBtn == 'CE' && display.innerText !== '0'){
            displayNum = displayNum.substring(0, displayNum.length - 1);
        }
        if(displayNum ===''){
            display.innerText = '0';
        }else{
            display.innerText = displayNum;
        }
        if(actionBtn == 'NEG'){
            displayNum = Number(displayNum);
            displayNum = -1 * displayNum;
            displayNum = displayNum.toString()
            display.innerText = displayNum;
        }
        if(actionBtn == 'AC'){
            nums = [];
            Dot = false;
            zeroClick = false;
            ans = 0;
            displayNum = '0';
            display.innerText = displayNum;
            operator.innerText = '';
        }
    }
    
    if(actionBtn == '='){
        nums.push(Number(displayNum));
        display.innerText = '0';
        nums = [ans]
        displayNum = '0'
        display.innerText = displayNum
    
    }
    ans.toFixed(10)
    answer.innerText = ans

}
