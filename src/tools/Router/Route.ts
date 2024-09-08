import Block from "../Block";
import Handlebars from "handlebars";

export class Route {
  private _pathname: string;
  private _blockClass: typeof Block | string;
  private _block: Block | null;
  // eslint-disable-next-line @typescript-eslint/ban-types
  private _props: { [key: string]: Object | string | Function };

  constructor(
    pathname: string,
    view: typeof Block | string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    props: { [key: string]: Object | string | Function },
  ) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    this._pathname = pathname;
    this.render();
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    const container = document.getElementById("app")!;

    if (typeof this._blockClass === "string") {
      const template = Handlebars.compile(this._blockClass);
      container.innerHTML = template(this._props);
      return;
    }

    if (!this._block) {
      // Create the block if it doesn't exist
      this._block = new this._blockClass(this._props);
    } else {
      // If the block exists, re-render its content
      this._block.setProps(this._props); // Update props if necessary
    }

    container.innerHTML = "";
    container.append(this._block.getContent()!);
  }
}
