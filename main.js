let shop = document.getElementById("shop");

let shopItemsData = [{
    id:"hello",
    name: "pomegranate",
    price: 4.99,
    desc: "Fresh Organic NON GMO local grew Pomegranate.",
    img: "images/pomegranate.jpg"

},
{
    id:"helloo",
    name: "pear",
    price: 3.59,
    desc: "Fresh Organic NON GMO local grew Pomegranate.",
    img: "images/pear.jpg"
},
{
    id:"hellooo",
    name: "peaches",
    price: 1.99,
    desc: "Fresh Organic NON GMO local grew Pomegranate.",
    img: "images/pomegranate.jpg"
},
{
    id:"hellooo",
    name: "grapes",
    price: 2.99,
    desc: "Fresh Organic NON GMO local grew Pomegranate.",
    img: "images/pomegranate.jpg"
},
{
    id:"helloooo",
    name: "pomegranate",
    price: 3.99,
    desc: "Fresh Organic NON GMO local grew Pomegranate.",
    img: "images/pomegranate.jpg",
},
];

let generateShop = () => {
    return (shop.innerHTML = shopItemsData
        .map((x) => {
            let { id, name, price, img } = x;
       return `
       <div class="item">
       <img width="220" src=${img} alt="">
       <div class="details">
       <h3>${name}</h3>
       <p>Fresh Organic NON GMO local grew Pomegranate.</p>
       <div class="price-quantity">
       <h2>$ ${price} per-Lip</h2>
       <div class="buttons">
         <i class="bi bi-dash-circle-fill"></i>
         <div class="quantity">0</div>
           <i class="bi bi-plus-circle-fill"></i>
           </div>
           </div>
       </div>
   </div>
 `;
    })
    .join(""));
    
};

generateShop();
