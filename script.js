// Pré-loader
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
    }, 800); // Tempo para a opacidade diminuir
    
    setTimeout(() => {
        preloader.style.display = 'none'; // Remove o elemento do fluxo depois da transição
    }, 1300); // Tempo total para o preloader sumir (800ms da transição + 500ms de delay)
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
    
    // Show/hide back to top button
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
        // Remove 'active' de todos os filtros
        document.querySelectorAll('.portfolio-filter').forEach(f => {
            f.classList.remove('active');
        });
        // Adiciona 'active' ao filtro clicado
        this.classList.add('active');
        
        const category = this.dataset.filter; // 'all', 'residencial', etc.
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        portfolioItems.forEach(item => {
            if (category === 'all' || item.dataset.category.includes(category)) {
                item.style.display = 'block'; // Mostra o item
            } else {
                item.style.display = 'none'; // Esconde o item
            }
        });
    });
});

// Validação de formulário
const contactForm = document.getElementById('contact-form');
if (contactForm) { // Garante que o formulário existe antes de adicionar o listener
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Impede o envio padrão do formulário
        
        // Validação básica dos campos
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const service = document.getElementById('service').value; // Valor do select

        if (name === '' || email === '' || message === '' || service === '') {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return; // Interrompe a função se houver campos vazios
        }
        
        // Validação de e-mail simples (pode ser mais robusta)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um endereço de e-mail válido.');
            return;
        }

        // Simular envio
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        contactForm.reset(); // Limpa o formulário após o "envio"
    });
}

// Menu responsivo
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navCta = document.querySelector('.nav-cta'); // O botão CTA no menu responsivo

navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    
    navMenu.classList.toggle('active');
    navCta.classList.toggle('active'); // Também alterna a classe do CTA
    
    // Mudar ícone do toggle
    if (navMenu.classList.contains('active')) {
        navToggle.innerHTML = '<i class="fas fa-times"></i>'; // Ícone de fechar
    } else {
        navToggle.innerHTML = '<i class="fas fa-bars"></i>'; // Ícone de menu
    }
});

// Fechar menu quando um link é clicado (para navegação em seção)
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navCta.classList.remove('active'); // Fecha o CTA também
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Animação de scroll suave para links de âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Previne o comportamento padrão do link

        const targetId = this.getAttribute('href'); // Obtém o ID da seção (ex: "#hero")
        const target = document.querySelector(targetId); // Seleciona o elemento alvo

        if (target) {
            // Calcula a posição de rolagem, descontando a altura do cabeçalho fixo
            const headerHeight = document.querySelector('header').offsetHeight;
            const offsetTop = target.offsetTop - headerHeight;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth' // Rolagem suave
            });
        }
    });
});

// Visualização 3D com Three.js (Certifique-se de que a biblioteca Three.js esteja carregada)
// Adicionado verificação se Three.js está definido antes de chamar init3DVisualization
if (typeof THREE !== 'undefined') {
    init3DVisualization();
} else {
    console.error("Three.js não foi carregado corretamente. A visualização 3D não funcionará.");
    // Opcional: Adicionar um placeholder ou mensagem para o usuário no container
    const container = document.getElementById('model-container');
    if (container) {
        container.innerHTML = '<p style="color: white; padding: 20px;">Não foi possível carregar a visualização 3D. Por favor, verifique sua conexão ou tente novamente mais tarde.</p>';
    }
}


function init3DVisualization() {
    const container = document.getElementById('model-container');
    if (!container) {
        console.warn("Elemento #model-container não encontrado. Visualização 3D não será inicializada.");
        return;
    }

    // Configurar cena
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf9f7f3); // Cor de fundo do Three.js (var(--light))
    scene.fog = new THREE.Fog(0xf9f7f3, 20, 100); // Nevoeiro suave

    // Configurar câmera
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 5, 15); // Posição inicial da câmera
    camera.lookAt(0, 5, 0); // Ponto para onde a câmera está olhando

    // Configurar renderizador
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Adicionar iluminação
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Adicionar um modelo simples de construção (exemplo: cubo)
    // Em um projeto real, você carregaria um modelo 3D (GLTF, OBJ, etc.) aqui.
    const geometry = new THREE.BoxGeometry(10, 8, 10);
    const material = new THREE.MeshStandardMaterial({ color: 0x8B7355 }); // Cor marrom (var(--secondary))
    const building = new THREE.Mesh(geometry, material);
    building.position.set(0, 4, 0); // Ajustar posição para ficar em "cima do chão"
    building.castShadow = true;
    building.receiveShadow = true;
    scene.add(building);
    
    // Adicionar um plano para simular o chão
    const planeGeometry = new THREE.PlaneGeometry(100, 100);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xE8E5DF, side: THREE.DoubleSide }); // var(--light-gray)
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = Math.PI / 2; // Gira para ficar horizontal
    plane.position.y = 0;
    plane.receiveShadow = true;
    scene.add(plane);


    // Configurar controles (botões de rotação e reset)
    let rotateModel = false; // Flag para controlar a rotação automática
    let rotationSpeed = 0.005; // Velocidade da rotação

    const rotateBtn = document.getElementById('rotate-btn');
    const resetBtn = document.getElementById('reset-btn');

    if (rotateBtn) {
        rotateBtn.addEventListener('click', () => {
            rotateModel = !rotateModel;
            rotateBtn.innerHTML = rotateModel ? 
                '<i class="fas fa-pause"></i> Pausar Rotação' : 
                '<i class="fas fa-sync-alt"></i> Girar Modelo';
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            building.rotation.y = 0; // Reseta a rotação do modelo
            camera.position.set(0, 5, 15); // Reseta a posição da câmera
            camera.lookAt(0, 5, 0); // Reseta para onde a câmera está olhando
        });
    }

    // Animação da cena
    const animate = () => {
        requestAnimationFrame(animate); // Loop de animação

        if (rotateModel) {
            building.rotation.y += rotationSpeed; // Rotaciona o modelo
        }
        
        renderer.render(scene, camera); // Renderiza a cena
    };

    // Redimensionamento responsivo do renderizador 3D
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    animate(); // Inicia a animação
}
