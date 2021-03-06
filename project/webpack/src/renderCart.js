export default class RenderCart{
    constructor(){

    }
    // Добавление продуктов в корзину
    addProduct (product) {
        let productId = +product.dataset['id']; //data-id="1"
        let find = userCart.find (element => element.id === productId); //товар или false
        if (!find) {
            userCart.push ({
                name: product.dataset ['name'],
                id: productId,
                img: 'https://placehold.it/100x80',
                price: +product.dataset['price'],
                quantity: 1
            })
        }  else {
            find.quantity++
        }
        this.renderCart ()
    }
    //удаление товаров
    removeProduct (product) {
        let productId = +product.dataset['id'];
        let find = userCart.find (element => element.id === productId);
        if (find.quantity > 1) {
            find.quantity--;
        } else {
            userCart.splice(userCart.indexOf(find), 1);
            document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
        }
        this.renderCart ();
    }
    //перерендер корзины
    renderCart () {
        let allProducts = '';
        let sumProducts = 0;
        for (let el of userCart) {
            allProducts += `<div class="cart-item" data-id="${el.id}">
                                <div class="product-bio">
                                    <img src="${el.img}" alt="Some image">
                                    <div class="product-desc">
                                        <p class="product-title">${el.name}</p>
                                        <p class="product-quantity">Quantity: ${el.quantity}</p>
                                        <p class="product-single-price">$${el.price} each</p>
                                    </div>
                                </div>
                                <div class="right-block">
                                    <p class="product-price">${el.quantity * el.price}</p>
                                    <button class="del-btn" data-id="${el.id}">&times;</button>
                                </div>
                            </div>`
            sumProducts += (el.quantity * el.price);
        }
    
        document.querySelector(`.cart-block`).innerHTML = allProducts;
        let sumCart = `<p>сумма корзины: ${sumProducts}</p>`;
        document.querySelector(`.cart-block`).insertAdjacentHTML('beforeend', sumCart);
        
    }
}