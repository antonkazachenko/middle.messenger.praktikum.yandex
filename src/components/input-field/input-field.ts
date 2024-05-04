import Block from "../../tools/Block";
import ErrorLine from "../input/error-line";
import Input from "../input/input";

type TInputFieldProps = {
  title: string;
  name: string;
  type?: string;
  value?: string;
  errorText?: string;
  inputClassName?: string;
  className?: string;
  onBlur?: (event: FocusEvent) => void;
};


class InputField extends Block {
  constructor(props: TInputFieldProps) {
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

  componentDidUpdate(
    oldProps: TInputFieldProps,
    newProps: TInputFieldProps,
  ): boolean {
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
            <div>
              {{{ Input }}}
              {{{ ErrorLine }}}
            </div>
        </div>
    `;
  }
}

export default InputField;
