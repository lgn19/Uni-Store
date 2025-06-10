import type Product from "./Product";
export default interface Goods {
  id: number;
  product: Product;
  config: { [key: number]: string };
  num: number;
}
