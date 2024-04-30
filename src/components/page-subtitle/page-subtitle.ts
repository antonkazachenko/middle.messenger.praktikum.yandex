import Block from "../../tools/Block";
import {Link} from "../link";

export default class PageSubtitle extends Block {
  constructor(props) {
    super({
      ...props,
      Link: new Link({
        page: props.link,
        text: props.linkText,
        className: "login-page__page-subtitle-link",
      }),
    });
  }

  render() {
    return `
      <div class="login-page__page-subtitle">
        <p
          class="login-page__page-subtitle-text
                 {{#if large}}large-class{{/if}}"
        >
          {{title}}
        </p>
        {{{ Link }}}
      </div>
    `;
  }
}
