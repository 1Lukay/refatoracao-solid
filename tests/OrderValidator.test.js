
const test = require("node:test");
const assert = require("node:assert/strict");

const OrderValidator = require("../src/services/OrderValidator");

test("deve rejeitar pedido sem cliente", () => {
  const productRepository = {
    findById() {
      return undefined;
    }
  };

  const validator = new OrderValidator(productRepository);

  const order = {
    customer: null,
    items: []
  };

  assert.throws(
    () => validator.validate(order),
    {
      message: "Cliente obrigatorio."
    }
  );
});

test("deve rejeitar cliente com e-mail inválido", () => {
  const productRepository = {
    findById() {
      return undefined;
    }
  };

  const validator = new OrderValidator(productRepository);

  const order = {
    customer: {
      email: "email-invalido"
    },
    items: []
  };

  assert.throws(
    () => validator.validate(order),
    {
      message: "E-mail do cliente invalido."
    }
  );
});

test("deve rejeitar item sem produto", () => {
  const productRepository = {
    findById() {
      return undefined;
    }
  };

  const validator = new OrderValidator(productRepository);

  const order = {
    customer: {
      email: "cliente@email.com"
    },
    items: [
      {
        product: null,
        quantity: 1
      }
    ]
  };

  assert.throws(
    () => validator.validate(order),
    { message: "Item sem produto." }
  );
});

test("deve rejeitar quantidade inválida", () => {
  const productRepository = {
    findById() {
      return { id: "p1", name: "Notebook", stock: 5 };
    }
  };

  const validator = new OrderValidator(productRepository);

  const order = {
    customer: {
      email: "cliente@email.com"
    },
    items: [
      {
        product: { id: "p1" },
        quantity: 0
      }
    ]
  };

  assert.throws(
    () => validator.validate(order),
    { message: "Quantidade invalida." }
  );
});

test("deve rejeitar pedido com estoque insuficiente", () => {
  const productRepository = {
    findById() {
      return { id: "p1", name: "Notebook", stock: 1 };
    }
  };

  const validator = new OrderValidator(productRepository);

  const order = {
    customer: {
      email: "cliente@email.com"
    },
    items: [
      {
        product: { id: "p1" },
        quantity: 2
      }
    ]
  };

  assert.throws(
    () => validator.validate(order),
    { message: "Estoque insuficiente para Notebook." }
  );
});
