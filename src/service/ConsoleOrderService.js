export default class ConsoleOrderService {

    showConfirmation = (customer, products, totalPrice, loyaltyPointsEarned) => {
        console.log(`Customer: ${customer.name}`);
        console.log(`Bought: \n${products.map(product => `- ${product.name}, ${product.price}`).join("\n")}`);
        console.log(`Total price: ${totalPrice}`);
        console.log(`Will receive ${loyaltyPointsEarned} loyalty points`);
    };
};
