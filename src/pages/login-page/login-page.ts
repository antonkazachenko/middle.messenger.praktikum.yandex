import Block from "../../tools/Block";
import {InputField, PageTitle} from "../../components";

export default class LoginPage extends Block {
  constructor(props) {
    super({
      ...props,
      PageTitle: new PageTitle({title: "Вход"}),
      InputLoginField: new InputField({className: "login-page__input", title: "Логин", name: "login", errorText: "Error"}),
      InputPasswordField: new InputField({className: "login-page__input", title: "Пароль", name: "password", type: "password", errorText: "Error"}),
    });
  }

  render() {
    return `
      {{#> Dialog }}
        <form class="login-page">
          <div class="login-page__content">
            <div class="login-page__title-margin">
              {{{ PageTitle }}}
            </div>
            {{{ InputLoginField }}}
            {{{ InputPasswordField }}}
          </div>
          <div class="login-page__show-password">
            <label class="control control-checkbox">
              Показать пароль
              <input type="checkbox" />
              <div class="control-indicator"></div>
            </label>
          </div>
          <div class="login-page__footer">
            {{> Button text="Авторизоваться" page="chat" }}
            {{> PageSubtitle title="Нет аккаунта?" link="register" linkText="Cоздать аккаунт"}}
          </div>
        </form>
      {{/ Dialog }}
    `;
  }
}
