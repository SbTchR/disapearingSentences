function generateSlides(step) {
    const sentences = document.getElementById('sentences').value.split('\n').filter(sentence => sentence.trim() !== '');
    const slidesContainer = document.getElementById('slides-container');
    slidesContainer.innerHTML = ''; // Clear previous slides

    sentences.forEach(sentence => {
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
        slide.textContent = modifiedSentence;
        slidesContainer.appendChild(slide);
    });

    document.querySelector('.reveal').style.display = 'block';
}
