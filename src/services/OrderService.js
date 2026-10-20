
class OrderService {
  constructor({
    productRepository,
    orderRepository,
    notificationService,
    logger,
    discountService,
    shippingService,
    paymentService,
    orderValidator,
    orderSummaryPrinter
  }) {
    this.productRepository = productRepository;
    this.orderRepository = orderRepository;
    this.notificationService = notificationService;
    this.logger = logger;
    this.discountService = discountService;
    this.shippingService = shippingService;
    this.paymentService = paymentService;
    this.orderValidator = orderValidator;
    this.orderSummaryPrinter = orderSummaryPrinter;
  }

  process(order) {
    this.logger.info(`Iniciando processamento do pedido ${order.id}.`);

    this.orderValidator.validate(order);

    const subtotal = order.getSubtotal();

    let discount = this.discountService.calculate(order, subtotal);

    const paymentDiscount = this.discountService.calculatePaymentDiscount(
      order.paymentMethod,
      subtotal
    );

    discount += paymentDiscount;

    const freight = this.shippingService.calculate(order);

    const payment = this.paymentService.process(
      order.paymentMethod,
      order.installments,
      subtotal
    );

    const paymentFee = payment.paymentFee;
    const paymentStatus = payment.paymentStatus;

    const total = Number(
      (subtotal - discount + freight + paymentFee).toFixed(2)
    );

    if (total <= 0) {
      throw new Error("Total do pedido invalido.");
    }

    for (const item of order.items) {
      this.productRepository.updateStock(
        item.getProductId(),
        item.quantity
      );
    }

    order.status =
      paymentStatus === "approved" ? "confirmed" : "waiting_payment";

    const orderSummary = {
      id: order.id,
      customerName: order.customer.getName(),
      customerEmail: order.customer.getEmail(),
      city: order.customer.getCity(),
      state: order.customer.getState(),
      items: order.items.map((item) => ({
        productId: item.getProductId(),
        name: item.getProductName(),
        quantity: item.quantity,
        subtotal: item.getSubtotal()
      })),
      subtotal,
      discount: Number(discount.toFixed(2)),
      freight: Number(freight.toFixed(2)),
      paymentFee: Number(paymentFee.toFixed(2)),
      total,
      paymentMethod: order.paymentMethod,
      status: order.status,
      createdAt: order.createdAt
    };

    this.orderRepository.save(orderSummary);

    if (order.status === "confirmed") {
      this.notificationService.sendOrderConfirmation(
        order.customer,
        order.id,
        total
      );
    } else {
      this.logger.warn(`Pedido ${order.id} aguardando pagamento.`);
    }

    this.orderSummaryPrinter.print(order, orderSummary);

    return orderSummary;
  }
}

module.exports = OrderService;
