export default class Render{
    constructor(){
        this._createEventListeners();
    }
    // подтягивает обьекты в зону видимости
    init(products, renderCart){
        this.products = products;
        this.renderCart = renderCart;
    }
    //рендер списка товаров (каталога)
    renderProducts (arrWithProd) {
        let str = ''
        for (let item of arrWithProd) {
            str += this.products.createTemplate(item);
        }
        document.querySelector('.products').innerHTML = str;
    }
    // создает слушатели событий
    _createEventListeners(){
        //кнопка скрытия и показа корзины
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector('.cart-block').classList.toggle('invisible');
        });
        //кнопки удаления товара (добавляется один раз)
        document.querySelector('.cart-block').addEventListener ('click', (evt) => {
            if (evt.target.classList.contains ('del-btn')) {
                this.renderCart.removeProduct (evt.target);
            }
        })
        //кнопки покупки товара (добавляется один раз)
        document.querySelector('.products').addEventListener ('click', (evt) => {
            if (evt.target.classList.contains ('buy-btn')) {
                this.renderCart.addProduct (evt.target);
    }
})
    }
}