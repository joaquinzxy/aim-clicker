let arrayCheckboxes = []
let checkCounter = 0;
let horizontalMovement = 0
let checkBoxesContainer = document.getElementById("check-boxes-container")
let counterDisplay = document.getElementById("counter")

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
        horizontalMovement -= 10
        checkBoxesContainer.style.right = horizontalMovement+"px"
    }   
}

document.addEventListener("click", function(e){
    if(!e.target.classList.contains('checkbox')){
        stepBack()
    }
})

setCheckboxes()