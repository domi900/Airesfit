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
    const moduleData = {
        step: {
            videoID: "CWMif0lvfmM", // ID do vídeo do YouTube para Step
            lessons: [
                { title: "Módulo 1 de Coreografia", hotmart: "https://go.hotmart.com/F102720032Q?dp=1" },
                { title: "Módulo 2 de Coreografia", hotmart: "https://go.hotmart.com/Y102720323R?dp=1" },
                { title: "Módulo 3 de Coreografia", hotmart: "https://go.hotmart.com/D102720815P?dp=1" },
                { title: "Módulo 4 Aula de Resistência", hotmart: "https://go.hotmart.com/B102834467T?dp=1" },
                { title: "Pack de Musicas Atualizadas", hotmart: "https://pay.hotmart.com/R102834684X" },
            ]
        },
        emagrecimento: {
            videoID: "gHKWEl4JXa8", // <--- Coloque aqui o ID do novo vídeo (ex: dQw4w9WgXcQ)
            lessons: [
                { title: "Módulo 1 de Emagrecimento em Casa", hotmart: "https://go.hotmart.com/X103070642O?dp=1" },
            ]
        }
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
            const moduleKey = card.getAttribute('data-module');
            const title = card.querySelector('h3').textContent;
            
            // Busca os dados do módulo clicado (ou retorna vazio se não achar)
            const data = moduleData[moduleKey];

            if (!data) return; // Segurança caso o módulo não exista

            modalTitle.textContent = title;
            lessonCards.innerHTML = '';

            // INSERE O VÍDEO ESPECÍFICO DO MÓDULO
            videoContainer.innerHTML = `
                <iframe 
                    src="https://www.youtube.com/embed/${data.videoID}?autoplay=1" 
                    style="width:100%;height:350px;border-radius:15px;border:none;box-shadow: 0 5px 15px rgba(0,0,0,0.3);" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
                </iframe>
            `;

            // GERA OS CARDS DAS AULAS
            data.lessons.forEach(lesson => {
                const div = document.createElement('div');
                div.className = 'lesson-item-card';

                div.innerHTML = `
                    <strong>${lesson.title}</strong>
                    <button class="buy-btn">Adquirir</button>
                `;

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
        // Limpa o container de vídeo para parar o som ao fechar
        videoContainer.innerHTML = '';
    });

    // Fechar modal ao clicar fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
             // Limpa o container de vídeo para parar o som ao fechar
             videoContainer.innerHTML = '';
        }
    });

    // Intersection Observer para animações
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