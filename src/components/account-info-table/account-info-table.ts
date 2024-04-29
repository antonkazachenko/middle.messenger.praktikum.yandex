import Block from "../../tools/Block";
import {InputField} from "../input-field";

export default class AccountInfoTable extends Block {
  init() {
    const onChangeEmailBind = this.onEmailChange.bind(this);
    const onChangeLoginBind = this.onLoginChange.bind(this);
    const onChangeFirstNameBind = this.onFirstNameChange.bind(this);
    const onChangeLastNameBind = this.onLastNameChange.bind(this);

    const EmailInputField = new InputField({
      className: "account-info-table__field",
      title: "E-mail",
      name: "email",
      onBlur: onChangeEmailBind,
    });

    const LoginInputField = new InputField({
      className: "account-info-table__field",
      title: "Логин",
      name: "login",
      onBlur: onChangeLoginBind,
    });

    const FirstNameInputField = new InputField({
      className: "account-info-table__field",
      title: "Имя",
      name: "first_name",
      onBlur: onChangeFirstNameBind,
    });

    const LastNameInputField = new InputField({
      className: "account-info-table__field",
      title: "Фамилия",
      name: "last_name",
      onBlur: onChangeLastNameBind,
    });

    const NickNameInputField = new InputField({
      className: "account-info-table__field",
      title: "Имя в чате",
      name: "nickname",
      onBlur: this.onNickNameChange.bind(this),
    });

    const PhoneInputField = new InputField({
      className: "account-info-table__field",
      title: "Телефон",
      name: "phone",
      onBlur: this.onPhoneChange.bind(this),
    });

    this.children = {
      ...this.children,
      EmailInputField,
      LoginInputField,
      FirstNameInputField,
      LastNameInputField,
      NickNameInputField,
      PhoneInputField,
    };

    super.init();
  }
  onEmailChange() {}

  onLoginChange() {}

  onFirstNameChange() {}

  onLastNameChange() {}

  onNickNameChange() {}

  onPhoneChange() {}

  render(): string {
    return `
      <div class="account-info-table">
        {{{ EmailInputField }}}
        {{{ LoginInputField }}}
        {{{ FirstNameInputField }}}
        {{{ LastNameInputField }}}
        {{{ NickNameInputField }}}
        {{{ PhoneInputField }}}
      </div>
    `;
  }
}
