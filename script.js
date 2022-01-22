let arrayCheckboxes = []
let checkCounter = 0;
let horizontalMovement = 0
let checkBoxesContainer = document.getElementById("check-boxes-container")
let counterDisplay = document.getElementById("counter")
let clockDisplay = document.getElementById("clock")
let timeCounter = 0;
let timeInterval = undefined;
let isTimeRunning = false;

function getRandom(limit){
    if(limit<10){
        limit = 10
    }
    return Math.floor(Math.random()*(-(limit)-(limit))+limit)
}

function setCheckboxes(){
    for (let i = 0; i < 100; i++) {
        let newCheckbox = document.createElement("input")
        newCheckbox.type = "checkbox"
        newCheckbox.className = "checkbox"
        newCheckbox.style.position= "relative" 
        newCheckbox.disabled = "true"
        newCheckbox.addEventListener("click", function(){
            checkCounter++
            horizontalMovement += 20
            counterDisplay.innerText=checkCounter+"/100"
            this.disabled = "true"
            arrayCheckboxes[checkCounter].disabled = ""
            arrayCheckboxes[checkCounter].style.top= getRandom(checkCounter)+"px"
            checkBoxesContainer.style.right = horizontalMovement+"px"
         })
        checkBoxesContainer.appendChild(newCheckbox)      
    }
    arrayCheckboxes = document.getElementsByTagName("input")

    arrayCheckboxes[0].addEventListener("click", function(e){
        if(!isTimeRunning){
            runTimer()
        }
    })
    
    arrayCheckboxes[99].addEventListener("click", function(e){
            isTimeRunning = false;
    })

    arrayCheckboxes[checkCounter].disabled = ""
}

function resetGame(){
    let lastCheckbox = checkCounter
    for (let i = 0; i < lastCheckbox; i++) {
        stepBack()     
    }
}

function stepBack(){
    if(checkCounter>0){
        checkCounter--
        counterDisplay.innerText=checkCounter+"/100"

        arrayCheckboxes[checkCounter].disabled = ""
        arrayCheckboxes[checkCounter].checked = false
        arrayCheckboxes[checkCounter+1].disabled = "true"
        horizontalMovement -= 20
        checkBoxesContainer.style.right = horizontalMovement+"px"
    }   
}

function runTimer(){
    timeCounter = 0;
    isTimeRunning = true;
    timeInterval = setInterval(updateTimer, 10)
}

function getTwoDigits(number){
    return number.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})
}

function updateTimer(){    
    if(isTimeRunning){
        timeCounter ++
        miliseconds = timeCounter%100
        seconds = Math.floor(timeCounter / 100)%60
        minutes = Math.floor(timeCounter / 6000)
        clockDisplay.innerText = `${getTwoDigits(minutes)}:${getTwoDigits(seconds)}:${getTwoDigits(miliseconds)}`
    } else {
        clearInterval(timeInterval)
    }
}

document.addEventListener("click", function(e){
    if(!e.target.classList.contains('checkbox')){
        stepBack()
    }
})







setCheckboxes()