
class OrderValidator {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  validate(order) {
    if (!order.customer) {
      throw new Error("Cliente obrigatorio.");
    }

    const email =
      typeof order.customer.getEmail === "function"
        ? order.customer.getEmail()
        : order.customer.email;

    if (!email || !email.includes("@")) {
      throw new Error("E-mail do cliente invalido.");
    }

    if (!order.items || order.items.length === 0) {
      throw new Error("Pedido sem itens.");
    }

    for (const item of order.items) {
      if (!item.product) {
        throw new Error("Item sem produto.");
      }

      if (item.quantity <= 0) {
        throw new Error("Quantidade invalida.");
      }

      const productId =
        typeof item.getProductId === "function"
          ? item.getProductId()
          : item.product.id;

      const product = this.productRepository.findById(productId);

      if (!product) {
        throw new Error(`Produto ${productId} nao encontrado.`);
      }

      if (product.stock < item.quantity) {
        throw new Error(`Estoque insuficiente para ${product.name}.`);
      }
    }
  }
}

module.exports = OrderValidator;
