import Block from "../../tools/Block";

type TButtonProps = {
  className?: string;
  text: string;
  page: string;
  events?: {
    click: (event: MouseEvent) => void;
  };
};

export default class Button extends Block {
  constructor(props: TButtonProps) {
    super(props);
  }

  render() {
    return `
      <button
        class="button{{#if className}} {{className}}{{/if}}"
        page="{{ page }}"
        type="submit"
      >
        {{ text }}
      </button>
    `;
  }
}
