import Block from "../../tools/Block";

type TLinkProps = {
  text: string;
  page: string;
  className: string;
  events: {
    click: (event: MouseEvent) => void;
  };
};

export default class Link extends Block {
  constructor(props: TLinkProps) {
    super(props);
  }


  render() {
    return `
      <a
        class="{{className}}"
        page="{{ page }}"
      >
        {{ text }}
      </a>
    `;
  }
}
