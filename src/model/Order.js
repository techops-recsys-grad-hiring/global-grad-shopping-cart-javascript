export default class Order {
    constructor(totalPrice, loyaltyPoints) {
        this.totalPrice = totalPrice;
        this.loyaltyPoints = loyaltyPoints;
    }

    displaySummary = () => "Total price: " + this.totalPrice + "\n" + "Will receive " + this.loyaltyPoints + " loyalty points";
}