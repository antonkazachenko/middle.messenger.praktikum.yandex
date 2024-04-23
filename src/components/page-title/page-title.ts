import Block from "../../tools/Block";

export default class PageTitle extends Block {
  constructor(props) {
    super(props);
  }

  render(): string {
    return `
      <h1 class="page-title">
        {{ title }}
      </h1>
    `;
  }
}
