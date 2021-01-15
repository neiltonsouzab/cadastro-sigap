export default interface IPage<T> {
  current: number;
  pages: number;
  data: Array<T>;
}
