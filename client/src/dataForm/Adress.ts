export default interface Adress {
  id: number;
  name: string;
  phone: number | null;
  adressTittle: string;
  adressDetail: String;

  // 数据库中为isDefault
  default: boolean;
}
