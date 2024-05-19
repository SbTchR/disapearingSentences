function generateSlides() {
    const sentences = document.getElementById('sentences').value.split('\n');
    console.log('Sentences:', sentences); // Debug
    const slidesContainer = document.getElementById('slides');
    slidesContainer.innerHTML = ''; // Clear previous slides

    sentences.forEach(sentence => {
        let steps = createDisappearingSteps(sentence);
        console.log('Steps:', steps); // Debug
        steps.forEach(step => {
            let slide = document.createElement('section');
            slide.textContent = step;
            slidesContainer.appendChild(slide);
            console.log('Added slide:', slide); // Vérifiez chaque slide ajoutée
        });
    });

    console.log('Slides:', slidesContainer.innerHTML); // Vérifiez le contenu des slides

    // Réinitialiser Reveal.js après avoir ajouté les slides
    setTimeout(() => {
        Reveal.configure({ 
            hash: true, 
            slideNumber: true 
        });
        Reveal.initialize({
            hash: true,
            slideNumber: true,
            plugins: [RevealMarkdown, RevealHighlight, RevealZoom, RevealNotes]
        });
        console.log('Reveal.js initialized'); // Debug
    }, 100); // Attendre un court instant avant de réinitialiser Reveal.js
}

function createDisappearingSteps(sentence) {
    let steps = [];
    steps.push(sentence); // Full sentence

    // Step 1: One word out of two
    steps.push(sentence.split(' ').map((word, index) => (index % 2 === 0 ? '_'.repeat(word.length) : word)).join(' '));

    // Step 2: Alternate words
    steps.push(sentence.split(' ').map((word, index) => (index % 2 !== 0 ? '_'.repeat(word.length) : word)).join(' '));

    // Step 3: All words disappeared
    steps.push(sentence.split(' ').map(word => '_'.repeat(word.length)).join(' '));

    return steps;
}
