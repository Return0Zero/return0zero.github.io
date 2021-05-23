// Init SpeechSynth API
const synth = window.speechSynthesis;

// Dom Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const menuIcon = document.querySelector('.hamburger-menu');
const navbarHamburger = document.querySelector('.navbar-hamburger');

// Init voice array
let voices = [];

const getVoices = () => {
    voices = synth.getVoices();

    //loop through voices and create an option for each one
    voices.forEach(voice => {
        // Create option element
        const option = document.createElement('option');
        // Fill option with voice and language
        option.textContent = voice.name + '('+voice.lang +')';

        // Set needed option attributes
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });
};

getVoices ();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}

// Speak
const speak = () => {
    // Check if Speaking
    if(synth.speaking) {
        console.error('Llamando a alguien... Intente nuevamente')
    }
    if(textInput.value !== ''){
    // Get speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        //Speak end
        speakText.onend = e => {
            console.log('Llamada Finalizada')
        }
        //Speak error
        speakText.onerror = e => {
            console.error('A ocurrido el siguiente error?')
        }
        //Selected voice
        const selectedVoice = voiceSelect.selectedOptions[0]
        .getAttribute('data-name');
        //Loop through voices
        voices.forEach(voice => {
            if(voice.name === selectedVoice) {
                speakText.voice = voice;
            }        
        });

        // Set pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;
        // Speak
        synth.speak(speakText);
    }

};

// Event Listener

// Text form submit
textForm.addEventListener('submit', e => {
   e.preventDefault();
   speak();
   textInput.blur();
});

// Rate value change
rate.addEventListener('change', e => rateValue.textContent = rate.value)

// Rate value change
pitch.addEventListener('change', e => pitchValue.textContent = picth.value)

// voice select change 
voiceSelect.addEventListener('change', e => speak());

// Hamburger Menu
menuIcon.addEventListener("click", () => {
    navbarHamburger.classList.toggle("change");
})
