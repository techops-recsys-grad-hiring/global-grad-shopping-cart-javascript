import Customer from "../../src/model/Customer.js";
import Product from "../../src/model/Product.js";
import ShoppingCart from "../../src/model/ShoppingCart.js";

describe("Shopping cart should checkout", () => {

    let customer;
    beforeEach(() => {
        customer = new Customer("Test customer")
    })

    it("Should calculate correct total for 10% discounted products", () => {
        const products = [new Product(100, "DIS_10_TestProduct", "Test product")];
        const shoppingCart = new ShoppingCart(customer, products);

        const order = shoppingCart.checkout();

        expect(order.totalPrice).toBe(90);
    });

    it("Should calculate correct loyalty points for 10% discounted products", () => {
        const products = [new Product(100, "DIS_10_TestProduct", "Test product")];
        const shoppingCart = new ShoppingCart(customer, products);

        const order = shoppingCart.checkout();

        expect(order.loyaltyPoints).toBe(10);
    });

    it("Should calculate correct total for 15% discounted products", () => {
        const products = [new Product(100, "DIS_15_TestProduct", "Test product")];
        const shoppingCart = new ShoppingCart(customer, products);

        const order = shoppingCart.checkout();

        expect(order.totalPrice).toBe(85);
    });

    it("Should calculate correct loyalty points for 15% discounted products", () => {
        const products = [new Product(100, "DIS_15_TestProduct", "Test product")];
        const shoppingCart = new ShoppingCart(customer, products);

        const order = shoppingCart.checkout();

        expect(order.loyaltyPoints).toBe(20 / 3);
    });

    it("Should calculate correct total for non discounted products", () => {
        const products = [new Product(100, "TestProduct", "Test product")];
        const shoppingCart = new ShoppingCart(customer, products);

        const order = shoppingCart.checkout();

        expect(order.totalPrice).toBe(100);
    });

    it("Should calculate correct loyalty points for non discounted products", () => {
        const products = [new Product(100, "TestProduct", "Test product")];
        const shoppingCart = new ShoppingCart(customer, products);

        const order = shoppingCart.checkout();

        expect(order.loyaltyPoints).toBe(20);
    });
});
