// button control on click
document.querySelector(".control-buttons button").onclick = function () {
    let yourName = prompt("Whats Your Name ?")
    let spanName = document.querySelector(".name span")
    if (yourName == null || yourName == "") {
        spanName.innerHTML = "unknown";
    }
    else {
        spanName.innerHTML = yourName;
    }
    this.parentElement.remove()
}

let duration = 500,

    blocksContainer = document.querySelector(".game-container"),

    blocks = Array.from(blocksContainer.children),

    orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange)

blocks.forEach((block, index) => {

    block.style.order = orderRange[index]

    block.addEventListener("click", function () {

        flipBlock(block)
    })
})

// Shuffle Function
function shuffle(array) {
    // Setting vars
    let current = array.length,
        random

    while (current > 0) {
        // Get Random Number
        random = Math.floor(Math.random() * current);
        // Decrease Lenght By one
        current--
        // And swap it with the current element.
        [array[current], array[random]] = [array[random], array[current]]
    }
    return array
}

// Flip Block Function
function flipBlock(block) {
    // add class flipped
    block.classList.add("flipped")
    // Collect Flipped Cards
    let flippedBlocks = blocks.filter(block => block.classList.contains("flipped"))
    // If Theres Two Selected Blocks
    if (flippedBlocks.length == 2) {
        // Stop Clicking Function
        stopClicking()

        mathedBlocks(flippedBlocks[0], flippedBlocks[1])
    }
}

// Stop Clicking Function
function stopClicking() {
    // Add Class No Clicking
    blocksContainer.classList.add("no-clicking")
    // Remove Class No Clicking 
    setTimeout(() => {
        blocksContainer.classList.remove("no-clicking")
    }, duration)
}

// Check Mathed Blocks

function mathedBlocks(firstBlock, secondBlock) {
    if (firstBlock.dataset.icon === secondBlock.dataset.icon) {
        firstBlock.classList.remove("flipped")
        secondBlock.classList.remove("flipped")

        firstBlock.classList.add("has-match")
        secondBlock.classList.add("has-match")
    }
    else {
        let triesElement = document.querySelector(".tries span");
        setTimeout(() => {
            firstBlock.classList.remove("flipped")
            secondBlock.classList.remove("flipped")
        }, duration)
        ++triesElement.innerHTML
    }
}