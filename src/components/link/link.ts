import Block from "../../tools/Block";

export default class Link extends Block {
  constructor(props) {
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
