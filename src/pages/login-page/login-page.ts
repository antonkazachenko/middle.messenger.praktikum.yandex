import Block from "../../tools/Block";
import {
  Button,
  InputField,
  Link,
  PageSubtitle,
  PageTitle,
} from "../../components";

export default class LoginPage extends Block {
  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    const onChangeLoginBind = this.onChangeLogin.bind(this);

    const LoginPageTitle = new PageTitle({
      title: "Вход",
    });
    const InputLoginField = new InputField({
      className: "login-page__input",
      title: "Логин",
      name: "login",
      errorText: "",
      error: false,
      onBlur: onChangeLoginBind,
    });
    const InputPasswordField = new InputField({
      className: "login-page__input",
      title: "Пароль",
      name: "password",
      type: "password",
      errorText: "",
    });
    const LoginButton = new Button({
      text: "Авторизоваться",
      page: "chat",
    });
    const LoginPageSubtitle = new PageSubtitle({
      title: "Нет аккаунта?",
      link: "register",
      linkText: "Cоздать аккаунт",
    });

    this.children = {
      ...this.children,
      LoginPageTitle,
      InputLoginField,
      InputPasswordField,
      LoginButton,
      LoginPageSubtitle,
    };

    super.init();
  }

  onChangeLogin(e) {
    const inputValue = e.target.value;
    if (inputValue === "error") {
      this.children.InputLoginField.setProps({
        error: true,
        errorText: "some error",
      });
      return;
    } else {
      this.children.InputLoginField.setProps({error: false, errorText: null});
    }

    // this.setProps({login: inputValue})
  }


  render() {
    return `
        <form class="login-page">
          <div class="login-page__content">
            <div class="login-page__title-margin">
              {{{ LoginPageTitle }}}
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
            {{{ LoginButton }}}
            {{{ LoginPageSubtitle }}}
          </div>
        </form>
    `;
  }
}
