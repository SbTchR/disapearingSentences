function generateSlides(step) {
    const sentences = document.getElementById('sentences').value.split('\n').filter(sentence => sentence.trim() !== '');
    const slidesContainer = document.getElementById('slides-container');
    slidesContainer.innerHTML = ''; // Clear previous slides

    sentences.forEach((sentence, index) => {
        let modifiedSentence = '';

        switch(step) {
            case 1:
                modifiedSentence = sentence; // Full sentence
                break;
            case 2:
                modifiedSentence = sentence.split(' ').map((word, index) => index % 2 === 0 ? '_'.repeat(word.length) : word).join(' ');
                break;
            case 3:
                modifiedSentence = sentence.split(' ').map((word, index) => index % 2 !== 0 ? '_'.repeat(word.length) : word).join(' ');
                break;
            case 4:
                modifiedSentence = sentence.split(' ').map(word => '_'.repeat(word.length)).join(' ');
                break;
        }

        let slide = document.createElement('div');
        slide.className = 'slide';
        slide.textContent = `${index + 1}. ${modifiedSentence}`;
        slidesContainer.appendChild(slide);
    });
}

function toggleForm() {
    const formContainer = document.getElementById('sentence-form');
    if (formContainer.style.display === 'none') {
        formContainer.style.display = 'block';
    } else {
        formContainer.style.display = 'none';
    }
}
