import {Button, PageSubtitle, PageTitle} from "../../components";
import Block from "../../tools/Block";

export default class Error500 extends Block {
  constructor(props: any) {
    super({
      ...props,
      PageTitle: new PageTitle({
        title: "Упсс....",
      }),
      PageSubtitle: new PageSubtitle({
        title: "Что-то пошло не так",
        large: true,
      }),
      Button: new Button({
        text: "Вернуться назад",
        page: "chat",
      }),
    });
  }

  render(): string {
    return `
      <div class="error-wrapper">
        <div class="error-500">
          <div class="error-500__content">
            <div class="error-500__title-margin">
              {{{ PageTitle }}}
            </div>
            <div class="error-500__subtitle-margin">
              {{{ PageSubtitle }}}
            </div>
            <p class="error-500__paragraph">
              Что-то пошло не так.
              Мы предлагаем вам вернуться домой.
            </p>
          </div>
          <div class="error-500__footer">
            {{{ Button }}}
          </div>
        </div>
        <div>
          <img
            src="../../assets/error500.svg"
            alt="error-500"
            class="error-500__image"
          />
        </div>
      </div>
    `;
  }
}
