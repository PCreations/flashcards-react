import Route from 'route-parser';

export enum RoutePath {
  HOME = '/',
  NEW_BOX = '/newBox',
  SESSION_PREVIEW = '/sessionPreview/:boxName',
}

export const matchRoute = (url: string, routePath: RoutePath) => new Route(routePath).match(url);

export const buildUrl = (routePath: RoutePath, params: { [i: string]: any }) =>
  new Route(routePath).reverse(params);
