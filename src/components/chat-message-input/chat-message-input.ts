import Block from "../../tools/Block";

type TChatMessageInputProps = {
  defaultValue: string;
  id: string;
  name: string;
  onBlur: (e: Event) => void;
};

export default class ChatMessageInput extends Block {
  constructor(props: TChatMessageInputProps) {
    super({
      ...props,
      events: {
        blur: props.onBlur || (() => {}),
      },
    });
  }

  componentDidUpdate(
    oldProps: TChatMessageInputProps,
    newProps: TChatMessageInputProps,
  ) {
    return oldProps !== newProps;
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
