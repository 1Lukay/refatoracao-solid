class ShippingService {
  calculate(order) {
    if (order.couponCode === "FRETEGRATIS") {
      return 0;
    }

    const totalWeight = order.getTotalWeight();
    const region = order.customer.address.region;

    if (region === "sudeste") {
      return 20 + totalWeight * 4;
    }

    if (region === "sul") {
      return 28 + totalWeight * 5;
    }

    if (region === "centro-oeste") {
      return 35 + totalWeight * 6;
    }

    if (region === "nordeste") {
      return 45 + totalWeight * 7;
    }

    if (region === "norte") {
      return 60 + totalWeight * 9;
    }

    return 50 + totalWeight * 8;
  }
}

module.exports = ShippingService;