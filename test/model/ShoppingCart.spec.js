import Customer from "../../src/model/Customer.js";
import Product from "../../src/model/Product.js";
import ShoppingCart from "../../src/model/ShoppingCart.js";

describe("Shopping cart should checkout", () => {
    let fakeOrderService;
    let fakeShowConfirmation;

    beforeEach(() => {
        fakeShowConfirmation = jest.fn();
        fakeOrderService = {
            showConfirmation: fakeShowConfirmation
        };
    });

    it("Should calculate correct total and loyalty points for 10% discounted products", () => {
        const customer = new Customer("Test customer");
        const products = [new Product(100, "DIS_10_TestProduct", "Test product")];
        const shoppingCart = new ShoppingCart(customer, products);
        shoppingCart.setOrderService(fakeOrderService);

        shoppingCart.checkout();

        expect(fakeShowConfirmation).toHaveBeenCalledTimes(1);
        const actualTotalPrice = fakeShowConfirmation.mock.calls[0][2];
        const actualLoyaltyPointsEarned = fakeShowConfirmation.mock.calls[0][3];
        expect(actualTotalPrice).toBe(90);
        expect(actualLoyaltyPointsEarned).toBe(10);
    });

    it("Should calculate correct total and loyalty points for 15% discounted products", () => {
        const customer = new Customer("Test customer");
        const products = [new Product(150, "DIS_15_TestProduct", "Test product")];
        const shoppingCart = new ShoppingCart(customer, products);
        shoppingCart.setOrderService(fakeOrderService);

        shoppingCart.checkout();

        expect(fakeShowConfirmation).toHaveBeenCalledTimes(1);
        const actualTotalPrice = fakeShowConfirmation.mock.calls[0][2];
        const actualLoyaltyPointsEarned = fakeShowConfirmation.mock.calls[0][3];
        expect(actualTotalPrice).toBe(127.5);
        expect(actualLoyaltyPointsEarned).toBe(10);
    });

    it("Should calculate correct total and loyalty points for non discounted products", () => {
        const customer = new Customer("Test customer");
        const products = [new Product(100, "TestProduct", "Test product")];
        const shoppingCart = new ShoppingCart(customer, products);
        shoppingCart.setOrderService(fakeOrderService);

        shoppingCart.checkout();

        expect(fakeShowConfirmation).toHaveBeenCalledTimes(1);
        const actualTotalPrice = fakeShowConfirmation.mock.calls[0][2];
        const actualLoyaltyPointsEarned = fakeShowConfirmation.mock.calls[0][3];
        expect(actualTotalPrice).toBe(100);
        expect(actualLoyaltyPointsEarned).toBe(20);
    });
});

describe("Shopping cart should modify products", () => {
    it("Should add another product to the cart", () => {
        const customer = new Customer("Test Customer");
        const products = [new Product(100, "TestProductOne", "Test Product One")];
        const shoppingCart = new ShoppingCart(customer, products);

        shoppingCart.addProduct(new Product(200, "TestProductTwo", "Test Product Two"));

        expect(shoppingCart.products).toEqual([
            new Product(100, "TestProductOne", "Test Product One"),
            new Product(200, "TestProductTwo", "Test Product Two")
        ]);
    });

    it("Should remove a product from the cart", () => {
        const customer = new Customer("Test Customer");
        const products = [
            new Product(100, "TestProductOne", "Test Product One"),
            new Product(200, "TestProductTwo", "Test Product Two")
        ];
        const shoppingCart = new ShoppingCart(customer, products);

        shoppingCart.removeProduct(new Product(200, "TestProductTwo", "Test Product Two"));

        expect(shoppingCart.products).toEqual([
            new Product(100, "TestProductOne", "Test Product One")
        ]);
    });
});
