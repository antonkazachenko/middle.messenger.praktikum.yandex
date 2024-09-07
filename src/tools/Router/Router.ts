import Block from "../Block";
import {Route} from "./Route";

export class Router {
  private static __instance: Router;
  private routes: Route[] | undefined;
  private history: History | undefined;
  private _currentRoute: Route | null | undefined;
  private _rootQuery: string | undefined;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(
    pathname: string,
    block: typeof Block,
    // eslint-disable-next-line @typescript-eslint/ban-types
    routeProps?: { [key: string]: Object | string | Function },
  ): this {
    const route = new Route(
      pathname, block,
      {...routeProps, rootQuery: this._rootQuery || ""},
    );
    this.routes?.push(route);
    return this;
  }
  start() {
    window.onpopstate = ((event: PopStateEvent) => {
      this._onRoute((event.currentTarget as Window).location.pathname);
    });

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history?.pushState({}, "", pathname);
    this._onRoute(pathname);
    this._currentRoute?.navigate(pathname);
  }

  back() {
    this.history?.back();
  }

  forward() {
    this.history?.forward();
  }

  getRoute(pathname: string): Route | undefined {
    return this.routes?.find((route) => route.match(pathname));
  }
}

