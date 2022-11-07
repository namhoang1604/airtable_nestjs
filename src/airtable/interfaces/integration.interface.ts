export interface Integration {
  url: string;
  mapping(data: any): any;
}
