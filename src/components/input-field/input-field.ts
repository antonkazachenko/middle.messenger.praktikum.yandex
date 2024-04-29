import Block from "../../tools/Block";
import ErrorLine from "../input/error-line";
import Input from "../input/input";

class InputField extends Block {
  constructor(props) {
    super({
      ...props,
      Input: new Input({
        events: {
          blur: props.onBlur || (() => {}),
        },
        type: props?.type,
        title: props.title,
        name: props.name,
        value: props?.value,
        className: props.inputClassName,
      }),
      ErrorLine: new ErrorLine({
        errorText: props.errorText,
      }),
    });
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (oldProps === newProps) {
      return false;
    }

    this.children.ErrorLine.setProps(newProps);
    return true;
  }

  render(): string {
    return `
        <div
          class="input-field
                {{#if className}} {{ className }} {{/if}}
                {{#if error}}input-field__error{{/if}}"
        >
            <div class="input-field__title">{{ title }}</div>
            {{{ Input }}}
            {{{ ErrorLine }}}
        </div>
    `;
  }
}

export default InputField;
