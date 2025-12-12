// --- 1. Dados dos Destinos (Simulando um Banco de Dados) ---
const destinationsData = [
    {
        id: 1,
        title: "Paris",
        location: "França",
        price: 4500,
        category: "Cidade",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
        desc: "A cidade luz espera por você. Inclui visita à Torre Eiffel, Museu do Louvre e um jantar romântico no Sena."
    },
    {
        id: 2,
        title: "Santorini",
        location: "Grécia",
        price: 6200,
        category: "Praia",
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
        desc: "Pôr do sol inesquecível, arquitetura branca e mar azul profundo. Perfeito para casais em lua de mel."
    },
    {
        id: 3,
        title: "Tokyo",
        location: "Japão",
        price: 8900,
        category: "Exótico",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
        desc: "Uma mistura fascinante de tradição e tecnologia futurista. Templos antigos ao lado de arranha-céus neon."
    },
    {
        id: 4,
        title: "Rio de Janeiro",
        location: "Brasil",
        price: 1200,
        category: "Praia",
        image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=800&q=80",
        desc: "Maravilhe-se com a cidade maravilhosa. Pacote inclui tour pelo Cristo Redentor e Pão de Açúcar."
    },
    {
        id: 5,
        title: "Nova York",
        location: "EUA",
        price: 5100,
        category: "Cidade",
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80",
        desc: "A cidade que nunca dorme. Explore a Times Square, Central Park e assista a um show na Broadway."
    },
    {
        id: 6,
        title: "Maldivas",
        location: "Ásia",
        price: 12500,
        category: "Praia",
        image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=800&q=80",
        desc: "O paraíso na terra. Bangalôs sobre a água cristalina e vida marinha exuberante."
    },
    {
        id: 7,
        title: "Alpes Suíços",
        location: "Suíça",
        price: 9500,
        category: "Montanha",
        image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&q=80",
        desc: "Esqui, chocolate quente e paisagens de tirar o fôlego nas montanhas mais famosas da Europa."
    },
    {
        id: 8,
        title: "Machu Picchu",
        location: "Peru",
        price: 3800,
        category: "Exótico",
        image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80",
        desc: "Explore a cidade perdida dos Incas. Uma jornada histórica e espiritual nas montanhas andinas."
    }
];

let favorites = JSON.parse(localStorage.getItem('horizonteFavorites')) || [];
let currentFilter = 'all';

// --- 2. Inicialização e Preloader ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    setTimeout(() => preloader.remove(), 500);

    checkTheme(); // Check theme FIRST
    renderDestinations(destinationsData);
    updateFavoritesUI();

    // Force navbar update based on initial scroll and theme
    updateNavbar();
});

// Navbar Scroll Effect Logic (Separated for reuse)
function updateNavbar() {
    const nav = document.getElementById('mainNav');
    const logoText = nav.querySelector('.navbar-brand');
    const navLinks = nav.querySelectorAll('.nav-link');
    const isDark = document.body.classList.contains('dark-mode');

    if (window.scrollY > 50) {
        nav.classList.add('scrolled');

        if (isDark) {
            nav.classList.add('dark-mode-nav');
            // In dark mode scrolled: keep text white/light
            nav.classList.add('navbar-dark');
            nav.classList.remove('navbar-light');
            logoText.classList.remove('text-primary');
            logoText.classList.add('text-white');
            navLinks.forEach(link => link.classList.remove('text-dark'));
        } else {
            nav.classList.remove('dark-mode-nav');
            // In light mode scrolled: white bg, dark text
            nav.classList.add('navbar-light');
            nav.classList.remove('navbar-dark');
            logoText.classList.remove('text-white');
            logoText.classList.add('text-primary');
            navLinks.forEach(link => link.classList.add('text-dark'));
        }
    } else {
        // Top of page: always transparent background, white text
        nav.classList.remove('scrolled', 'navbar-light', 'dark-mode-nav');
        nav.classList.add('navbar-dark');
        logoText.classList.add('text-white');
        logoText.classList.remove('text-primary');
        navLinks.forEach(link => link.classList.remove('text-dark'));
    }
}

window.addEventListener('scroll', updateNavbar);

// --- 3. Renderização Dinâmica ---
function renderDestinations(data) {
    const grid = document.getElementById('destinationsGrid');
    grid.innerHTML = '';

    if (data.length === 0) {
        document.getElementById('noResults').classList.remove('d-none');
        return;
    } else {
        document.getElementById('noResults').classList.add('d-none');
    }

    data.forEach((item, index) => {
        const isFav = favorites.includes(item.id);
        const delay = index * 100; // Stagger animation

        const cardHTML = `
            <div class="col-md-6 col-lg-3 animate__animated animate__fadeInUp" style="animation-delay: ${delay}ms">
                <div class="card destination-card h-100 shadow-sm">
                    <div class="card-img-wrapper">
                        <img src="${item.image}" class="destination-img" alt="${item.title}">
                        <div class="card-heart ${isFav ? 'active' : ''}" onclick="toggleFavorite(${item.id}, this)">
                            <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart ${isFav ? 'text-danger' : 'text-muted'}"></i>
                        </div>
                        <span class="badge bg-white text-dark position-absolute bottom-0 start-0 m-3 shadow-sm fw-bold">
                            ${item.category}
                        </span>
                    </div>
                    <div class="card-body p-4">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h5 class="card-title fw-bold mb-0">${item.title}</h5>
                            <small class="text-muted"><i class="fa-solid fa-location-dot me-1"></i>${item.location}</small>
                        </div>
                        <p class="card-text text-primary fw-bold mb-3">R$ ${item.price.toLocaleString('pt-BR')}</p>
                        <button class="btn btn-outline-primary w-100 rounded-pill" onclick="openModal(${item.id})">
                            Ver Detalhes
                        </button>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += cardHTML;
    });
}

// --- 4. Filtros ---
function filterByCategory(category) {
    currentFilter = category;

    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        if(btn.textContent.includes(category) || (category === 'all' && btn.textContent === 'Todos')) {
            btn.classList.add('active');
        }
    });

    if (category === 'all') {
        renderDestinations(destinationsData);
    } else {
        const filtered = destinationsData.filter(d => d.category === category);
        renderDestinations(filtered);
    }
}

function handleSearch() {
    const term = document.getElementById('searchInput').value.toLowerCase();
    const filtered = destinationsData.filter(d =>
        d.title.toLowerCase().includes(term) ||
        d.location.toLowerCase().includes(term) ||
        d.category.toLowerCase().includes(term)
    );
    renderDestinations(filtered);
    document.getElementById('destinos').scrollIntoView({ behavior: 'smooth' });
}

function resetFilters() {
    document.getElementById('searchInput').value = '';
    filterByCategory('all');
}

// --- 5. Sistema de Favoritos ---
function toggleFavorite(id, btnElement) {
    const index = favorites.indexOf(id);
    // Handling click from different contexts
    const icon = btnElement ? btnElement.querySelector('i') : null;

    if (index === -1) {
        favorites.push(id);
        if(btnElement) {
            btnElement.classList.add('active');
            if(icon) {
                icon.classList.remove('fa-regular', 'text-muted');
                icon.classList.add('fa-solid', 'text-danger');
            }
        }
    } else {
        favorites.splice(index, 1);
        if(btnElement) {
            btnElement.classList.remove('active');
            if(icon) {
                icon.classList.remove('fa-solid', 'text-danger');
                icon.classList.add('fa-regular', 'text-muted');
            }
        }
    }

    localStorage.setItem('horizonteFavorites', JSON.stringify(favorites));
    updateFavoritesUI();

    // Re-render grid to update icons if changed from offcanvas/modal
    if(!btnElement) renderDestinations(destinationsData);
}

// Wrapper for modal button
function toggleFavoriteFromModal() {
    if(currentModalId) toggleFavorite(currentModalId, null);
    detailsModal.hide();
}

function updateFavoritesUI() {
    // CORREÇÃO: Pega o count tanto no Navbar quanto no Offcanvas (novo ID)
    const countBadgeNav = document.getElementById('favCount');
    const countBadgeOffcanvas = document.getElementById('favCountOffcanvas'); // NOVO ID no HTML

    const listContainer = document.getElementById('favoritesList');
    const emptyMsg = document.getElementById('emptyFavorites');

    // Atualiza ambos os contadores (se existirem)
    if (countBadgeNav) countBadgeNav.textContent = favorites.length;
    if (countBadgeOffcanvas) countBadgeOffcanvas.textContent = favorites.length;

    if (favorites.length === 0) {
        listContainer.innerHTML = '';
        emptyMsg.classList.remove('d-none');
    } else {
        emptyMsg.classList.add('d-none');
        listContainer.innerHTML = '';

        favorites.forEach(favId => {
            const item = destinationsData.find(d => d.id === favId);
            if(item) {
                listContainer.innerHTML += `
                    <div class="d-flex align-items-center gap-3 bg-white p-2 rounded shadow-sm border favorite-item">
                        <img src="${item.image}" class="rounded" width="60" height="60" style="object-fit:cover;">
                        <div class="flex-grow-1">
                            <h6 class="mb-0 fw-bold text-dark">${item.title}</h6>
                            <small class="text-primary">R$ ${item.price.toLocaleString('pt-BR')}</small>
                        </div>
                        <button class="btn btn-sm text-danger" onclick="toggleFavorite(${item.id}, null)">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                `;
            }
        });
    }
}

// --- 6. Modal ---
const detailsModal = new bootstrap.Modal(document.getElementById('detailsModal'));
let currentModalId = null;

function openModal(id) {
    const item = destinationsData.find(d => d.id === id);
    currentModalId = id;

    document.getElementById('modalImg').src = item.image;
    document.getElementById('modalTitle').textContent = item.title;
    document.getElementById('modalLocation').textContent = item.location;
    document.getElementById('modalDesc').textContent = item.desc;
    document.getElementById('modalPrice').textContent = `R$ ${item.price.toLocaleString('pt-BR')}`;

    const baseTemp = item.category === 'Montanha' ? 5 : item.category === 'Praia' ? 28 : 20;
    const randomVar = Math.floor(Math.random() * 5);
    const temp = baseTemp + randomVar;

    document.getElementById('modalTemp').textContent = `${temp}°C`;
    document.getElementById('modalFeel').textContent = `${temp + 2}°C`;
    document.getElementById('modalHumidity').textContent = `${50 + Math.floor(Math.random()*30)}%`;

    detailsModal.show();
}

// --- 7. Chat Widget ---
function toggleChat() {
    const chatBox = document.getElementById('chatBox');
    if (chatBox.style.display === 'flex') {
        chatBox.style.display = 'none';
    } else {
        chatBox.style.display = 'flex';
        document.getElementById('chatInput').focus();
    }
}

function handleChatKey(e) {
    if (e.key === 'Enter') sendMessage();
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    const msgContainer = document.getElementById('chatMessages');

    if (!text) return;

    msgContainer.innerHTML += `<div class="message user animate__animated animate__fadeInRight">${text}</div>`;
    input.value = '';
    msgContainer.scrollTop = msgContainer.scrollHeight;

    setTimeout(() => {
        let reply = "Interessante! Posso te ajudar a reservar esse destino. Quer falar com um humano?";

        if(text.toLowerCase().includes('preço') || text.toLowerCase().includes('valor')) {
            reply = "Nossos pacotes variam de R$ 1.200 a R$ 15.000. Tem algum orçamento em mente?";
        } else if (text.toLowerCase().includes('oi') || text.toLowerCase().includes('ola')) {
            reply = "Olá! Em que destino você está pensando hoje?";
        }

        msgContainer.innerHTML += `<div class="message bot animate__animated animate__fadeInLeft">${reply}</div>`;
        msgContainer.scrollTop = msgContainer.scrollHeight;
    }, 1000);
}

// --- 8. Dark Mode ---
const themeBtn = document.getElementById('themeToggle');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('horizonteTheme', isDark ? 'dark' : 'light');

    themeBtn.innerHTML = isDark ? '<i class="fa-solid fa-sun fs-5"></i>' : '<i class="fa-solid fa-moon fs-5"></i>';
    updateNavbar(); 
});

function checkTheme() {
    const savedTheme = localStorage.getItem('horizonteTheme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeBtn.innerHTML = '<i class="fa-solid fa-sun fs-5"></i>';
    }
}