
class NotificationService {
  sendOrderConfirmation(customer, orderId, total) {
    console.log(`Confirmação enviada para ${customer.getEmail()}`);
    console.log(`Pedido: ${orderId}`);
    console.log(`Total: R$ ${total.toFixed(2)}`);
  }
}

module.exports = NotificationService;
