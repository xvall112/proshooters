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

export type CartContextType = {
  cart: ICart;
  setCart: (cart: ICart) => void;
  handleAddToCartClick: (productId: string) => void;
  addToCartLoading: boolean;
  handleRemoveProductClick: (products: any, event: any, cartKey: any) => void;
  handleQtyChange: (products: any, count: any, cartKey: any) => void;
  updateCartProcessing: boolean;
  loadingCart: boolean;
};

export interface ILink {
  onClick: React.MouseEvent<HTMLElement>;
  href: any;
}
