import { isArray, isEmpty } from "lodash";

/**
 * Get line items for stripe
 *
 * @param {array} products Products.
 *
 * @returns {*[]|*} Line items, Array of objects.
 */
export const getStripeLineItems = (products) => {
  if (isEmpty(products) || !isArray(products)) {
    return [];
  }

  return products?.map(({ productId, name, price, qty: quantity, image }) => {
    return {
      price: price?.toString(), // The reason we pass price here and not total, because stripe multiplies it with qty.
      quantity,
      name,
      image,
      productId,
    };
  });
};

/**
 * Get line items for create order
 *
 * @param {array} products Products.
 *
 * @returns {*[]|*} Line items, Array of objects.
 */
export const getCreateOrderLineItems = (products) => {
  if (isEmpty(products) || !isArray(products)) {
    return [];
  }
  console.log("products", products);
  return products?.map(({ productId, qty: quantity }) => {
    return {
      quantity,
      product_id: productId,
      // variation_id: '', // @TODO to be added.
    };
  });
};

/**
 * Get Formatted create order data.
 *
 * @param order
 * @param products
 * @return {{shipping: {country: *, city: *, phone: *, address_1: (string|*), address_2: (string|*), postcode: (string|*), last_name: (string|*), company: *, state: *, first_name: (string|*), email: *}, payment_method_title: string, line_items: (*[]|*), payment_method: string, billing: {country: *, city: *, phone: *, address_1: (string|*), address_2: (string|*), postcode: (string|*), last_name: (string|*), company: *, state: *, first_name: (string|*), email: *}}}
 */
export const getCreateOrderData = (
  address,
  products,
  paymentDelivery,
  delivery
) => {
  // Checkout data.
  console.log(getCreateOrderLineItems(products));
  return {
    shipping: {
      first_name: address?.shipping?.firstName,
      last_name: address?.shipping?.lastName,
      address_1: address?.shipping?.address1,
      address_2: address?.shipping?.address2,
      city: address?.shipping?.city,
      country: address?.shipping?.country,
      state: address?.shipping?.state,
      postcode: address?.shipping?.postcode,
      email: address?.shipping?.email,
      phone: address?.shipping?.phone,
      company: address?.shipping?.company,
    },
    billing: {
      first_name: address.billing?.firstName,
      last_name: address.billing?.lastName,
      address_1: address.billing?.address1,
      address_2: address.billing?.address2,
      city: address.billing?.city,
      country: address.billing?.country,
      state: address.billing?.state,
      postcode: address.billing?.postcode,
      email: address.shipping?.email,
      phone: address.billing?.phone,
      company: address.billing?.company,
    },
    payment_method: paymentDelivery.paymentMethod,
    payment_method_title: paymentDelivery.paymentMethod,
    line_items: getCreateOrderLineItems(products),
    shipping_lines: [
      {
        method_id: "flat_rate",
        method_title: "Flat Rate",
        total: "10.00",
      },
    ],
  };
};

/**
 * Create order.
 *
 * @param {Object} orderData Order data.
 * @param {function} setOrderFailedError sets the react state to true if the order creation fails.
 * @param {string} previousRequestError Previous request error.
 *
 * @returns {Promise<{orderId: null, error: string}>}
 */
export const createTheOrder = async (
  orderData,
  setOrderFailedError,
  previousRequestError
) => {
  let response = {
    orderId: null,
    total: "",
    currency: "",
    error: "",
  };

  // Don't proceed if previous request has error.
  if (previousRequestError) {
    response.error = previousRequestError;
    return response;
  }

  try {
    const request = await fetch("/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    const result = await request.json();
    if (result.error) {
      response.error = result.error;
      setOrderFailedError("error", `${response.error}`);
      throw new Error("Něco se pokazilo");
    }

    response.orderId = result?.orderId ?? "";
    response.total = result.total ?? "";
    response.currency = result.currency ?? "";
  } catch (error) {
    // @TODO to be handled later.
    setOrderFailedError("error", `${error?.message}`);
    throw new Error("Něco se pokazilo");
  }

  return response;
};
