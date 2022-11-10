import { VariantType } from "notistack";
export interface ICart {
  products?: Array<{
    image: { altText: string; sourceUrl: any; srcSet: any; title: string };
    name: string;
    price: number;
    productId: number;
    qty: number;
    totalPrice: string;
  }>;
  totalProductsCount?: number;
  totalProductsPrice?: string;
}
export interface IOriginCart {
  subtotal?: any;
  discountTotal?: any;
  totalTax?: any;
  total?: any;
  shippingTotal?: any;
}

export type CartContextType = {
  cart: ICart;
  setCart: (cart: ICart) => void;
  handleRemoveProductClick: (products: any, event: any, cartKey: any) => void;
  handleQtyChange: (updatedItems: any) => void;
  updateCartProcessing: boolean;
  loadingCart: boolean;
  originCart: IOriginCart;
  setMessage: (variant: VariantType, message: string) => void;
  setActiveStep: (step: number) => void;
  activeStep: number;
  setCreateOrderInput: (input: any) => void;
  createOrderInput: IOrderInput;
  handleSetPaymentandDeliveryMethod: (
    deliveryMethod: string,
    paymentMethod: any
  ) => void;
};

export interface ILink {
  onClick: React.MouseEvent<HTMLElement>;
  href: any;
}

export interface IOrderInput {
  billing?: object;
  cupons?: Array;
  currency?: strng;
  customerId?: Int;
  isPaid?: bollean;
  lineItems?: Array;
  paymentMethod?: string;
  shipping?: object;
  shippingLines?: object;
  shippingMethod?: Array;
  billingDifferentThanShipping?: bollean;
}
