import Block from "../../tools/Block";

export default class Button extends Block {
  constructor(props) {
    super(props);
  }

  render() {
    return `
      <button
        class="button{{#if className}} {{className}}{{/if}}"
        page="{{ page }}"
      >
        {{ text }}
      </button>
    `;
  }
}
