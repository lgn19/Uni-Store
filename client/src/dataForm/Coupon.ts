export default interface Coupon {
  id: number;
  classes?: string;
  subClasses?: string;
  enableId?: number[];
  count: number;
  title: string;
  detail: string;
  time: string;
  logo: string;
}
