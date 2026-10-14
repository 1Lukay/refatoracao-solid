const Address = require("./domain/Address");
const Customer = require("./domain/Customer");
const Order = require("./domain/Order");
const OrderItem = require("./domain/OrderItem");

const OrderService = require("./services/OrderService");

const ProductRepository = require("./repositories/ProductRepository");
const OrderRepository = require("./repositories/OrderRepository");

const NotificationService = require("./services/NotificationService");
const DiscountService = require("./services/DiscountService");
const ShippingService = require("./services/ShippingService");
const PaymentService = require("./services/PaymentService");
const OrderValidator = require("./services/OrderValidator");
const OrderSummaryPrinter = require("./services/OrderSummaryPrinter");

const productRepository = new ProductRepository();
const orderRepository = new OrderRepository();

const notificationService = new NotificationService();

const logger = {
  info: (message) => console.log(`[INFO] ${message}`),
  warn: (message) => console.warn(`[AVISO] ${message}`)
};

const discountService = new DiscountService();
const shippingService = new ShippingService();
const paymentService = new PaymentService();

const orderValidator = new OrderValidator(productRepository);
const orderSummaryPrinter = new OrderSummaryPrinter();

const customer = new Customer(
  "c1",
  "Ana Souza",
  "ana.souza@example.com",
  "18999990000",
  "vip",
  new Address(
    "Rua das Palmeiras",
    "120",
    "Presidente Prudente",
    "SP",
    "19000-000",
    "sudeste"
  )
);

const notebook = productRepository.findById("p1");
const mouse = productRepository.findById("p2");

const order = new Order(
  "o1001",
  customer,
  [new OrderItem(notebook, 1), new OrderItem(mouse, 2)],
  "TECH10",
  "credit_card",
  3
);

const service = new OrderService({
  productRepository,
  orderRepository,
  notificationService,
  logger,
  discountService,
  shippingService,
  paymentService,
  orderValidator,
  orderSummaryPrinter
});

const result = service.process(order);

console.log(JSON.stringify(result, null, 2));