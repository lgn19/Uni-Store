export default interface Category {
  id: number; // 分类ID
  name: string; // 分类名称
  thumb?: string; // 分类缩略图URL（可选）
  children?: Category[]; // 子分类列表（可选）
}
