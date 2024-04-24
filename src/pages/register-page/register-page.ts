import Block from "../../tools/Block";
import {Button, InputField, PageSubtitle, PageTitle} from "../../components";

export default class RegisterPage extends Block {
  init() {
    const onChangeFirstNameBind = this.onChangeFirstName.bind(this);
    const onChangeLastNameBind = this.onChangeLastName.bind(this);
    const onChangeEmailBind = this.onChangeEmail.bind(this);
    const onChangeLoginBind = this.onChangeLogin.bind(this);
    const onChangePasswordBind = this.onChangePassword.bind(this);
    const onChangePhoneBind = this.onChangePhone.bind(this);

    const RegisterPageTitle = new PageTitle({
      title: "Регистрация",
    });

    const FirstNameInputField = new InputField({
      className: "register-page__input",
      title: "Имя",
      name: "first_name",
      onBlur: onChangeFirstNameBind,
    });

    const LastNameInputField = new InputField({
      className: "register-page__input",
      title: "Фамилия",
      name: "second_name",
      onBlur: onChangeLastNameBind,
    });

    const EmailInputField = new InputField({
      className: "register-page__input",
      title: "E-mail",
      name: "email",
      onBlur: onChangeEmailBind,
    });

    const LoginInputField = new InputField({
      className: "register-page__input",
      title: "Логин",
      name: "login",
      onBlur: onChangeLoginBind,
    });

    const PasswordInputField = new InputField({
      className: "register-page__input",
      title: "Пароль",
      name: "password",
      onBlur: onChangePasswordBind,
    });

    const RepeatPasswordInputField = new InputField({
      className: "register-page__input",
      title: "Повторите пароль",
      name: "password",
    });

    const PhoneInputField = new InputField({
      className: "register-page__input",
      title: "Номер телефона",
      name: "phone",
      onBlur: onChangePhoneBind,
    });

    const RegisterPageSubtitle = new PageSubtitle({
      title: "Уже есть аккаунт?",
      link: "login",
      linkText: "Вход",
    });

    const RegisterButton = new Button({
      text: "Создать аккаунт",
      page: "chat",
    });

    this.children = {
      ...this.children,
      RegisterPageTitle,
      FirstNameInputField,
      LastNameInputField,
      EmailInputField,
      LoginInputField,
      PasswordInputField,
      RepeatPasswordInputField,
      PhoneInputField,
      RegisterPageSubtitle,
      RegisterButton,
    };

    super.init();
  }

  onChangeFirstName(e) {}
  onChangeLastName(e) {}
  onChangeEmail(e) {}
  onChangePassword(e) {}
  onChangePhone(e) {}
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
      <form class="register-page">
        <div class="register-page__content">
          {{{ RegisterPageTitle }}}
          {{{ RegisterPageSubtitle }}}
          <div class="register-page__two-inputs">
            {{{ FirstNameInputField }}}
            {{{ LastNameInputField }}}
          </div>
          <div class="register-page__two-inputs">
            {{{ LoginInputField }}}
            {{{ PhoneInputField }}}
          </div>
          {{{ EmailInputField }}}
          <div class="register-page__two-inputs">
            {{{ PasswordInputField }}}
            {{{ RepeatPasswordInputField }}}
          </div>
        </div>
        <div class="register-page__password-note">
          <p>
            Используйте 8 или более символов.
          </p>
        </div>
        <div class="register-page__show-password">
          <label class="control control-checkbox">
            Показать пароль
            <input type="checkbox" />
            <div class="control-indicator"></div>
          </label>
        </div>
        <div class="register-page__footer">
          {{{ RegisterButton  }}}
        </div>
      </form>
    `;
  }
}
