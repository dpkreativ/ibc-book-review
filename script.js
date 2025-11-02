const questions = [
    "How does Lewa’s initial mindset and situation shape the decisions she makes throughout the story?",
    "What role does Sisi play in Lewa’s life? Is Sisi a villain, a mentor, or both?",
    "Sho is a Babalawo and also part of the luxury world Lewa enters. How does his dual role affect your perception of him and the relationship he has with Lewa?",
    "The novel uses ritual and spiritual elements (oaths, traditional practice) alongside modern luxury. What is the significance of blending these two worlds?",
    "How does the setting (Lagos, with its glamour and grit) function as a character in its own right?",
    "In what ways do the sugar-daddy transactions reflect broader themes of class, power and commodification?",
    "Can Lewa’s choice to participate in the system be viewed as agency or entrapment? Or a mixture of both?",
    "How does the author portray desire and pleasure, especially from a female protagonist’s perspective?",
    "How do you respond to characters who are morally grey (neither purely good nor purely evil)? Does this enhance or complicate the reading experience?",
    "What do you think the novel says about the cost of “escaping poverty” in a system that demands more than it promises?",
    "There are moments of betrayal, loyalty and shifting allegiances. Which betrayal hit you the hardest and why?",
    "The book ends (without major spoilers) with a sense of transformation. What does freedom look like for Lewa? Is it something she attains, or something she must keep fighting for?",
    "If you were advising Lewa, at a key turning point in the story, what would you tell her and why?",
    "The author uses sensual, erotic scenes as part of the narrative. How do you feel about the role of erotica in telling a story with serious themes?",
    "What aspects of the story stayed with you after finishing the book? Why?"
];

        let currentIndex = 0;
        const carouselTrack = document.getElementById('carouselTrack');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const progressIndicator = document.getElementById('progressIndicator');

        // Create question cards
        function createQuestionCards() {
            questions.forEach((question, index) => {
                const card = document.createElement('div');
                card.className = 'question-card';
                card.innerHTML = `
                    <span class="question-number">Question ${index + 1}</span>
                    <h3 class="question-text">${question}</h3>
                    `;
                carouselTrack.appendChild(card);
            });
        }

        // Update carousel display
        function updateCarousel() {
            const cards = document.querySelectorAll('.question-card');
            
            cards.forEach((card, index) => {
                card.classList.remove('active', 'prev', 'next');
                
                if (index === currentIndex) {
                    card.classList.add('active');
                } else if (index === currentIndex - 1 || (currentIndex === 0 && index === cards.length - 1)) {
                    card.classList.add('prev');
                } else if (index === currentIndex + 1 || (currentIndex === cards.length - 1 && index === 0)) {
                    card.classList.add('next');
                }
            });

            progressIndicator.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
        }

        // Navigation functions
        function goToNext() {
            currentIndex = (currentIndex + 1) % questions.length;
            updateCarousel();
        }

        function goToPrev() {
            currentIndex = (currentIndex - 1 + questions.length) % questions.length;
            updateCarousel();
        }

        // Event listeners
        nextBtn.addEventListener('click', goToNext);
        prevBtn.addEventListener('click', goToPrev);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') goToNext();
            if (e.key === 'ArrowLeft') goToPrev();
        });

        // Initialize
        createQuestionCards();
        updateCarousel();

        // Touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        carouselTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        carouselTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            if (touchEndX < touchStartX - 50) goToNext();
            if (touchEndX > touchStartX + 50) goToPrev();
        }
