let shop=document.getElementById('shop')
let basket=JSON.parse(localStorage.getItem("data")) || []
let generateShop = ()=>{
return (shop.innerHTML=shopItemsData.map((x)=>{
    let {id}=x;
    let search = basket.find((x)=> x.id === id) || []
        return `
        <div class="item" id="product-id ${id}">
            <img width="220" src=${x.img}>
            <div class="details">
                <h3>${x.name}</h3>
                <p>${x.desc}</p>
                <div class="price-quant">
                    <h2>$ ${x.price}</h2>
                    <div class="buttons">
                        <i class="bi bi-dash-square-dotted" onclick="dec(${id})"></i>
                        <div class="quantity"id=${id}>
                        ${search.item == undefined? 0 : search.item}
                        </div>
                        <i class="bi bi-plus-square-dotted" onclick="inc(${id})"></i>
                    </div>
                </div>
            </div>
        </div>`
        ;
}).join(""))
};

generateShop();

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

    // console.log(basket);
    upd(selecteditem);
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
    localStorage.setItem('data',JSON.stringify(basket))
}
let upd=(id)=>
{
    let search = basket.find((x)=>x.id === id)
    // console.log(search.item);
    document.getElementById(id).innerHTML=search.item;
    calculation();
}
let calculation=()=>{
    let cartIcon=document.getElementById('cartAmount')
    cartIcon.innerHTML=basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
}
calculation();