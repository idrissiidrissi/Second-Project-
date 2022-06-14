let shop = document.getElementById("shop");

let shopItemsData = [
{
    id:"a",
    name: "Organic Pomegranate",
    price: 4.99,
    desc: "Fresh Organic NON GMO local grew Pomegranate.",
    img: "images/pomegranate.jpg"
},
{
    id:"b",
    name: "ORGANIC Pears",
    price: 3.59,
    desc: "Fresh Organic NON GMO local grew pears.",
    img: "images/pear.jpg"
},
{
    id:"c",
    name: "peaches",
    price: 1.99,
    desc: "Fresh Organic NON GMO local grew peaches.",
    img: "images/peaches.jpg"
},
{
    id:"d",
    name: "ORGANIC Grapes",
    price: 2.99,
    desc: "Fresh Organic NON GMO local grew grapes.",
    img: "images/grapes.jpg"
},
{
    id:"f",
    name: "pomegranate",
    price: 3.99,
    desc: "Fresh Organic NON GMO local grew Pomegranate.",
    img: "images/pomegranate.jpg",
},
];

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
    return (shop.innerHTML = shopItemsData
        .map((x) => {
            let { id, name, price, desc, img } = x;
            let search = basket.find((x) => x.id === id) || [];
       return `
       <div id=product-id-${id} class="item">
       <img width="220" src=${img} alt="">
       <div class="details">
       <h3>${name}</h3>
       <p>${desc}</p>
       <div class="price-quantity">
       <h2>$ ${price} per-Lip</h2>
       <div class="buttons">
         <i onclick="decrement(${id})" class="bi bi-dash-circle-fill"></i>
         <div id=${id} class="quantity">
         ${search.item === undefined? 0 : search.item}
         </div>
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
    let selctedItem = id;
    let search = basket.find((x) => x.id === selctedItem.id);
    if(search === undefined) {
        basket.push({
            id: selctedItem.id,
            item: 1,
    });
} else {
    search.item += 1;
}
localStorage.setItem("data", JSON.stringify(basket));
    //console.log(basket);
    update(selctedItem.id);
 };

/**
 * ! used to decrease the selected product item quantity by 1
 */

 let decrement = (id) => {
    let selctedItem = id;
    let search = basket.find((x) => x.id === selctedItem.id);
    if (search === undefined) return;
    else if(search.item === 0) return;
    
 else {
    search.item -= 1;
}
update(selctedItem.id);
basket = basket.filter((x) => x.item !== 0);
    //console.log(basket);
    
    localStorage.setItem("data", JSON.stringify(basket));
 };
 
 let update = (id) => {
    let search = basket.find((x) => x.id === id);
    //console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
 };

 let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y)=>x+y, 0)
    
 };

 calculation()


  