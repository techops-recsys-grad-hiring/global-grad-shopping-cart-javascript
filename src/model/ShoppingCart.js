import _ from "lodash";

export default class ShoppingCart {
    constructor(customer, products) {
        this.customer = customer;
        this.products = products;
    };

    setOrderService = (orderService) => {
        this.orderService = orderService;
    };

    addProduct = (product) => {
        this.products.push(product);
    };

    removeProduct = (product) => {
        _.remove(this.products, product);
    };

    checkout = () => {
        let totalPrice = 0;
        let loyaltyPointsEarned = 0;

        this.products.forEach(product => {
            let discount = 0;
            if (product.code.startsWith("DIS_10")) {
                discount = product.price * 0.1;
                loyaltyPointsEarned += product.price / 10;
            } else if (product.code.startsWith("DIS_15")) {
                discount = product.price * 0.15;
                loyaltyPointsEarned += product.price / 15;
            } else {
                loyaltyPointsEarned += product.price / 5;
            }

            totalPrice += product.price - discount;
        });

        this.orderService.showConfirmation(this.customer, this.products, totalPrice, loyaltyPointsEarned);
    };
};
