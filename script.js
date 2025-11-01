document.addEventListener('DOMContentLoaded', () => {
    // Seletores principais
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const modal = document.getElementById('lesson-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalClose = document.querySelector('.modal-close');
    const lessonCards = document.getElementById('lesson-cards'); // Container de cards
    const videoContainer = document.getElementById('video-container'); // Container do vídeo

    // Dados das aulas / links Hotmart
    const moduleLessons = {
        step: [
            { title: "Aula 1: Introdução aos Ritmos e Coreografias", hotmart: "https://go.hotmart.com/F102720032Q?dp=1" },
            { title: "Aula 2: Coreografias Básicas", hotmart: "https://go.hotmart.com/Y102720323R?dp=1" },
            { title: "Aula 3: Combinações Intermediárias", hotmart: "https://go.hotmart.com/D102720815P?dp=1" }
        ]
    };

    // Menu hamburguer
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
    });

    // Smooth scrolling nav links
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

    // Abrir módulo e criar cards
    document.querySelectorAll('.card.available').forEach(card => {
        card.addEventListener('click', () => {
            const module = card.getAttribute('data-module');
            const title = card.querySelector('h3').textContent;
            modalTitle.textContent = title;

            lessonCards.innerHTML = '';

            // Vídeo de apresentação fixo
            videoContainer.innerHTML = `
                <video controls autoplay muted loop style="width:100%;height:300px;object-fit:cover;border-radius:10px;">
                    <source src="video/Bem-vindosasessãodeStep.mp4" type="video/mp4">
                    Seu navegador não suporta vídeo.
                </video>
            `;

            const lessons = moduleLessons[module] || [];
            lessons.forEach(lesson => {
                const div = document.createElement('div');
                div.style = `
                    width: 100%;
                    border: 1px solid #00a86b;
                    padding: 12px;
                    border-radius: 10px;
                    background: #0c0202ff;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 10px;
                `;

                div.innerHTML = `
                    <strong>${lesson.title}</strong>
                    <button class="buy-btn" style="
                        padding: 6px 12px;
                        background:#ff6b6b;
                        color:#fff;
                        border:none;
                        border-radius:6px;
                        cursor:pointer;
                    ">Comprar</button>
                `;

                // Botão Comprar
                div.querySelector(".buy-btn").addEventListener("click", () => {
                    window.open(lesson.hotmart, "_blank");
                });

                lessonCards.appendChild(div);
            });

            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
        });
    });

    // Fechar modal
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    });

    // Fechar modal ao clicar fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
        }
    });

    // Intersection Observer para animações (opcional)
    const observerOptions = { root: null, threshold: 0.2, rootMargin: '0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    document.querySelectorAll('.card, .foto-instrutor, .sobre-texto, .contact-form').forEach(el => observer.observe(el));
});
