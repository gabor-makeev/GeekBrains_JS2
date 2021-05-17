class Burger {
    constructor(size, stuffing, topping) {
        this.size = size;
        this.stuffing = stuffing;
        this.topping = topping;
        this.sizes = [
            ['small', {price: 50, calories: 20}],
            ['big', {price: 100, calories: 40}]
        ];
        this.stuffings = [
            ['cheese', {price: 10, calories: 20}],
            ['salad', {price: 20, calories: 5}],
            ['potato', {price: 15, calories: 10}]
        ];
        this.toppings = [
            ['dressing', {price: 15, calories: 0}],
            ['mayo', {price: 20, calories: 5}]
        ];
    }


}

const burger = new Burger();
burger.calculateCalories();