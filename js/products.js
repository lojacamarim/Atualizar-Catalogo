// ============================================
// GERENCIAMENTO DE PRODUTOS
// ============================================

// Dados dos produtos
const productsData = {
    "products": [
        {
            "id": "CAM-00002",
            "name": "Sandália Moleca - Marrom",
            "category": "Shoes",
            "sellingPrice": 100,
            "stock": 3,
            "discount": 30,
            "images": ["2.webp"]
        },
        {
            "id": "CAM-00003",
            "name": "Sandália Moleca - Preto",
            "category": "Shoes",
            "sellingPrice": 100,
            "stock": 3,
            "discount": 30,
            "images": ["3.webp"]
        },
        {
            "id": "CAM-00004",
            "name": "Sandália Viamarte - Branco",
            "category": "Shoes",
            "sellingPrice": 105,
            "stock": 6,
            "discount": 30,
            "images": ["4.webp"]
        },
        {
            "id": "CAM-00005",
            "name": "Sandália Grendha - Preto",
            "category": "Shoes",
            "sellingPrice": 49.90,
            "stock": 4,
            "discount": 15,
            "images": ["5.webp"]
        },
        {
            "id": "CAM-00006",
            "name": "Sandália Viamarte Napa Casual - Preto",
            "category": "Shoes",
            "sellingPrice": 139.90,
            "stock": 2,
            "discount": 0,
            "images": ["6.webp"]
        },
        {
            "id": "CAM-00007",
            "name": "Sandália Beira Rio - Nude",
            "category": "Shoes",
            "sellingPrice": 100,
            "stock": 9,
            "discount": 30,
            "images": ["7.webp"]
        },
        {
            "id": "CAM-00008",
            "name": "Sandália Beira Rio - Preto",
            "category": "Shoes",
            "sellingPrice": 59.90,
            "stock": 1,
            "discount": 18,
            "images": ["8.webp"]
        },
        {
            "id": "CAM-00010",
            "name": "Vizzano Papete - Marrom",
            "category": "Shoes",
            "sellingPrice": 139.90,
            "stock": 0,
            "discount": 14,
            "images": ["10.webp"]
        },
        {
            "id": "CAM-00011",
            "name": "Papete Tira - Marrom",
            "category": "Shoes",
            "sellingPrice": 160,
            "stock": 2,
            "discount": 30,
            "images": ["11.webp"]
        },
        {
            "id": "CAM-00012",
            "name": "Rasteirinha",
            "category": "Shoes",
            "sellingPrice": 40,
            "stock": 6,
            "discount": 0,
            "images": ["12.webp", "12-1.webp", "12-2.webp", "12-3.webp", "12-4.webp", "12-5.webp"]
        },
        {
            "id": "CAM-00013",
            "name": "Vizzano Tira Pronta - Preto",
            "category": "Shoes",
            "sellingPrice": 149.90,
            "stock": 1,
            "discount": 15,
            "images": ["13.webp"]
        },
        {
            "id": "CAM-00014",
            "name": "Bolsa com Carteira",
            "category": "Bags",
            "sellingPrice": 140,
            "stock": 7,
            "discount": 25,
            "images": ["14.webp"]
        },
        {
            "id": "CAM-00015",
            "name": "Bolsa Coração",
            "category": "Bags",
            "sellingPrice": 120,
            "stock": 6,
            "discount": 25,
            "images": ["15.webp"]
        },
        {
            "id": "CAM-00016",
            "name": "Bolsa Bella Paula",
            "category": "Bags",
            "sellingPrice": 80,
            "stock": 2,
            "discount": 20,
            "images": ["16.webp"]
        },
        {
            "id": "CAM-00017",
            "name": "Bolsa Beaclea Grande",
            "category": "Bags",
            "sellingPrice": 150,
            "stock": 2,
            "discount": 15,
            "images": ["17.webp"]
        },
        {
            "id": "CAM-00018",
            "name": "Bolsa Beaclea Pequena",
            "category": "Bags",
            "sellingPrice": 100,
            "stock": 1,
            "discount": 10,
            "images": ["18.webp"]
        },
        {
            "id": "CAM-00020",
            "name": "Carteira Classic & Modern Fashion",
            "category": "Bags",
            "sellingPrice": 50,
            "stock": 1,
            "discount": 15,
            "images": ["20.webp", "20-1.webp"]
        },
        {
            "id": "CAM-00021",
            "name": "Bolsa Bella Paula Bag",
            "category": "Bags",
            "sellingPrice": 120,
            "stock": 2,
            "discount": 25,
            "images": ["21.webp"]
        },
        {
            "id": "CAM-00022",
            "name": "Carteira Bella Paula",
            "category": "Bags",
            "sellingPrice": 80,
            "stock": 1,
            "discount": 30,
            "images": ["22.webp"]
        },
        {
            "id": "CAM-00023",
            "name": "Bolsa Kuihou",
            "category": "Bags",
            "sellingPrice": 170,
            "stock": 1,
            "discount": 20,
            "images": ["23.webp"]
        },
        {
            "id": "CAM-00024",
            "name": "Cinto Elástico",
            "category": "Belts",
            "sellingPrice": 19.90,
            "stock": 4,
            "discount": 0,
            "images": ["24.webp"]
        },
        {
            "id": "CAM-00025",
            "name": "Cinto Básico",
            "category": "Belts",
            "sellingPrice": 24.90,
            "stock": 2,
            "discount": 0,
            "images": ["25.webp"]
        },
        {
            "id": "CAM-00026",
            "name": "Cinto com Detalhes",
            "category": "Belts",
            "sellingPrice": 59.90,
            "stock": 3,
            "discount": 0,
            "images": ["26.webp"]
        },
        {
            "id": "CAM-00027",
            "name": "Cinto Mola",
            "category": "Belts",
            "sellingPrice": 15,
            "stock": 2,
            "discount": 0,
            "images": ["27.webp"]
        },
        {
            "id": "CAM-00028",
            "name": "Conjunto Legging + Top G",
            "category": "Activewear",
            "sellingPrice": 160,
            "stock": 5,
            "discount": 20,
            "images": ["28.webp", "28-1.webp", "28-2.webp", "28-3.webp", "28-4.webp", "28-5.webp"]
        },
        {
            "id": "CAM-00029",
            "name": "Conjunto Legging + Top M",
            "category": "Activewear",
            "sellingPrice": 160,
            "stock": 5,
            "discount": 20,
            "images": ["29.webp", "29-1.webp", "29-2.webp", "29-3.webp", "29-4.webp", "29-5.webp"]
        },
        {
            "id": "CAM-00030",
            "name": "Conjunto Legging + Top P",
            "category": "Activewear",
            "sellingPrice": 140,
            "stock": 1,
            "discount": 15,
            "images": ["30.webp", "30-1.webp", "30-2.webp"]
        },
        {
            "id": "CAM-00031",
            "name": "Conjunto Short + Top M",
            "category": "Activewear",
            "sellingPrice": 140,
            "stock": 2,
            "discount": 15,
            "images": ["31.webp", "31-1.webp", "31-2.webp"]
        },
        {
            "id": "CAM-00032",
            "name": "Macaquinho M",
            "category": "Activewear",
            "sellingPrice": 120,
            "stock": 4,
            "discount": 15,
            "images": ["32.webp", "32-1.webp", "32-2.webp", "32-3.webp", "32-4.webp", "32-5.webp", "32-6.webp"]
        },
        {
            "id": "CAM-00033",
            "name": "Short Alfaiataria - Tam. M",
            "category": "Clothing",
            "sellingPrice": 60,
            "stock": 3,
            "discount": 0,
            "images": ["33.webp", "33-1.webp", "33-2.webp"]
        },
        {
            "id": "CAM-00034",
            "name": "Short Algodão Cru - Tam. 36",
            "category": "Clothing",
            "sellingPrice": 100,
            "stock": 1,
            "discount": 0,
            "images": ["34.webp", "34-1.webp", "34-2.webp"]
        },
        {
            "id": "CAM-00035",
            "name": "Conjunto Verde Claro - Tam. G",
            "category": "Clothing",
            "sellingPrice": 140,
            "stock": 1,
            "discount": 0,
            "images": ["35.webp", "35-1.webp", "35-2.webp"]
        },
        {
            "id": "CAM-00036",
            "name": "Short 100% Algodão - Tam. 36",
            "category": "Clothing",
            "sellingPrice": 120,
            "stock": 1,
            "discount": 0,
            "images": ["36.webp", "36-1.webp"]
        },
        {
            "id": "CAM-00037",
            "name": "Short Alfaiataria - Tam. P",
            "category": "Clothing",
            "sellingPrice": 60,
            "stock": 2,
            "discount": 0,
            "images": ["37.webp", "37-1.webp"]
        },
        {
            "id": "CAM-00038",
            "name": "Conjunto Marrom - Tam. M",
            "category": "Clothing",
            "sellingPrice": 140,
            "stock": 1,
            "discount": 0,
            "images": ["38.webp"]
        },
        {
            "id": "CAM-00039",
            "name": "Short Alfaiataria - Tam. G",
            "category": "Clothing",
            "sellingPrice": 140,
            "stock": 3,
            "discount": 0,
            "images": ["39.webp", "39-1.webp"]
        }
    ]
};

// Configurações
const PRODUCT_CONFIG = {
    categoryIcons: {
        'Shoes': 'fas fa-shoe-prints',
        'Bags': 'fas fa-shopping-bag',
        'Belts': 'fas fa-grip-lines',
        'Activewear': 'fas fa-tshirt',
        'Clothing': 'fas fa-tshirt'
    },
    categoryNames: {
        'Shoes': 'Calçados',
        'Bags': 'Bolsas',
        'Belts': 'Cintos',
        'Activewear': 'Roupas Esportivas',
        'Clothing': 'Roupas Casuais'
    }
};

// Funções de estoque
function getStockClass(stock) {
    if (stock === 0) return 'stock-info out-of-stock';
    if (stock <= 2) return 'stock-info low-stock';
    return 'stock-info in-stock';
}

function getStockIcon(stock) {
    if (stock === 0) return 'fas fa-times-circle';
    if (stock <= 2) return 'fas fa-exclamation-circle';
    return 'fas fa-check-circle';
}

function getStockText(stock) {
    if (stock === 0) return 'Esgotado';
    return `${stock} uni.`;
}

// Obter caminhos das imagens
function getProductImagePaths(product) {
    if (product.images && product.images.length > 0) {
        return product.images.map(img => `img/${img}`);
    }
    const numericId = product.id.replace('CAM-', '').replace(/^0+/, '');
    return [`img/${numericId}.webp`];
}

// Gerar mensagem do WhatsApp para produto
function generateWhatsAppMessage(product, discountedPrice, discountPercent) {
    const message = `Olá! Tenho interesse no produto: ${product.name} (${product.id}).\n` +
                   `Preço original: ${window.utils.formatPrice(product.sellingPrice)}\n` +
                   `Preço com desconto: ${window.utils.formatPrice(discountedPrice)}\n` +
                   `Desconto aplicado: ${discountPercent}%\n` +
                   `Estoque disponível: ${product.stock} unidades\n` +
                   `Gostaria de mais informações ou fazer o pedido!`;
    
    return encodeURIComponent(message);
}

// Renderizar produtos
function renderProducts(filteredProducts, container) {
    container.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        document.getElementById('noProducts').style.display = 'block';
        document.getElementById('productsLoading').style.display = 'none';
        return;
    }
    
    document.getElementById('noProducts').style.display = 'none';
    
    filteredProducts.forEach((product, index) => {
        const discountedPrice = window.utils.calculateDiscountedPrice(product.sellingPrice, product.discount);
        const discountAmount = product.sellingPrice - discountedPrice;
        const stockClass = getStockClass(product.stock);
        const stockIcon = getStockIcon(product.stock);
        const stockText = getStockText(product.stock);
        const imagePaths = getProductImagePaths(product);
        
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.dataset.productId = product.id;
        productCard.style.animationDelay = `${index * 0.05}s`;
        
        productCard.innerHTML = `
            <div class="product-image-carousel" id="carousel-${product.id}"></div>
            <div class="category-badge">${PRODUCT_CONFIG.categoryNames[product.category] || product.category}</div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-meta">
                    <div class="product-id">Código: ${product.id}</div>
                    <div class="${stockClass}">
                        <i class="${stockIcon}"></i>
                        <span>${stockText}</span>
                    </div>
                </div>
                <div class="pricing">
                    <div class="original-price">${window.utils.formatPrice(product.sellingPrice)}</div>
                    <div class="discount-price">${window.utils.formatPrice(discountedPrice)}</div>
                    <div class="discount-badge">${product.discount}% OFF - Economize ${window.utils.formatPrice(discountAmount)}</div>
                    <div class="product-actions">
                        <button class="add-to-cart-btn" data-product-id="${product.id}" 
                                ${product.stock === 0 ? 'disabled' : ''}>
                            <i class="fas fa-cart-plus"></i> 
                            ${product.stock === 0 ? 'Esgotado' : 'Adicionar ao Carrinho'}
                        </button>
                        <button class="whatsapp-btn" data-product-id="${product.id}">
                            <i class="fab fa-whatsapp"></i> Comprar no WhatsApp
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(productCard);
        
        // Inicializar carrossel
        const carouselContainer = productCard.querySelector(`#carousel-${product.id}`);
        if (window.Carousel) {
            new window.Carousel(carouselContainer, imagePaths, product.id);
        }
        
        // Adicionar eventos
        if (product.stock > 0) {
            const addToCartBtn = productCard.querySelector('.add-to-cart-btn');
            addToCartBtn.addEventListener('click', () => {
                if (window.cartManager) {
                    window.cartManager.addToCart(product);
                }
            });
        }
        
        const whatsappBtn = productCard.querySelector('.whatsapp-btn');
        whatsappBtn.addEventListener('click', () => {
            const message = generateWhatsAppMessage(product, discountedPrice, product.discount);
            const whatsappURL = `https://wa.me/${window.utils.CONFIG.PHONE_NUMBER}?text=${message}`;
            window.open(whatsappURL, '_blank');
        });
    });
    
    // Inicializar lazy loading para novas imagens
    window.utils.initLazyLoading();
}

// Filtrar e ordenar produtos
function filterAndSortProducts(category, sort, search = '') {
    let filtered = productsData.products;
    
    // Filtrar por categoria
    if (category !== 'all') {
        filtered = filtered.filter(product => product.category === category);
    }
    
    // Filtrar por busca (se implementado)
    if (search.trim()) {
        const searchTerm = search.toLowerCase();
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.id.toLowerCase().includes(searchTerm)
        );
    }
    
    // Ordenar
    filtered.sort((a, b) => {
        switch(sort) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'price-low':
                return a.sellingPrice - b.sellingPrice;
            case 'price-high':
                return b.sellingPrice - a.sellingPrice;
            case 'discount':
                return b.discount - a.discount;
            default:
                return 0;
        }
    });
    
    return filtered;
}

// Exportar
window.productsManager = {
    productsData,
    PRODUCT_CONFIG,
    renderProducts,
    filterAndSortProducts,
    getProductImagePaths,
    generateWhatsAppMessage,
    getStockClass,
    getStockIcon,
    getStockText
};
