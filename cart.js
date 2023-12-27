let label = document.getElementById('label')
let shoppingCart = document.getElementById('shopping-cart')
console.log(shopItemsData);
let basket = JSON.parse(localStorage.getItem('data')) || []
let calculation=()=>{
    let cartIcon=document.getElementById('cartAmount');
    cartIcon.innerHTML=basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
};
calculation();
let generateCartItems = ()=>{
    if(basket.length !==0) { 
        return (shoppingCart.innerHTML = basket
            .map((p) => {
                let {id,item}=p;
                let search = shopItemsData.find((y) => y.id == id) || [];
                return `
            <div class= "cart-item">
                <img width= "100px" src= ${search.img} alt="not found"/>
                <div class = "details>
                    <div class="title-price-x">
                        <h4 class = "title-price">
                            <p>${search.name}</p>
                            <p id="price">$ ${search.price}</p>
                            <i onclick = "removeItem(${id})" class = "bi bi-x-lg"></i>
                        </h4>
                        <h3>$ ${item * search.price}</h3>
                        <div class="t1">
                            <i class="bi bi-dash-square-dotted" onclick="dec(${id})"></i>
                            <div class="quantity"id=${id}>${item}  
                            </div>
                            <i class="bi bi-plus-square-dotted" onclick="inc(${id})"></i>
                        </div> 
                    </div>
                </div>      
            </div>`;
        }).join(''))
    }
    else{
        shoppingCart.innerHTML = ``
        label.innerHTML = `
        <h2>Cart is empty </h2>
        <a href = "index.html">
            <button class = "HomeBtn">Back-2-Home</button>
        </a>`
    }
}
generateCartItems();
let inc=(id)=>{
    let selecteditem = id;
    let search = basket.find((x)=>
        x.id===selecteditem);
    if (search === undefined)
    {
        basket.push({
            id:selecteditem,
            item:1
        })
    }
    else{
        search.item += 1;
    }
    upd(selecteditem);
    generateCartItems();
    localStorage.setItem('data',JSON.stringify(basket))
}
let dec=(id)=>{
    let selecteditem = id;
    let search = basket.find((x)=>
        x.id===selecteditem);
    if(search === undefined)
    return; 
    if (search.item === 0)
    {
        return;
    }
    else{
        search.item -= 1;
    }
    // console.log(basket); 
    upd(selecteditem);
    basket = basket.filter((x)=>x.item !==0);
    generateCartItems();
    localStorage.setItem('data',JSON.stringify(basket))
}
let upd=(id)=>
{
    let search = basket.find((x)=>x.id === id)
    // console.log(search.item);
    document.getElementById(id).innerHTML=search.item;
    calculation();
    totalAmt();
}
let removeItem = (id)=>{
    let selecteditem = id;
    // console.log(selecteditem);
    basket = basket.filter((x)=>x.id != selecteditem);
    generateCartItems();
    totalAmt();
    calculation();
    localStorage.setItem('data',JSON.stringify(basket))
}
let clearCart = () =>{
    basket = []
    generateCartItems();
    calculation();
    localStorage.setItem('data',JSON.stringify(basket))
}
let totalAmt = ()=>{
    if(basket.length !=0)
    {
        let amt = basket.map((x)=>{
            let {id,item}=x;
            let search = shopItemsData.find((y) => y.id == id) || [];
            return item * search.price;
        }).reduce((x,y)=>x+y,0)
        // console.log(amt);
        label.innerHTML = `
        <h2>Total-Bill $${amt}</h2>
        <button class="checkout">Check-out</button>
        <button onclick="clearCart()" class="removeall">RemoveAll</button>
        `
    }
}
totalAmt();