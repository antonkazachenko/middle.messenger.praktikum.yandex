import Block from "../../tools/Block";
import {Button, PageSubtitle, PageTitle} from "../../components";

export default class Error404 extends Block {
  constructor(props: any) {
    super({
      ...props,
      PageTitle: new PageTitle({
        title: "Упсс....",
      }),
      PageSubtitle: new PageSubtitle({
        title: "Страница не найдена",
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
        <div class="error-404">
          <div class="error-404__content">
            <div class="error-404__title-margin">
              {{{ PageTitle }}}
            </div>
            <div class="error-404__subtitle-margin">
              {{{ PageSubtitle }}}
            </div>
            <p class="error-404__paragraph">
              Этой страницы не существует!
              Мы предлагаем вам вернуться домой.
            </p>
          </div>
          <div class="error-404__footer">
            {{{ Button }}}
          </div>
        </div>
        <div>
          <img src="../../assets/error404.svg" alt="error-404" class="error-404__image">
        </div>
      </div>
    `;
  }
}
