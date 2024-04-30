import Block from "../../tools/Block";
import {InputField} from "../input-field";
import {Button} from "../button";
import {ErrorLine} from "../input";

export default class AccountInfoTable extends Block {
  init() {
    const onChangeEmailBind = this.onEmailChange.bind(this);
    const onChangeLoginBind = this.onLoginChange.bind(this);
    const onChangeFirstNameBind = this.onFirstNameChange.bind(this);
    const onChangeLastNameBind = this.onLastNameChange.bind(this);
    const onChangeNickNameBind = this.onNickNameChange.bind(this);
    const onChangePhoneBind = this.onPhoneChange.bind(this);

    const EmailInputField = new InputField({
      inputClassName: "profile-input",
      className: "account-info-table__field",
      title: "E-mail",
      name: "email",
      onBlur: onChangeEmailBind,
    });

    const LoginInputField = new InputField({
      inputClassName: "profile-input",
      className: "account-info-table__field",
      title: "Логин",
      name: "login",
      onBlur: onChangeLoginBind,
    });

    const FirstNameInputField = new InputField({
      inputClassName: "profile-input",
      className: "account-info-table__field",
      title: "Имя",
      name: "first_name",
      onBlur: onChangeFirstNameBind,
    });

    const LastNameInputField = new InputField({
      inputClassName: "profile-input",
      className: "account-info-table__field",
      title: "Фамилия",
      name: "last_name",
      onBlur: onChangeLastNameBind,
    });

    const NickNameInputField = new InputField({
      inputClassName: "profile-input",
      className: "account-info-table__field",
      title: "Имя в чате",
      name: "nickname",
      onBlur: onChangeNickNameBind,
    });

    const PhoneInputField = new InputField({
      inputClassName: "profile-input",
      className: "account-info-table__field",
      title: "Телефон",
      name: "phone",
      onBlur: onChangePhoneBind,
    });

    const TableErrorLine = new ErrorLine({
      errorText: "",
    });

    const SaveButton = new Button({
      text: "Сохранить",
      page: "profile",
    });

    this.children = {
      ...this.children,
      EmailInputField,
      LoginInputField,
      FirstNameInputField,
      LastNameInputField,
      NickNameInputField,
      PhoneInputField,
      TableErrorLine,
      SaveButton,
    };

    super.init();
  }
  onEmailChange(e) {
    const inputValue = e.target.value;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (inputValue === "") {
      this.children.TableErrorLine.setProps({
        error: false,
        errorText: "",
      });
    } else if (!emailRegex.test(inputValue)) {
      let errorText = "";

      if (!/@/.test(inputValue)) {
        errorText = "Email должен содержать символ '@'.";
      } else if (!/\.[a-zA-Z]{2,}/.test(inputValue)) {
        errorText = "Email должен содержать точку после символа '@' с " +
          "последующими буквами.";
      } else if (/^[0-9@.]+$/.test(inputValue)) {
        errorText = "Email не может состоять только из цифр.";
      } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        .test(inputValue)) {
        errorText = "Email должен быть корректного формата, с использованием " +
          "только латинских букв, цифр, точек, дефисов и подчеркиваний.";
      }

      this.setProps({
        error: true,
      });

      this.children.TableErrorLine.setProps({
        error: true,
        errorText: errorText,
      });
    } else {
      this.children.TableErrorLine.setProps({
        error: false,
        errorText: "",
      });
    }
  }

  onLoginChange(e) {
    const inputValue = e.target.value;
    const loginRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/;

    if (inputValue === "") {
      this.children.TableErrorLine.setProps({
        error: false,
        errorText: "",
      });
    } else if (!loginRegex.test(inputValue)) {
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

      this.setProps({
        error: true,
      });

      this.children.TableErrorLine.setProps({
        error: true,
        errorText: errorText,
      });
    } else {
      this.children.TableErrorLine.setProps({
        error: false,
        errorText: "",
      });
    }
  }

  onFirstNameChange(e) {
    const inputValue = e.target.value;
    const nameRegex = /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/;

    if (inputValue === "") {
      this.children.TableErrorLine.setProps({
        error: false,
        errorText: "",
      });
    } else if (!nameRegex.test(inputValue)) {
      let errorText = "";

      if (!/^[A-ZА-Я]/.test(inputValue)) {
        errorText = "Имя должно начинаться с заглавной буквы.";
      } else if (/\d/.test(inputValue)) {
        errorText = "Имя не может содержать цифры.";
      } else if (/\s/.test(inputValue)) {
        errorText = "Имя не может содержать пробелы.";
      } else if (/[^a-zA-Zа-яА-Я-]/.test(inputValue)) {
        errorText = "Имя может содержать только буквы или дефисы.";
      }

      this.setProps({
        error: true,
      });

      this.children.TableErrorLine.setProps({
        error: true,
        errorText: errorText,
      });
    } else {
      this.children.TableErrorLine.setProps({
        error: false,
        errorText: "",
      });
    }
  }

  onLastNameChange(e) {
    const inputValue = e.target.value;
    const nameRegex = /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/;

    if (inputValue === "") {
      this.children.TableErrorLine.setProps({
        error: false,
        errorText: "",
      });
    } else if (!nameRegex.test(inputValue)) {
      let errorText = "";

      if (!/^[A-ZА-Я]/.test(inputValue)) {
        errorText = "Фамилия должна начинаться с заглавной буквы.";
      } else if (/\d/.test(inputValue)) {
        errorText = "Фамилия не может содержать цифры.";
      } else if (/\s/.test(inputValue)) {
        errorText = "Фамилия не может содержать пробелы.";
      } else if (/[^a-zA-Zа-яА-Я-]/.test(inputValue)) {
        errorText = "Фамилия может содержать только буквы или дефисы.";
      }

      this.setProps({
        error: true,
      });

      this.children.TableErrorLine.setProps({
        error: true,
        errorText: errorText,
      });
    } else {
      this.children.TableErrorLine.setProps({
        error: false,
        errorText: "",
      });
    }
  }

  onNickNameChange() {}

  onPhoneChange(e) {
    const inputValue = e.target.value;
    const phoneRegex = /^\+?[0-9]{10,15}$/;

    if (inputValue === "") {
      this.children.TableErrorLine.setProps({
        error: false,
        errorText: "",
      });
    } else if (inputValue === "") {
      this.children.TableErrorLine.setProps({
        error: false,
        errorText: "",
      });
    } else if (!phoneRegex.test(inputValue)) {
      let errorText = "";

      if (inputValue.length < 10 || inputValue.length > 15) {
        errorText = "Номер телефона должен содержать от 10 до 15 цифр.";
      } else if (!/^\+?[0-9]*$/.test(inputValue)) {
        errorText = "Номер телефона может начинаться " +
          "с '+' и должен содержать только цифры.";
      }

      this.setProps({
        error: true,
      });

      this.children.TableErrorLine.setProps({
        error: true,
        errorText: errorText,
      });
    } else {
      this.children.TableErrorLine.setProps({
        error: false,
        errorText: "",
      });
    }
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (oldProps === newProps) {
      return false;
    }

    this.children.TableErrorLine.setProps(newProps);
    return true;
  }

  render(): string {
    return `
      <div class="account-info-table">
        {{#if noInput}}
          <div class="account-info-table__field">
            <label
              for="email"
              class="account-info-table__label"
            >
              E-mail
            </label>
            <div id="email" class="account-info-table__value">
              ivanov@mail.ru
            </div>
          </div>
        {{else}}
          {{{ EmailInputField }}}
        {{/if}}
        {{#if noInput}}
          <div class="account-info-table__field">
            <label
              for="login"
              class="account-info-table__label"
            >
              Логин
            </label>
            <div id="login" class="account-info-table__value">
              ivanivanov
            </div>
          </div>
        {{else}}
          {{{ LoginInputField }}}
        {{/if}}
        {{#if noInput}}
          <div class="account-info-table__field">
            <label
              for="first_name"
              class="account-info-table__label"
            >
              Имя
            </label>
            <div id="first_name" class="account-info-table__value">
              Иван
            </div>
          </div>
        {{else}}
          {{{ FirstNameInputField }}}
        {{/if}}
        {{#if noInput}}
          <div class="account-info-table__field">
            <label
              for="last_name"
              class="account-info-table__label"
            >
              Фамилия
            </label>
            <div id="last_name" class="account-info-table__value">
              Иванов
            </div>
          </div>
        {{else}}
          {{{ LastNameInputField }}}
        {{/if}}
        {{#if noInput}}
          <div class="account-info-table__field">
            <label
              for="nickname"
              class="account-info-table__label"
            >
              Имя в чате
            </label>
            <div id="nickname" class="account-info-table__value">
              Иван
            </div>
          </div>
        {{else}}
          {{{ NickNameInputField }}}
        {{/if}}
        {{#if noInput}}
          <div class="account-info-table__field">
            <label
              for="phone"
              class="account-info-table__label"
            >
              Телефон
            </label>
            <div id="phone" class="account-info-table__value">
              +7 (999) 999-99-99
            </div>
          </div>
        {{else}}
          {{{ PhoneInputField }}}
        {{/if}}
        <div class="{{#if error}}account-info-table__field-error{{/if}}">
          {{{ TableErrorLine }}}
        </div>
        {{#if noButton}}
          <div></div>
        {{else}}
          {{{ SaveButton }}}
        {{/if}}
      </div>
    `;
  }
}
