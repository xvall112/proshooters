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
  setPaymentDelivery: (input: IPaymentDelivery) => void;
  paymentDelivery: IPaymentDelivery;
  handleSetDelivery: (title, price) => void;
  delivery: IDelivery;
  setPointZasilkovna: (point: any) => void;
  pointZasilkovna: any;
  createOrder: (address: IAddress) => void;
  orderLoading: boolean
};

export interface ILink {
  onClick: React.MouseEvent<HTMLElement>;
  href: any;
}

export interface IAddress {
  address:{
    shipping: {
      email: string
      firstName: string
      lastName: string
      company?:string
      address1: any
      city:any
      postcode: any
      country: string
      phone: string
    },
    billing: {
      firstName: string
      lastName: string
      company?: string
      address1: string
      city: string
      postcode: string
      country: string
      phone: string
      ico?: string
      dic?: string
    },
    billingDifferentThanShipping: boolean
}
}
export interface IPaymentDelivery {
  paymentMethod?: string,
  shippingMethod?: string[],
}

export interface IDelivery {
  price: number;
  title: string | null;
}
