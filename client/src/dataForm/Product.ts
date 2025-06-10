export default interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  star: number;
  tags: string[];
  images: string[];
  configs: {
    id: number;
    name: string;
    config: string[];
  }[];
  priceMap: { [key: string]: number };
  originalPriceMap?: { [key: string]: number };
  enableDiscountMap: { [key: string]: boolean };
  storeMap: { [key: string]: number };
  comments: { user: string; content: string; star: number }[];
  classes: string;
  subClasses: string;
  store: number;
  buyNum: number;
  place: string;
  label: string;
  detail: string;
}
