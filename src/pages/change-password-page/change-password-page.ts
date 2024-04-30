import Block from "../../tools/Block";
import {AccountInfoCard, Button, InputField} from "../../components";

export default class ChangePasswordPage extends Block {
  init() {
    const onNewPasswordChangeBind = this.onNewPasswordChange.bind(this);
    const onRepeatPasswordChangeBind = this.onRepeatPasswordChange.bind(this);

    const AccInfoCard = new AccountInfoCard({
      name: "Иван Иванов",
      username: "ivanivanov",
      utcOffset: "+3",
    });

    const InputOldPassword = new InputField({
      inputClassName: "input__element-pwd",
      className: "login-page__input",
      title: "Старый пароль",
      name: "password",
    });

    const InputPasswordField = new InputField({
      inputClassName: "input__element-pwd",
      className: "login-page__input",
      title: "Новый пароль",
      name: "password",
      onBlur: onNewPasswordChangeBind,
    });

    const InputPasswordRepeatField = new InputField({
      inputClassName: "input__element-pwd",
      className: "login-page__input",
      title: "Повторите новый пароль",
      name: "password-repeat",
      onBlur: onRepeatPasswordChangeBind,
    });

    const SaveButton = new Button({
      className: "button button__margin",
      text: "Сохранить",
      page: "profile",
    });

    this.children = {
      ...this.children,
      AccInfoCard,
      InputOldPassword,
      InputPasswordField,
      InputPasswordRepeatField,
      SaveButton,
    };

    super.init();
  }

  onChangePassword(e, passwordType) {
    const inputValue = e.target.value;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;

    if (inputValue === "") {
      passwordType.setProps({
        error: false,
        errorText: "",
      });
    } else if (inputValue === "") {
      passwordType.setProps({
        error: false,
        errorText: "",
      });
    } else if (!passwordRegex.test(inputValue)) {
      let errorText = "";

      if (inputValue.length < 8 || inputValue.length > 40) {
        errorText = "Пароль должен быть от 8 до 40 символов.";
      } else if (!/[A-Z]/.test(inputValue)) {
        errorText = "Пароль должен содержать хотя бы одну заглавную букву.";
      } else if (!/\d/.test(inputValue)) {
        errorText = "Пароль должен содержать хотя бы одну цифру.";
      }

      passwordType.setProps({
        error: true,
        errorText: errorText,
      });
    } else {
      passwordType.setProps({
        error: false,
        errorText: "",
      });
    }
  }

  onNewPasswordChange(e) {
    this.onChangePassword(e, this.children.InputPasswordField);
  }

  onRepeatPasswordChange(e) {
    this.onChangePassword(e, this.children.InputPasswordRepeatField);
  }


  render(): string {
    return `
      <form class="profile-page">
        <div class="profile-page__content">
          <div class="profile-page__title-margin">
            Профиль
          </div>
          {{{ AccInfoCard }}}
          <div class="account-info-table__pwd">
            {{{ InputOldPassword }}}
            {{{ InputPasswordField }}}
            {{{ InputPasswordRepeatField }}}
            {{{ SaveButton }}}
          </div>
        </div>
      </form>
    `;
  }
}
