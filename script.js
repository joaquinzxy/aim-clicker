let arrayCheckboxes = []
let checkCounter = 0;
let bestTime = 0;
let horizontalMovement = 0
let checkBoxesContainer = document.getElementById("check-boxes-container")
let counterDisplay = document.getElementById("counter")
let clockDisplay = document.getElementById("clock")
let bestTimeDisplay = document.getElementById("best-time")
let resetButton = document.getElementById("reset-btn")
let pageOverlay = document.getElementsByClassName("overlay")[0]
let dashboard = document.getElementsByClassName("dashboard")[0]
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
    for (let i = 0; i < 50; i++) {
        let newCheckbox = document.createElement("input")
        newCheckbox.type = "checkbox"
        newCheckbox.className = "checkbox"
        newCheckbox.style.position= "relative" 
        newCheckbox.disabled = "true"
        newCheckbox.tabIndex="-1"
        newCheckbox.addEventListener("click", function(){
            checkCounter++
            horizontalMovement += 20
            counterDisplay.innerText=checkCounter+"/"+arrayCheckboxes.length
            this.disabled = "true"
            if (checkCounter<arrayCheckboxes.length) {
                arrayCheckboxes[checkCounter].disabled = ""
                arrayCheckboxes[checkCounter].style.top= getRandom(checkCounter)+"px"
            }
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
    
    arrayCheckboxes[arrayCheckboxes.length-1].addEventListener("click", function(e){
            pageOverlay.style.display = "flex"
            dashboard.style.zIndex = 4
            dashboard.style.color = "white"
            isTimeRunning = false;
            if (timeCounter<bestTime || bestTime == 0) {
                bestTime = timeCounter
                bestTimeDisplay.innerHTML = clockDisplay.innerText
            }

            checkCounter = arrayCheckboxes.length-1
    })

    arrayCheckboxes[checkCounter].disabled = ""
}

function resetGame(){
    for (let i = 0; i < arrayCheckboxes.length; i++) {
        stepBack()     
    }
    pageOverlay.style.display = "none"
    dashboard.style.zIndex = 2
    dashboard.style.color = "black"
    isTimeRunning = false;
    timeCounter = 0;
}

function stepBack(){
    if(checkCounter>0){
        arrayCheckboxes[checkCounter].style.top = "0"
        arrayCheckboxes[checkCounter].disabled = "true"
        arrayCheckboxes[checkCounter].checked = false
        checkCounter--
        arrayCheckboxes[checkCounter].disabled = "true"
        arrayCheckboxes[checkCounter].checked = false
        counterDisplay.innerText=checkCounter+"/"+arrayCheckboxes.length

        arrayCheckboxes[checkCounter].disabled = ""
        arrayCheckboxes[checkCounter].checked = false
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

checkBoxesContainer.addEventListener("click", function(e){
    if(!e.target.classList.contains('checkbox')){
        stepBack()
    }
})

resetButton.addEventListener("click", function(){
    resetGame()
})

setCheckboxes()


