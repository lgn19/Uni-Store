import type Product from "./Product";
import type Coupon from "./Coupon";
export default interface CurrentPay {
  createdTime: any;
  id: number;
  product: Product;
  config: { [key: number]: string };
  num: number;
  coupon: Coupon[];
}
