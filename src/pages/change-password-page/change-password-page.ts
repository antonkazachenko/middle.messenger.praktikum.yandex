import Block from "../../tools/Block";
import {AccountInfoCard, Button, InputField} from "../../components";
import {ErrorLine} from "../../components/input";

export default class ChangePasswordPage extends Block {
  init() {
    const onNewPasswordChangeBind = this.onNewPasswordChange.bind(this);
    const onRepeatPasswordChangeBind = this.onRepeatPasswordChange.bind(this);

    this.props = {
      ...this.props,
      events: {
        submit: this.onSubmit.bind(this),
      },
    };

    this.children = {
      AccInfoCard: new AccountInfoCard({
        name: "Иван Иванов",
        username: "ivanivanov",
        utcOffset: "+3",
      }),
      InputOldPassword: new InputField({
        inputClassName: "input__element-pwd",
        className: "login-page__input",
        title: "Старый пароль",
        name: "old_password",
        type: "password",
      }),
      InputNewPassword: new InputField({
        inputClassName: "input__element-pwd",
        className: "login-page__input",
        title: "Новый пароль",
        name: "new_password",
        onBlur: onNewPasswordChangeBind,
        type: "password",
      }),
      InputPasswordRepeatField: new InputField({
        inputClassName: "input__element-pwd",
        className: "login-page__input",
        title: "Повторите новый пароль",
        name: "repeat_new_password",
        onBlur: onRepeatPasswordChangeBind,
        type: "password",
      }),
      SaveButton: new Button({
        className: "button button__margin",
        text: "Сохранить",
        page: "profile",
      }),
      ErrorLine: new ErrorLine({
        errorText: "",
      }),
    };

    super.init();
  }

  onChangePassword(e: Event, passwordField: Block) {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }
    const inputValue = e.target.value;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;
    let errorText = "";

    if (!passwordRegex.test(inputValue)) {
      if (inputValue.length < 8 || inputValue.length > 40) {
        errorText = "Пароль должен быть от 8 до 40 символов.";
      } else if (!/[A-Z]/.test(inputValue)) {
        errorText = "Пароль должен содержать хотя бы одну заглавную букву.";
      } else if (!/\d/.test(inputValue)) {
        errorText = "Пароль должен содержать хотя бы одну цифру.";
      }
      passwordField.setProps({
        error: true,
        errorText: errorText,
      });
    } else {
      passwordField.setProps({
        error: false,
        errorText: "",
      });
    }
  }

  onNewPasswordChange(e: Event) {
    this.onChangePassword(e, this.children.InputNewPassword);
  }

  onRepeatPasswordChange(e: Event) {
    this.onChangePassword(e, this.children.InputPasswordRepeatField);
  }

  validatePassword(inputValue: string) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;
    if (!passwordRegex.test(inputValue)) {
      if (inputValue.length < 8 || inputValue.length > 40) {
        return "Пароль должен быть от 8 до 40 символов.";
      } else if (!/[A-Z]/.test(inputValue)) {
        return "Пароль должен содержать хотя бы одну заглавную букву.";
      } else if (!/\d/.test(inputValue)) {
        return "Пароль должен содержать хотя бы одну цифру.";
      }
    }
    return "";
  }

  onSubmit(e: Event) {
    if (!(e.target instanceof HTMLFormElement)) {
      return;
    }
    e.preventDefault();

    const formData = new FormData(e.target);
    const data: {[key: string]: string} = {};

    const newPassword = formData.get("new_password");
    const repeatNewPassword = formData.get("repeat_new_password");

    if (typeof newPassword !== "string" ||
        typeof repeatNewPassword !== "string") {
      this.children.ErrorLine.setProps({
        errorText: "Заполните все поля.",
      });
      return;
    }

    const newPasswordError = this.validatePassword(newPassword);
    const repeatPasswordError = this.validatePassword(repeatNewPassword);

    if (newPasswordError) {
      this.children.InputNewPassword.setProps({
        error: true,
        errorText: newPasswordError,
      });
      return;
    } else if (repeatPasswordError) {
      this.children.InputPasswordRepeatField.setProps({
        error: true,
        errorText: repeatPasswordError,
      });
      return;
    }


    formData.forEach((value, key) => {
      if (typeof value === "string") {
        data[key] = value;
      }
    });

    console.log(data);
  }


  render() {
    return `
      <form class="profile-page">
        <div class="profile-page__content">
          {{{ AccInfoCard }}}
          {{{ InputOldPassword }}}
          {{{ InputNewPassword }}}
          {{{ InputPasswordRepeatField }}}
          {{{ SaveButton }}}
          {{{ ErrorLine }}}
        </div>
      </form>
    `;
  }
}
