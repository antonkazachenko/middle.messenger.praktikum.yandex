import Block from "../../tools/Block";

class ErrorLine extends Block {
  constructor(props) {
    console.log(props);
    super(props);
  }

  render(): string {
    return (`
            <div class="input__text-error">{{errorText}}</div>
        `);
  }
}

export default ErrorLine;
