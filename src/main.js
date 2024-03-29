import shopItemsData from './Data.json' assert {type: 'json'}

let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
    window.generateShop = generateShop
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
       <h2>$${price} /Lp</h2>
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
 **/

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
 **/

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

 window.decrement = decrement

window.increment = increment


 
 let update = (id) => {
    let search = basket.find((x) => x.id === id);
    //console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
 };

 let calculation = () => {
    window.increment = increment
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y)=>x + y, 0);
    
 };
 
 calculation()



