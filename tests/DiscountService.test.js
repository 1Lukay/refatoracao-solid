
const test = require("node:test");
const assert = require("node:assert/strict");

const DiscountService = require("../src/services/DiscountService");

test("deve aplicar desconto para cliente VIP", () => {
  const service = new DiscountService();

  const order = {
    customer: { type: "vip" },
    couponCode: null
  };

  assert.equal(service.calculate(order, 1000), 80);
});

test("deve aplicar desconto do cupom TECH10", () => {
  const service = new DiscountService();

  const order = {
    customer: { type: "regular" },
    couponCode: "TECH10"
  };

  assert.equal(service.calculate(order, 1000), 100);
});

test("deve aplicar desconto para subtotal acima de 8000", () => {
  const service = new DiscountService();

  const order = {
    customer: { type: "regular" },
    couponCode: null
  };

  assert.equal(service.calculate(order, 9000), 250);
});

test("deve aplicar desconto para pagamento via Pix", () => {
  const service = new DiscountService();

  assert.equal(service.calculatePaymentDiscount("pix", 1000), 30);
});

test("não deve aplicar desconto de pagamento para cartão", () => {
  const service = new DiscountService();

  assert.equal(service.calculatePaymentDiscount("credit_card", 1000), 0);
});
