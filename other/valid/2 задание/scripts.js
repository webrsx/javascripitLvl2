'use strict'

let button = document.querySelector('button')
console.log(button)
button.addEventListener('click', function(event){
    let form1 = new Validator(document.querySelector('.form1'), event)
})

class Validator{
    constructor(form, event){
        this.patterns = {
            name: /^[a-zа-яё]+$/i,
            phone: /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/,
            email: /^[\w._-]+@\w+\.[a-z]{2,4}$/
        }
        this.errors = {
            name: 'имя должно состоять из Русских и Английских букв',
            phone: 'номер должен быть следующего вида: +7(000)000-00-00',
            email: 'почта должна быть следующего вида: слово@почта.ru',
        }
        this.activeErrors = [...document.querySelectorAll('.error-p')]
        this.form = form
        this.event = event
        this.inputElems = [...this.form.querySelectorAll('input')]
        this._clearFormOfErrors()
        this._validate()
        this._watcherValid()
    }
     /*validate - сравнивает регулярное выражение с значением поля, если поле заполнено не верно, 
     то останавливает отправку формы и создает <p> с ошибкой (addErorInForm)*/
    _validate(){
        this.inputElems.forEach(item => {
            if(!this.patterns [item.name].test(item.value)){
                this.event.preventDefault()
                this._addErorInForm(item)
            }
        })
    }
    _addErorInForm(item){
        let error = `<p class="error-p" data-name="${item.name}">${this.errors [item.name]}</p>`
        item.insertAdjacentHTML('afterend', error)
    }
    _clearFormOfErrors(){
        this.activeErrors.forEach(item => {
            item.remove()
        })
    }

    /*_watcherValid - отлавливает событие при вводе или копировании в поле информации.
    Если регулярное выражение и значение поля возвращают true (метод test),
    удаляют <p> с ошибкой, так же если не отрабатывает первый If, то второй 
    проверяет, создан ли на данный момент <p> с ошибкой, если нет, то вызывает метод 
    который создаст этот <p>*/

    _watcherValid(){
        this.form.addEventListener('input', event => {
            if(this.patterns [event.target.name].test(event.path[0].value)){
                let activeError = this.form.querySelector(`[data-name="${event.target.name}"]`)
                activeError.remove()
            }else if(this.form.querySelector(`[data-name="${event.target.name}"]`) === null){
                this._addErorInForm(event.target)
            }
            
        })
    }
}