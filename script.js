// Pré-loader
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
    }, 800);
    
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 1300);
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const backToTop = document.querySelector('.back-to-top');
    
    if (window.scrollY > 100) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
    
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// Botão voltar ao topo
document.querySelector('.back-to-top').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Filtros de portfólio
document.querySelectorAll('.portfolio-filter').forEach(filter => {
    filter.addEventListener('click', function() {
        document.querySelectorAll('.portfolio-filter').forEach(f => {
            f.classList.remove('active');
        });
        this.classList.add('active');
        
        const category = this.dataset.filter;
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        portfolioItems.forEach(item => {
            if (category === 'all' || item.dataset.category.includes(category)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Validação de formulário
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validação básica
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const service = document.getElementById('service').value;

        if (name === '' || email === '' || message === '' || service === '') {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        // Simular envio
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        contactForm.reset();
    });
}

// Menu responsivo
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navCta = document.querySelector('.nav-cta');

navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    
    navMenu.classList.toggle('active');
    navCta.classList.toggle('active');
    
    // Mudar ícone
    if (navMenu.classList.contains('active')) {
        navToggle.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Fechar menu quando um link é clicado
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navCta.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Animação de scroll suave para links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Visualização 3D com Three.js
function init3DVisualization() {
    const container = document.getElementById('model-container');
    if (!container) return;

    // Configurar cena
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf9f7f3);
    scene.fog = new THREE.Fog(0xf9f7f3, 20, 100);
    
    // ... (restante do código 3D) ...
}

// Garantir que Three.js está carregado
if (typeof THREE !== 'undefined') {
    init3DVisualization();
} else {
    console.error("Three.js não foi carregado corretamente");
}
