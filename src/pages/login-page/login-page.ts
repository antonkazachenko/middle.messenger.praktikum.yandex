import Block from "../../tools/Block";
import {
  Button,
  InputField,
  PageSubtitle,
  PageTitle,
} from "../../components";

export default class LoginPage extends Block {
  init() {
    const onChangeLoginBind = this.onChangeLogin.bind(this);

    const LoginPageTitle = new PageTitle({
      title: "Вход",
    });
    const InputLoginField = new InputField({
      inputClassName: "input__element",
      className: "login-page__input",
      title: "Логин",
      name: "login",
      onBlur: onChangeLoginBind,
    });
    const InputPasswordField = new InputField({
      inputClassName: "input__element",
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
    const loginRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/;

    if (!loginRegex.test(inputValue)) {
      let errorText = "";

      if (inputValue.length < 3 || inputValue.length > 20) {
        errorText = "Логин должен быть от 3 до 20 символов.";
      } else if (/^\d+$/.test(inputValue)) {
        errorText = "Логин не может состоять только из цифр.";
      } else if (/[^a-zA-Z0-9_-]/.test(inputValue)) {
        errorText = "Логин может содержать только латинские буквы, цифры, " +
          "дефисы и нижние подчеркивания.";
      } else if (!/[a-zA-Z]/.test(inputValue)) {
        errorText = "Логин должен содержать хотя бы одну латинскую букву.";
      }

      this.children.InputLoginField.setProps({
        error: true,
        errorText: errorText,
      });
    } else {
      this.children.InputLoginField.setProps({
        error: false,
        errorText: "",
      });
    }
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
