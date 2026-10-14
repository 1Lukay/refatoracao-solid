
class OrderSummaryPrinter {
  print(order, summary) {
    console.log("Resumo do pedido");
    console.log(`Cliente: ${order.customer.name}`);
    console.log(
      `Cidade: ${order.customer.address.city}/${order.customer.address.state}`
    );
    console.log(`Itens: ${order.getTotalItems()}`);
    console.log(`Subtotal: R$ ${summary.subtotal.toFixed(2)}`);
    console.log(`Desconto: R$ ${summary.discount.toFixed(2)}`);
    console.log(`Frete: R$ ${summary.freight.toFixed(2)}`);
    console.log(`Taxas: R$ ${summary.paymentFee.toFixed(2)}`);
    console.log(`Total: R$ ${summary.total.toFixed(2)}`);
  }
}

module.exports = OrderSummaryPrinter;
