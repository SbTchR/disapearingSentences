function generateSlides(step) {
    const sentences = document.getElementById('sentences').value.split('\n').filter(sentence => sentence.trim() !== '');
    const slidesContainer = document.getElementById('slides-container');
    slidesContainer.innerHTML = ''; // Clear previous slides

    const slideBgColors = ['slide-bg-1', 'slide-bg-2', 'slide-bg-3', 'slide-bg-4'];
    const wordPlaceholderColors = ['word-placeholder-color-1', 'word-placeholder-color-2', 'word-placeholder-color-3', 'word-placeholder-color-4'];

    sentences.forEach((sentence, sentenceIndex) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        // Appliquer une couleur de fond au slide
        slide.classList.add(slideBgColors[sentenceIndex % slideBgColors.length]);

        // Ajouter le numéro de la phrase
        const sentenceNumber = document.createTextNode(`${sentenceIndex + 1}. `);
        slide.appendChild(sentenceNumber);

        if (step === 1) {
            slide.appendChild(document.createTextNode(sentence)); // Phrase complète
        } else {
            const words = sentence.split(' ');
            words.forEach((word, wordIndexInSentence) => {
                let shouldMaskWord = false;
                switch(step) {
                    case 2: // Un mot sur deux, commençant par le premier
                        shouldMaskWord = wordIndexInSentence % 2 === 0;
                        break;
                    case 3: // Un mot sur deux, commençant par le deuxième
                        shouldMaskWord = wordIndexInSentence % 2 !== 0;
                        break;
                    case 4: // Deux mots sur trois masqués (révéler chaque 3e mot)
                        shouldMaskWord = (wordIndexInSentence % 3) !== 2;
                        break;
                    case 5: // Tous les mots (ancien niveau 4)
                        shouldMaskWord = true;
                        break;
                }

                if (word.length === 0) return; // Gérer les espaces multiples

                if (shouldMaskWord) {
                    let coreWord = word;
                    let trailingPunctuation = '';
                    
                    // Regex pour identifier la ponctuation commune à la fin d'un mot
                    const punctuationRegex = /([.,!?;:]+)$/;
                    const punctuationMatch = word.match(punctuationRegex);

                    if (punctuationMatch) {
                        trailingPunctuation = punctuationMatch[1];
                        coreWord = word.substring(0, word.length - trailingPunctuation.length);
                    }

                    // Créer des placeholders uniquement si coreWord a une longueur (pour éviter de créer des placeholders pour des mots qui ne sont que de la ponctuation)
                    if (coreWord.length > 0) {
                        const wordGroupSpan = document.createElement('span');
                        wordGroupSpan.className = 'word-placeholder-group';
                        wordGroupSpan.classList.add(wordPlaceholderColors[wordIndexInSentence % wordPlaceholderColors.length]);

                        for (let i = 0; i < coreWord.length; i++) {
                            const letterSpan = document.createElement('span');
                            letterSpan.className = 'placeholder-letter';
                            wordGroupSpan.appendChild(letterSpan);
                        }
                        slide.appendChild(wordGroupSpan);
                    }

                    // Ajouter la ponctuation finale si elle existe
                    if (trailingPunctuation.length > 0) {
                        slide.appendChild(document.createTextNode(trailingPunctuation));
                    }
                } else {
                    slide.appendChild(document.createTextNode(word));
                }

                // Ajouter un espace après chaque mot/groupe de placeholders + ponctuation, sauf le dernier
                if (wordIndexInSentence < words.length - 1) {
                    slide.appendChild(document.createTextNode(' '));
                }
            });
        }
        slidesContainer.appendChild(slide);
    });

    // Boucle pour ajuster le white-space après que tous les slides sont dans le DOM
    const allSlides = slidesContainer.children;
    for (let i = 0; i < allSlides.length; i++) {
        const currentSlide = allSlides[i];
        // Ajout d'une petite marge pour la comparaison pour éviter les faux positifs dus aux arrondis de sous-pixels
        if (currentSlide.scrollWidth > currentSlide.clientWidth + 1) { 
            currentSlide.style.whiteSpace = 'normal';
            currentSlide.style.textOverflow = 'clip'; // Ou '' pour hériter
        }
    }

    // adjustFontSize(); // Nous pourrions avoir besoin de revoir ou supprimer cette fonction
}

function adjustFontSize() {
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
        // Check if the slide is empty or only contains the sentence number
        if (!slide.textContent.trim() || slide.childNodes.length <= 1 && slide.firstChild.nodeType === Node.TEXT_NODE && slide.firstChild.textContent.match(/^\\d+\\.\\s*$/)) {
            return; 
        }
        
        let fontSize = 50; // Start with a more reasonable font size for slides
        slide.style.fontSize = fontSize + 'px';
        slide.style.lineHeight = 'normal'; // Ensure line height does not interfere

        // Temporarily allow overflow to measure natural width
        const originalWhiteSpace = slide.style.whiteSpace;
        slide.style.whiteSpace = 'nowrap'; 
        slide.style.overflow = 'visible';

        // Decrease font size until the sentence fits on one line
        // Ensure clientWidth is not zero to avoid infinite loop
        while (slide.scrollWidth > slide.clientWidth && slide.clientWidth > 0 && fontSize > 10) { // Added clientWidth > 0 and min font size
            fontSize -= 1; 
            slide.style.fontSize = fontSize + 'px';
        }
        
        slide.style.whiteSpace = originalWhiteSpace; // Restore original white-space
        slide.style.overflow = 'hidden'; // Restore overflow hidden

        // console.log(`Final font size for slide "${slide.textContent.substring(0,20)}...": ${fontSize}px, scrollW: ${slide.scrollWidth}, clientW: ${slide.clientWidth}`);
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
