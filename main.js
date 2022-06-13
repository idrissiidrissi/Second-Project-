let shop = document.getElementById("shop");

let shopItemsData = [{
    id:"hello",
    name: "Organic Pomegranate",
    price: 4.99,
    desc: "Fresh Organic NON GMO local grew Pomegranate.",
    img: "images/pomegranate.jpg"

},
{
    id:"helloo",
    name: "ORGANIC Pears",
    price: 3.59,
    desc: "Fresh Organic NON GMO local grew pears.",
    img: "images/pear.jpg"
},
{
    id:"hellooo",
    name: "peaches",
    price: 1.99,
    desc: "Fresh Organic NON GMO local grew peaches.",
    img: "images/peaches.jpg"
},
{
    id:"hellooo",
    name: "ORGANIC Grapes",
    price: 2.99,
    desc: "Fresh Organic NON GMO local grew grapes.",
    img: "images/grapes.jpg"
},
{
    id:"helloooo",
    name: "pomegranate",
    price: 3.99,
    desc: "Fresh Organic NON GMO local grew Pomegranate.",
    img: "images/pomegranate.jpg",
},
];

let basket = [{
    id:"hello",
    item: 1
}]

let generateShop = () => {
    return (shop.innerHTML = shopItemsData
        .map((x) => {
            let { id, name, price, img, desc} = x;
       return `
       <div class="item">
       <img width="220" src=${img} alt="">
       <div class="details">
       <h3>${name}</h3>
       <p>${desc}</p>
       <div class="price-quantity">
       <h2>$ ${price} per-Lip</h2>
       <div class="buttons">
         <i onclick="decrement(${id})" class="bi bi-dash-circle-fill"></i>
         <div id=${id} class="quantity">0</div>
           <i onclick="increment(${id})" class="bi bi-plus-circle-fill"></i>
           </div>
           </div>
       </div>
   </div>
 `;
    })
    .join(""));
    
};

generateShop();

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
  
    console.log(basket);
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
    console.log(basket);
    localStorage.setItem("data", JSON.stringify(basket));
  };

  /**
 * ! To update the digits of picked items on each item card
 */

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
  };

  /**
 * ! To calculate total amount of selected Items
 */

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  };
  
  calculation();
