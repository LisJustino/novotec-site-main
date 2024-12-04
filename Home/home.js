const cartButton = document.querySelector('.cart-button');
const cartModal = document.getElementById('cart-modal');
const closeCartButton = document.getElementById('close-cart');
const clearCartButton = document.getElementById('clear-cart');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartOverlay = document.createElement('div');

cartOverlay.classList.add('cart-overlay');
document.body.appendChild(cartOverlay);

let cart = [];

function openCartModal() {
  cartModal.classList.add('open');
  cartOverlay.classList.add('open');
}

function closeCartModal() {
  cartModal.classList.remove('open');
  cartOverlay.classList.remove('open');
}

function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity}`;
    cartItems.appendChild(li);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function addToCart(name, price, quantity = 1) {
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ name, price, quantity });
  }
  updateCart();
  
  // Exibir mensagem de produto adicionado
  const message = document.createElement('div');
  message.classList.add('added-to-cart-message');
  message.textContent = `${name} adicionado ao carrinho!`;
  document.body.appendChild(message);

  // Remover a mensagem após 3 segundos
  setTimeout(() => {
    message.remove();
  }, 3000);
}

cartButton.addEventListener('click', openCartModal);
cartOverlay.addEventListener('click', closeCartModal);
closeCartButton.addEventListener('click', closeCartModal);
clearCartButton.addEventListener('click', () => {
  cart = [];
  updateCart();
});

// Alterando o comportamento dos botões de adicionar ao carrinho
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);
    const productDiv = button.closest('.produto');
    const quantityInput = productDiv.querySelector('.quantity');
    const quantity = parseInt(quantityInput.value);
    
    addToCart(name, price, quantity);
  });
});

// Adicionando funcionalidade para os botões "+" e "-" no seletor de quantidade
const quantityButtons = document.querySelectorAll('.quantity-btn');
quantityButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productDiv = button.closest('.produto');
    const quantityInput = productDiv.querySelector('.quantity');
    let quantity = parseInt(quantityInput.value);

    if (button.dataset.action === 'increase') {
      quantityInput.value = quantity + 1;
    } else if (button.dataset.action === 'decrease' && quantity > 1) {
      quantityInput.value = quantity - 1;
    }
  });
});
