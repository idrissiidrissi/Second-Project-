import shopItemsData from './Data.json' assert {type: 'json'}

let ShoppingCart = document.getElementById("shopping-cart");
let label = document.getElementById("label");

/**
 * ! Basket to hold all the selected items
 */

let basket = JSON.parse(localStorage.getItem("data")) || [];

/**
 * ! To calculate total amount of selected Items
 */

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item)

  .reduce((x, y) => x + y,0)
  
  
};



calculation();

/**
 * ! Generates the Cart Page with product cards composed of
 * ! images, title, price, buttons, & Total price
 */

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((x) => x.id === id) || [];
        let { img, price, name } = search;
        return `
        

      <div class="cart-item">
        <img width="150"height="160" src=${img} alt="" />

        <div class="details">
        
          <div class="title-price-x">
            <h4 class="title-price">
              <p>${name}</p>
              <p class="cart-item-price">$${price}</p>
            </h4>
            <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
          </div>

          <div class="cart-buttons">
            <div class="buttons">
              <i onclick="decrement(${id})" class="bi-dash-circle-fill"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="increment(${id})" class="bi-plus-circle-fill"></i>
            </div>
          </div>

       <h2>$${(item*price).toFixed(2)}</h2>
        
  
        </div>
      </div>
      `;
      })
      .join(""));
      
  } else {
    ShoppingCart.innerHTML = "";
    label.innerHTML = `
    <h2>Your Cart is Empty</h2>
    <a href="product.html">
      <button class="HomeBtn">Back to Shop</button>
    </a>
    `;
  }
};

generateCartItems();
  /**
 * ! used to increase the selected product item quantity by 1
 */
   
let increment = (id) => {
  
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! used to decrease the selected product item quantity by 1
 */

let decrement = (id) => {
  
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

window.decrement = decrement

window.increment = increment


/**
 * ! To update the digits of picked items on each item card
 */

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;

  calculation();
  
  TotalAmount();
  
};


/**
 * ! Used to remove 1 selected product card from basket
 * ! using the X [cross] button
 */

let removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem.id);
  calculation();
  generateCartItems();
  TotalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
  
};
window.removeItem = removeItem
/**
 * ! Used to calculate total amount of the selected Products
 * ! with specific quantity
 */

let TotalAmount = () => {
  
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { id, item } = x;
        let filterData = shopItemsData.find((x) => x.id === id);
        return filterData.price * item;
      
      })
      
      .reduce((x, y)=> x + y, 0).toFixed(2)
      
      

    return (label.innerHTML = `
    <h2>Total : $${amount}</h2>


    
    <button class="checkout" data-order-target="#order">Checkout</button>
  <div class="order" id="order">
    <div class="order-header">
      <div class="title">We apologize!</div>
      <button data-close-button class="close-button">&times;</button>
    </div>
    <div class="order-body">
        We are working to offer online order soon. For now you can 
        order by phone and pick up at the store in less than 2 hours!
        <a class="con"href="tel:859">call to order</a></p>
    </div>
  </div>
  <div id="overlay"></div>
  </div>

  <button onclick="clearCart()" class="removeAll">Clear Cart</button>

    `);
  } else return;
};


TotalAmount();


/**
 * ! Used to clear cart, and remove everything from local storage
 */

 let clearCart = () => {
  basket = [];
  generateCartItems();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));

};

window.clearCart = clearCart

/** 
 *! converter App
 */

 const dropList = document.querySelectorAll("form select"),
 fromCurrency = document.querySelector(".from select"),
 toCurrency = document.querySelector(".to select"),
 getButton = document.querySelector("form button");
 
 for (let i = 0; i < dropList.length; i++) {
     for(let currency_code in country_list){
         let selected = i == 0 ? currency_code == "USD" ? "selected" : "" : currency_code == "CAD" ? "selected" : "";
         let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
         dropList[i].insertAdjacentHTML("beforeend", optionTag);
     }
     dropList[i].addEventListener("change", e =>{
         loadFlag(e.target);
     });
 }
 
 function loadFlag(element){
     for(let code in country_list){
         if(code == element.value){
             let imgTag = element.parentElement.querySelector("img");
             imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
         }
     }
 }
 
 window.addEventListener("load", ()=>{
     getExchangeRate();
 });
 
 getButton.addEventListener("click", e =>{
     e.preventDefault();
     getExchangeRate();
 });
 
 const exchangeIcon = document.querySelector("form .bi-arrow-left-right");
 exchangeIcon.addEventListener("click", ()=>{
     let tempCode = fromCurrency.value;
     fromCurrency.value = toCurrency.value;
     toCurrency.value = tempCode;
     loadFlag(fromCurrency);
     loadFlag(toCurrency);
     getExchangeRate();
 })
 
 function getExchangeRate(){
     const amount = document.querySelector("form input");
     const exchangeRateTxt = document.querySelector("form .exchange-rate");
     let amountVal = amount.value;
     if(amountVal == "" || amountVal == "0"){
         amount.value = "1";
         amountVal = 1;
     }
     exchangeRateTxt.innerText = "Getting exchange rate...";
     let url = `https://v6.exchangerate-api.com/v6/5264215096b29c3dac752f88/latest/${fromCurrency.value}`;
     fetch(url).then(response => response.json()).then(result =>{
         let exchangeRate = result.conversion_rates[toCurrency.value];
         let totalExRate = (amountVal * exchangeRate).toFixed(2);
         exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
     }).catch(() =>{
         exchangeRateTxt.innerText = "Something is wrong";
     });
    }


    /**
  *! Checkout buttons
  */

const openOrderButtons = document.querySelectorAll('[data-order-target]')
const closeOrderButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openOrderButtons.forEach(button => {
  button.addEventListener('click', () => {
    const order = document.querySelector(button.dataset.orderTarget)
    openOrder(order)
  })
})

overlay.addEventListener('click', function (){
    const orders = document.querySelectorAll('.order.active');
    orders.forEach(order => {
      closeOrder(order);
    });
  })

closeOrderButtons.forEach(button => {
  button.addEventListener('click', () => {
    const order = button.closest('.order')
    closeOrder(order)
  })
})

function openOrder(order) {
  if (order == null) return
  order.classList.add('active')
  overlay.classList.add('active')
}

function closeOrder(order) {
  if (order == null) return
  order.classList.remove('active')
  overlay.classList.remove('active')
}

 

 
