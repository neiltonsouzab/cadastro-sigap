export default interface IPaginator<T> {
  page: number;
  filters: T;
}
