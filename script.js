document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const modal = document.getElementById('lesson-modal');
    const modalTitle = document.getElementById('modal-title');
    const lessonList = document.getElementById('lesson-list');
    const modalClose = document.querySelector('.modal-close');

    // Sample lesson data for modules
    const moduleLessons = {
        step: [
            '<a href="https://go.hotmart.com/F102720032Q?dp=1" target="_blank">Aula 1: Introdução aos Ritmos e Coreografias bem elaboradas no Step.</a>',
            '<a href="https://go.hotmart.com/Y102720323R?dp=1" target="_blank">Aula 2: Coreografias Básicas</a>',
            '<a href="https://go.hotmart.com/D102720815P?dp=1" target="_blank">Aula 3: Combinações Intermediárias</a>', 
            '<a href="" target="_blank">Aula 4: Teoria</a>',
        ]
    };

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
    });

    // Smooth scrolling for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth' });
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // Handle module card clicks
    document.querySelectorAll('.card.available').forEach(card => {
        card.addEventListener('click', () => {
            const module = card.getAttribute('data-module');
            const title = card.querySelector('h3').textContent;
            modalTitle.textContent = title;
            lessonList.innerHTML = '';
            const lessons = moduleLessons[module] || [];
            lessons.forEach(lesson => {
                const li = document.createElement('li');
                li.innerHTML = lesson; // ← link funcionando
                lessonList.appendChild(li);
            });
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
        });
    });

    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
        }
    });

    const observerOptions = {
        root: null,
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .foto-instrutor, .sobre-texto, .contact-form').forEach(el => {
        observer.observe(el);
    });

    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    const numberOfParticles = Math.max(50, Math.floor(window.innerWidth / 20));

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = `rgba(0, 168, 107, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    document.addEventListener('touchstart', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    const heroH1 = document.querySelector('.hero-content h1');
    heroH1.addEventListener('animationend', () => {
        heroH1.style.clipPath = 'none';
    });
});
