// Seletor dos elementos DOM
const cartButton = document.querySelector('.cart-button');
const cartModal = document.querySelector('.cart-modal');
const closeCartButton = document.querySelector('#close-cart');
const clearCartButton = document.querySelector('#clear-cart');
const cartItemsList = document.querySelector('#cart-items');
const cartTotal = document.querySelector('#cart-total');
const cartCount = document.querySelector('#cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const quantitySelectors = document.querySelectorAll('.quantity-selector');

// Carrinho de Compras (simulação)
let cart = [];

// Função para formatar preço no formato brasileiro
function formatarPreco(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Função para adicionar produtos ao carrinho
function addToCart(name, price, image, quantity) {
    const existingProductIndex = cart.findIndex(item => item.name === name);
    if (existingProductIndex !== -1) {
        // Se o produto já estiver no carrinho, apenas aumenta a quantidade
        cart[existingProductIndex].quantity += quantity;
    } else {
        // Caso o produto não esteja no carrinho, adiciona um novo item
        cart.push({ name, price, image, quantity });
    }
    updateCartDisplay();
}

// Função para atualizar o carrinho exibido
function updateCartDisplay() {
  // Limpar a lista do carrinho
  cartItemsList.innerHTML = '<li class="cart-header"><span class="header-item">Produto</span><span class="header-item">Quantidade</span><span class="header-item">Valor</span></li>';
  let total = 0;

  cart.forEach(item => {
      // Cria um item da lista no modal com a imagem do produto
      const listItem = document.createElement('li');
      listItem.innerHTML = `
          <img src="${item.image}" alt="${item.name}" width="40">
          <span>${item.name}</span>
          <span>x${item.quantity}</span>
          <span>${formatarPreco(item.price * item.quantity)}</span>
      `;
      cartItemsList.appendChild(listItem);
      total += item.price * item.quantity;
  });

  // Atualizar o total e o contador do carrinho
  cartTotal.textContent = formatarPreco(total);
  cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

// Função para abrir o carrinho
cartButton.addEventListener('click', () => {
    cartModal.classList.add('active');
});

// Função para fechar o carrinho
closeCartButton.addEventListener('click', () => {
    cartModal.classList.remove('active');
});

// Função para limpar o carrinho
clearCartButton.addEventListener('click', () => {
    cart = [];
    updateCartDisplay();
});

// Função para controlar a quantidade dos produtos
quantitySelectors.forEach(selector => {
    const decreaseButton = selector.querySelector('[data-action="decrease"]');
    const increaseButton = selector.querySelector('[data-action="increase"]');
    const quantityInput = selector.querySelector('.quantity');

    decreaseButton.addEventListener('click', () => {
        let quantity = parseInt(quantityInput.value);
        if (quantity > 1) {
            quantityInput.value = quantity - 1;
        }
    });

    increaseButton.addEventListener('click', () => {
        let quantity = parseInt(quantityInput.value);
        quantityInput.value = quantity + 1;
    });
});

// Adicionar produtos ao carrinho quando clicar no botão "Adicionar ao Carrinho"
addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const productName = e.target.getAttribute('data-name');
        const productPrice = parseFloat(e.target.getAttribute('data-price'));
        const productImage = e.target.getAttribute('data-image');
        const productQuantity = parseInt(e.target.closest('.produto').querySelector('.quantity').value);

        addToCart(productName, productPrice, productImage, productQuantity);
    });
});

// Seletor da notificação
const notification = document.getElementById('notification');

// Função para adicionar produtos ao carrinho
function addToCart(name, price, image, quantity) {
    const existingProductIndex = cart.findIndex(item => item.name === name);
    if (existingProductIndex !== -1) {
        // Se o produto já estiver no carrinho, apenas aumenta a quantidade
        cart[existingProductIndex].quantity += quantity;
    } else {
        // Caso o produto não esteja no carrinho, adiciona um novo item
        cart.push({ name, price, image, quantity });
    }
    updateCartDisplay();
    showNotification(name); // Passa o nome do produto para a notificação
}

// Função para mostrar a notificação com o nome do produto
function showNotification(productName) {
    notification.textContent = `${productName} adicionado ao seu carrinho!`; // Exibe o nome do produto na notificação
    notification.style.display = 'block'; // Exibe a notificação
    setTimeout(() => {
        notification.style.display = 'none'; // Esconde a notificação após 3
    }, 3500); // Tempo em milissegundos
}

// Inicializar o contador de itens no carrinho
updateCartDisplay();
