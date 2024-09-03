import Block from "../../tools/Block";

type TErrorLineProps = {
  errorText: string;
};

class ErrorLine extends Block {
  constructor(props: TErrorLineProps) {
    super(props);
  }

  render(): string {
    return (`
            <div class="input__text-error">{{errorText}}</div>
        `);
  }
}

export default ErrorLine;
