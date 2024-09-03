import Block from "../../tools/Block";

type TLinkProps = {
  text: string;
  page: string;
  className: string;
  url?: string;
};

export default class Link extends Block {
  constructor(props: TLinkProps) {
    super(props);
  }

  render() {
    return `
      <a
        href="{{ url }}"
        class="{{className}}"
        page="{{ page }}"
      >
        {{ text }}
      </a>
    `;
  }
}
