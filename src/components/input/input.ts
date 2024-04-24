import Block from "../../tools/Block";

export default class Input extends Block {
  constructor(props) {
    super(props);
  }

  render(): string {
    return `
            <input
              class="input__element"
              type="{{ type }}"
              title="{{ title }}"
              name="{{ name }}"
              value="{{value}}"
            />
        `;
  }
}
