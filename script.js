if (typeof window === 'undefined' || typeof document === 'undefined') {
    console.warn('script.js requires a browser environment.');
} else {
    const counters = document.querySelectorAll('.counter');
    const reveals = document.querySelectorAll('.reveal');

    const animateCounters = () => {
        counters.forEach((counter) => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const increment = Math.ceil(target / 120);

                if (count < target) {
                    counter.innerText = count + increment;
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    const revealOnScroll = () => {
        reveals.forEach((element) => {
            const windowHeight = window.innerHeight;
            const revealTop = element.getBoundingClientRect().top;
            const revealPoint = 150;

            if (revealTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };

    const hasSeenCounter = {
        initialized: false,
    };

    window.addEventListener('scroll', () => {
        revealOnScroll();

        if (!hasSeenCounter.initialized) {
            const statsSection = document.querySelector('.stats');
            if (statsSection && statsSection.getBoundingClientRect().top < window.innerHeight) {
                animateCounters();
                hasSeenCounter.initialized = true;
            }
        }
    });

    window.addEventListener('load', () => {
        revealOnScroll();
    });
}
