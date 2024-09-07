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
    this.onSubmit = this.onSubmit.bind(this);

    this.props = {
      events: {
        submit: this.onSubmit,
      },
    };

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

  validateLogin(inputValue: string) {
    const loginRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/;

    if (inputValue.length < 3 || inputValue.length > 20) {
      return "Логин должен быть от 3 до 20 символов.";
    } else if (/^\d+$/.test(inputValue)) {
      return "Логин не может состоять только из цифр.";
    } else if (/[^a-zA-Z0-9_-]/.test(inputValue)) {
      return "Логин может содержать только латинские буквы, цифры, " +
        "дефисы и нижние подчеркивания.";
    } else if (!/[a-zA-Z]/.test(inputValue)) {
      return "Логин должен содержать хотя бы одну латинскую букву.";
    } else if (!loginRegex.test(inputValue)) {
      return "Некорректный логин.";
    }
    return "";
  }

  onChangeLogin(e: Event) {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }
    const errorText = this.validateLogin(e.target.value);
    this.children.InputLoginField.setProps({
      error: !!errorText,
      errorText: errorText,
    });
  }

  onSubmit(e: Event) {
    e.preventDefault();

    if (!(e.target instanceof HTMLFormElement)) {
      console.error("Event target is not a form element.");
      return;
    }

    const formData = new FormData(e.target);
    const data: {[key: string]: FormDataEntryValue} = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    const loginField = e.target.elements.namedItem("login") as HTMLInputElement;
    if (loginField) {
      const loginValue = loginField.value;
      const errorText = this.validateLogin(loginValue);

      if (errorText) {
        this.children.InputLoginField.setProps({
          error: true,
          errorText: errorText,
        });
        console.log("Ошибка в форме");
        return;
      }
    }

    console.log("Form Data:", data);

    window.router.go("/chat");
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
              <input
                type="checkbox"
                onchange="this.parentNode.previousSibling.type = this.checked ?
                'text' : 'password'"
              />
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
