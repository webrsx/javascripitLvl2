export default class Products {
    constructor(){
        this.arrWithProd = [];
    }

    createTemplate(item) {
        return `<div class="product-item" data-id="${item.id_product}">
                    <img src="${item.image}" alt="Some img">
                    <div class="desc">
                        <h3>${item.product_name}</h3>
                        <p>${item.price} руб.</p>
                        <button class="buy-btn" 
                        data-id="${item.id_product}"
                        data-name="${item.product_name}"
                        data-image="${item.image}"
                        data-price="${item.price}">Купить</button>
                    </div>
                </div>`
    }
}
