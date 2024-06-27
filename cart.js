import { submitForm } from './main.js';

let hours;

const products = [
    { id: 1, name: 'football', quantity: 50, ticket_no: null, time: null },
    { id: 2, name: 'cricket', quantity: 50, ticket_no: null, time: null },
    { id: 3, name: 'table-tennis', quantity: 50, ticket_no: null, time: null },
    { id: 4, name: 'tennis', quantity: 50, ticket_no: null, time: null },
    { id: 5, name: 'badminton', quantity: 50, ticket_no: null, time: null },
    { id: 6, name: 'swimming', quantity: 50, ticket_no: null, time: null },
    { id: 7, name: 'volleyball', quantity: 50, ticket_no: null, time: null },
    { id: 8, name: 'chess', quantity: 50, ticket_no: null, time: null },
    { id: 9, name: 'basketball', quantity: 50, ticket_no: null, time: null },
];

let cart = [];
let Time = [];
let c = 1;

function displayProducts() {
    const productsDiv = document.getElementById('products');
    productsDiv.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';

        if (product.quantity === 0) {
            productDiv.classList.add('out-of-stock');
            productDiv.innerHTML = `
                <h3>${product.name}</h3>
                <h4>Out of Stock</h4>
            `;
        } else {
            productDiv.innerHTML = `
                <h3>${product.name}</h3>
                <p>Quantity: ${product.quantity}</p>
                <input type="number" id="quantity-${product.id}" placeholder="Enter the quantity">
                <button onclick="update(${product.id})">Add to Cart</button>
            `;
        }

        productsDiv.appendChild(productDiv);
    });
}



function displayCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '';
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'product';
        itemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p>Quantity: ${item.quantity}</p>
            <p><button onclick="removeFromCart(${item.ticket_no}, ${item.id})">Remove</button>
            <button onclick="submit(${item.ticket_no}, ${item.id})">Submit</button></p>
        `;
        cartDiv.appendChild(itemDiv);
    });
}

window.submit = function(ticket_no, id) {
    alert("Item has been submitted and removed from the cart.");

    const cartItem = cart.find(item => item.ticket_no === ticket_no);

    if (!cartItem) {
        console.error(`Cart item with ticket_no ${ticket_no} not found.`);
        return;
    }

    const quantityToRemove = cartItem.quantity;
    console.log("Removing item from cart");

    const product = products.find(p => p.id === id);
    if (!product) {
        console.error(`Product with id ${id} not found.`);
        return;
    }

    console.log(`Quantity to remove: ${quantityToRemove}`);
    let total = product.quantity;
    console.log(`Current stock: ${total}`);

    total = total + quantityToRemove;
    product.quantity = total;
    console.log(`Updated stock: ${total}`);

    const submitTime = new Date().toISOString(); // Current time of submission
    const addedTime = cartItem.time; // Get added time from cart item
    const isOnTime = checkOnTime(addedTime, submitTime); // Check if the submission is on time

    console.log(`Added Time: ${addedTime}`);
    console.log(`Submit Time: ${submitTime}`);
    console.log(`Ticket is ${isOnTime ? 'on time ' : `late you have a fine of Rs:10`}`);

    cart = cart.filter(item => item.ticket_no !== ticket_no);

    displayCart(); // Update the cart display
    displayProducts(); // Update product display to reflect the new quantities

    // Log the times for the submission
    const logEntry = {
        ticket: ticket_no,
        addedTime: addedTime,
        submitTime: submitTime,
        status: isOnTime ? 'on time' : 'late'
    };
    console.log(logEntry);
    Time.push(logEntry);

    // Call submitForm function
    submitForm();
}

window.addToCart = function(id) {
    const quantityInput = document.getElementById(`quantity-${id}`);
    const quantity = parseInt(quantityInput.value);

    if (isNaN(quantity) || quantity <= 0) {
        alert("Please enter a valid quantity");
        return;
    }

    const product = products.find(p => p.id === id);
    console.log(quantity);
    product.ticket_no = c;
    let total = product.quantity;

    total = total - quantity;
    product.quantity = total;
    console.log(total);

    const addedTime = new Date().toISOString(); // Current time when item is added to cart
    console.log(addedTime);

    console.log(c);
    c = c + 1;
    cart.push({ ...product, quantity: quantity, time: addedTime });
    displayCart();
    displayProducts();
}

window.removeFromCart = function(ticket_no, id) {
    const cartItem = cart.find(item => item.ticket_no === ticket_no);

    if (!cartItem) {
        console.error(`Cart item with ticket_no ${ticket_no} not found.`);
        return;
    }

    const quantityToRemove = cartItem.quantity;
    console.log("Removing item from cart");

    const product = products.find(p => p.id === id);
    if (!product) {
        console.error(`Product with id ${id} not found.`);
        return;
    }

    console.log(`Quantity to remove: ${quantityToRemove}`);
    let total = product.quantity;
    console.log(`Current stock: ${total}`);

    total = total + quantityToRemove;
    product.quantity = total;
    console.log(`Updated stock: ${total}`);

    cart = cart.filter(item => item.ticket_no !== ticket_no);

    displayCart(); // Update the cart display
    displayProducts(); // Update product display to reflect the new quantities
}

window.update = function(id) {
    const quantityInput = document.getElementById(`quantity-${id}`).value;
    const quantity = parseInt(quantityInput, 10);
    if (isNaN(quantity) || quantity <= 0) {
        alert("Please enter a valid quantity");
        return;
    }

    const product = products.find(p => p.id === id);
    const total = product.quantity;

    if (total >= quantity) {
        addToCart(product.id);
    } else {
        alert("Not enough items in stock");
    }
}

displayProducts();
displayCart();

function checkOnTime(addedTime, submitTime) {
    const addedDate = new Date(addedTime);
    const submitDate = new Date(submitTime);
    const addedDay = addedDate.getSeconds();
    const submitDay = submitDate.getSeconds();
    const diffInMs = submitDay - addedDay;

    return diffInMs >= 10; // Consider on time if submitted within 10 seconds
}
