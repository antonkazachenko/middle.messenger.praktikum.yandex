// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Block from "./tools/Block";
import { Input } from "./components";
const data = [
  {
    id: 5,
    avatar: { size: "medium", image: "" },
    name: "John Doe",
    date: "Su",
    message: "Hello, World!",
    count: "9+",
  },
  {
    id: 4,
    avatar: { size: "medium", image: "" },
    name: "John Doe",
    date: "Su",
    message: "Hello, World!",
    count: "9+",
  },
  {
    id: 3,
    avatar: { size: "medium", image: "" },
    name: "John Doe",
    date: "Su",
    message: "Hello, World!",
    count: "9+",
  },
  {
    id: 2,
    avatar: { size: "medium", image: "" },
    name: "John Doe",
    date: "Su",
    message: "Hello, World!",
    count: "9+",
  },
  {
    id: 1,
    avatar: { size: "medium", image: "" },
    name: "John Doe",
    date: "Su",
    message: "Hello, World!",
    count: "9+",
  },
];

class ChatItem extends Block {
  constructor(...props) {
    super({ ...props });
  }

  render() {
    return `
      <div>
        <div>{{ name }}</div>
        <div>{{ message }}</div>
      </div>
  `;
  }
}

class Page extends Block {
  constructor(...props) {
    super({
      ...props,
      lists: [
        new ChatItem({ name: "John Doe", message: "Hello, World!" }),
        new ChatItem({ name: "John Doe", message: "Hello, World!" }),
        new ChatItem({ name: "John Doe", message: "Hello, World!" }),
        new ChatItem({ name: "John Doe", message: "Hello, World!" }),
      ],
      button: new Button({ text: props.buttonText }),
      input: new Input({
        label: "Input",
        onChange: (value) => {
          this.setProps({ buttonText: value });
        },
      }),
    });
  }

  componentDidUpdate(oldProps, newProps): boolean {
    if (oldProps.buttonText !== newProps.buttonText) {
      this.children.button.setProps({ text: newProps.buttonText });
    }
    return true;
  }

  override render(): string {
    return `
      <div>
        {{{ button }}}
      </div>
    `;
  }
}

const block = new Page({ buttonText: "Click me!" });
const container = document.getElementById("app");
if (container) {
  container.appendChild(block.getContent());
}
