import Block from "../../tools/Block";

type TPageTitleProps = {
  title: string;
};

export default class PageTitle extends Block {
  constructor(props: TPageTitleProps) {
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
