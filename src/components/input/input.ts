import Block from "../../tools/Block";

type TInputProps = {
  className: string;
  type: string;
  title: string;
  name: string;
  value: string;
  events: {
    blur: (event: FocusEvent) => void;
  };
};

export default class Input extends Block {
  constructor(props: TInputProps) {
    super(props);
  }

  render(): string {
    return `
            <input
              class="{{ className }}"
              type="{{ type }}"
              title="{{ title }}"
              name="{{ name }}"
              value="{{value}}"
            />
        `;
  }
}
