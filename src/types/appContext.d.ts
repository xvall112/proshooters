export interface ICart {
  products?: Array<{
    image: object;
    name: string;
    price: number;
    productId: number;
    qty: number;
    totalPrice: string;
  }>;
  totalProductsCount?: number;
  totalProductsPrice?: string;
}

export type CartContextType = {
  cart: ICart;
  setCart: (cart: ICart) => void;
};

export interface ILink {
  onClick: React.MouseEvent<HTMLElement>;
  href: any;
}
