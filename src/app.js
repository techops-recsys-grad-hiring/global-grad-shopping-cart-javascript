import ShoppingCart from "./model/ShoppingCart.js";
import Product from "./model/Product.js";
import Customer from "./model/Customer.js";
import ConsoleOrderService from "./service/ConsoleOrderService.js";

const products = [
    new Product(10.0, "DIS_10_PRODUCT1", "Product 1"),
    new Product(20.0, "DIS_15_PRODUCT2", "Product 2")

];

const customer = new Customer("John Doe");

const shoppingCart = new ShoppingCart(customer, products);
shoppingCart.setOrderService(new ConsoleOrderService());
const productThree = new Product(30.0, "PRODUCT3", "Product 3");
shoppingCart.addProduct(productThree);

shoppingCart.checkout();
