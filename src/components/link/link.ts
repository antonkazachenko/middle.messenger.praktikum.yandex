import Block from "../../tools/Block";

export default class Link extends Block {
  constructor(props) {
    super(props);
  }

  render() {
    return `
      <a
        href="{{ url }}"
        class="login-page__page-subtitle-link{{#if className}} {{className}}{{/if}}"
        page="{{ page }}"
      >
        {{ text }}
      </a>
    `;
  }
}
