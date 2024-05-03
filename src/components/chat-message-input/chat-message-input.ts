import Block from "../../tools/Block";

export default class ChatMessageInput extends Block {
  constructor(props) {
    super({
      ...props,
      events: {
        blur: props.onBlur || (() => {}),
      },
    });
  }

  componentDidUpdate(oldProps, newProps) {
    if (oldProps === newProps) {
      return false;
    }

    return true;
  }

  render() {
    return `
      <input class="chat-message-input"
             placeholder="{{ defaultValue }}"
             type="text"
             id="{{ id }}"
             name="{{ name }}"
      />
    `;
  }
}
