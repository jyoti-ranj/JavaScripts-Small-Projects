const typingText = document.querySelector('.typing-text p');
const input = document.querySelector('.wrapper .input-field');
const time = document.querySelector('.time span');
const mistakes = document.querySelector('.mistakes span');
const wpm = document.querySelector('.wpm span');
const cpm = document.querySelector('.cpm span');
const btn = document.querySelector('button');

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

function loadPara(){
    const paragraphs = [
        "The sun set behind the mountains, painting the sky in hues of orange and pink.",
        "A gentle breeze rustled the leaves, creating a soothing melody in the quiet forest.",
        "The city buzzed with life as people hurried through the crowded streets.",
        "She sipped her coffee, enjoying the warmth it brought to her cold hands.",
        "The dog barked excitedly, chasing after the ball with unbridled enthusiasm.",
        "The book was filled with tales of adventure, captivating every reader who opened its pages.",
        "Raindrops tapped against the window, forming intricate patterns on the glass.",
        "The lighthouse stood tall, guiding sailors safely to the shore with its bright beam.",
        "His laughter echoed through the room, bringing smiles to everyone around him.",
        "The aroma of freshly baked bread filled the kitchen, making her stomach rumble.",
        "The waves crashed against the rocks, creating a mesmerizing rhythm along the shore.",
        "A single star twinkled in the vast night sky, offering a glimmer of hope.",
        "The garden bloomed with vibrant flowers, attracting bees and butterflies alike.",
        "She closed her eyes and listened to the calming sound of the ocean waves.",
        "The clock ticked steadily, marking the passage of time in the quiet room.",
        "Snowflakes danced in the air, blanketing the ground in a pristine layer of white.",
        "The old photograph brought back a flood of memories from her childhood days.",
        "The mountain trail was steep, but the breathtaking view made the effort worthwhile.",
        "He strummed his guitar, filling the room with a melody that spoke of longing.",
        "The campfire crackled, casting flickering shadows on the faces of the gathered friends."
      ];

      const randomIndex = Math.floor(Math.random()*paragraphs.length);
      typingText.innerHTML = "";
      for(const char of paragraphs[randomIndex]){
        typingText.innerHTML += `<span>${char}</span>`;
      }
      typingText.querySelectorAll('span')[0].classList.add('active');
      document.addEventListener('keydown',()=>input.focus());
      typingText.addEventListener('click',()=>input.focus());
}

function initTyping() {
    const char = typingText.querySelectorAll('span'); // Select all span elements in typingText
    const typedChar = input.value.charAt(charIndex); // Get the character typed by the user at charIndex
    
    if (charIndex < char.length && timeLeft > 0) {
        
        if(!isTyping){
            timer = setInterval(initTime, 1000);
            isTyping = true;
        }
      

        if (char[charIndex].innerText === typedChar) {
            // If the typed character matches the text character
            char[charIndex].classList.add('correct');
            console.log('correct');
        } else {
            // If the typed character doesn't match
            mistake++;
            char[charIndex].classList.add('incorrect');
            console.log('incorrect');
        }
        char[charIndex].classList.add('active')
        mistakes.innerText = mistake;
        cpm.innerText = charIndex - mistake;
        charIndex++; // Move to the next character
       
    } else if (timeLeft <= 0) {
        console.log("Time's up!");
        // Optional: Handle end-of-typing when time runs out
    } else if (charIndex >= char.length) {
        clearInterval(timer);
        input.value = '';
        // Optional: Handle what happens when the user finishes typing all characters
    }
}


function initTime() {
    if (timeLeft > 0) {
        timeLeft--; // Decrease time left
        time.innerText = timeLeft;
        let wpmVal = Math.round(((charIndex -mistake)/5)/(maxTime - timeLeft)*60);
        wpm.innerText = wpmVal
        
    } else {
        clearInterval(timer); // Stop the timer
       
    }
}


input.addEventListener('input',initTyping)
loadPara();