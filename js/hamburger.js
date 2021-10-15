class Hamburger {
    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = stuffing;
        this.toppings = Array();
    };

    // Добавить добавку 
    addTopping(topping) { 
        this.getToppingsList().forEach(item => {
            if (item.name == topping) {
                this.toppings.push(item);
            };
        });
    };

    // Убрать добавку
    removeTopping(topping) {
        this.toppings.forEach((item, i) => {
            if (item.name == topping) {
                this.toppings.splice(i, 1);
            };
        });
     };

    // Получить список добавок
    getToppingsList() { 
        let toppingsList = [
            {name: 'Приправа', price: 15, calories: 0},
            {name: 'Майонез', price: 20, calories: 5},
        ];
        return toppingsList;
    };

    // Узнать размер гамбургера
    printSize() { 
        console.log(this.size);
     };

    // Возвращает гамбургер
    getSize() { 
        switch(this.size) {
            case 'Большой':
                return {name: 'Большой', price: 100, calories: 40 };
            case 'Маленький':
                return {name: 'Маленький', price: 50, calories: 20 };
        };
     };

    // Узнать начинку гамбургера
    printStuffing() { 
        console.log(this.stuffing);
    };

    // Возвращает начинку
    getStuffing() {
        switch(this.stuffing) {
            case 'С сыром':
                return {name: 'С сыром', price: 10, calories: 20};
            case 'C caлатом':
                return {name: 'C caлатом', price: 20, calories: 5};
            case 'C картофелем':
                return {name: 'C картофелем', price: 15, calories: 10};
        };
    };

    // Узнать добавки гамбургера
    printToppings(){
        console.log('Добавки:');
        this.toppings.forEach(item => {
            console.log(item.name);
        });
    };

    // Узнать цену
    calculatePrice() { 
        let totalCoast = 0;
        totalCoast += this.getSize().price;
        totalCoast += this.getStuffing().price;
        if (this.toppings.length) {
            this.toppings.forEach(item => {
                totalCoast += item.price;
            });
        };
        console.log(`Цена: ${totalCoast}`);
    };

    // Узнать калорийность 
    calculateCalories() {
        let totalCalories = 0;
        totalCalories += this.getSize().calories;
        totalCalories += this.getStuffing().calories;
        if (this.toppings.length) {
            this.toppings.forEach(item => {
                totalCalories += item.calories;
            });
        };
        console.log(`Каллорийность: ${totalCalories}`);
    };
  }


let hamBig = new Hamburger('Большой', 'С сыром');
hamBig.addTopping('Приправа');
hamBig.addTopping('Майонез');
hamBig.calculatePrice();
hamBig.calculateCalories();

let hamSmall = new Hamburger('Маленький', 'C caлатом');
hamSmall.calculatePrice();
hamSmall.calculateCalories();
