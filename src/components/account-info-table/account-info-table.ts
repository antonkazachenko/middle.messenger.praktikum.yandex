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

    this.props = {
      ...this.props,
      events: {
        submit: this.onSubmit.bind(this),
      },
    };

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
      className: "profile-button",
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
    const errorText = this.validateEmail(inputValue);
    this.updateErrorLine(errorText);
  }

  onLoginChange(e) {
    const inputValue = e.target.value;
    const errorText = this.validateLogin(inputValue);
    this.updateErrorLine(errorText);
  }

  onFirstNameChange(e) {
    const inputValue = e.target.value;
    const errorText = this.validateFirstName(inputValue);
    this.updateErrorLine(errorText);
  }

  onLastNameChange(e) {
    const inputValue = e.target.value;
    const errorText = this.validateLastName(inputValue);
    this.updateErrorLine(errorText);
  }

  onNickNameChange(e) {
    const inputValue = e.target.value;
    const errorText = this.validateNickname(inputValue);
    this.updateErrorLine(errorText);
  }

  onPhoneChange(e) {
    const inputValue = e.target.value;
    const errorText = this.validatePhone(inputValue);
    this.updateErrorLine(errorText);
  }

  updateErrorLine(errorText) {
    const hasError = !!errorText;
    this.setProps({error: hasError});
    this.children.TableErrorLine.setProps({
      error: hasError,
      errorText: errorText || "",
    });
  }


  componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (oldProps === newProps) {
      return false;
    }

    this.children.TableErrorLine.setProps(newProps);
    return true;
  }

  validateFirstName(inputValue) {
    const nameRegex = /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/;
    let errorText = "";
    if (!inputValue) {
      errorText = "Поле имя обязательное.";
    } else if (!nameRegex.test(inputValue)) {
      if (!/^[A-ZА-Я]/.test(inputValue)) {
        errorText = "Имя должно начинаться с заглавной буквы.";
      } else if (/\d/.test(inputValue)) {
        errorText = "Имя не может содержать цифры.";
      } else if (/\s/.test(inputValue)) {
        errorText = "Имя не может содержать пробелы.";
      } else {
        errorText = "Имя может содержать только буквы или дефисы.";
      }
    }
    return errorText;
  }

  validateLastName(inputValue) {
    const nameRegex = /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/;
    let errorText = "";
    if (!inputValue) {
      errorText = "Поле Фамилии обязательное.";
    } else if (!nameRegex.test(inputValue)) {
      if (!/^[A-ZА-Я]/.test(inputValue)) {
        errorText = "Фамилия должна начинаться с заглавной буквы.";
      } else if (/\d/.test(inputValue)) {
        errorText = "Фамилия не может содержать цифры.";
      } else if (/\s/.test(inputValue)) {
        errorText = "Фамилия не может содержать пробелы.";
      } else {
        errorText = "Фамилия может содержать только буквы или дефисы.";
      }
    }
    return errorText;
  }

  validateNickname(inputValue) {
    const nicknameRegex = /^[a-zA-Zа-яА-Я0-9_-]{3,20}$/;
    let errorText = "";
    if (!inputValue) {
      errorText = "Поле имени в чате обязательное.";
    } else if (!nicknameRegex.test(inputValue)) {
      errorText = "Имя в чате должно быть от 3 до 20 символов и может содержа" +
        "ть латинские или кириллические буквы, цифры, дефисы" +
        " или подчеркивания.";
    }
    return errorText;
  }

  validatePhone(inputValue) {
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    let errorText = "";
    if (!inputValue) {
      errorText = "Поле телефона обязательное.";
    } else if (!phoneRegex.test(inputValue)) {
      if (inputValue.length < 10 || inputValue.length > 15) {
        errorText = "Номер телефона должен содержать от 10 до 15 цифр.";
      } else {
        errorText = "Номер телефона может начинаться с" +
          " '+' и должен содержать только цифры.";
      }
    }
    return errorText;
  }


  validateEmail(inputValue) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let errorText = "";
    if (!inputValue) {
      errorText = "Поле E-mail обязательное.";
    } else if (!emailRegex.test(inputValue)) {
      if (!/@/.test(inputValue)) {
        errorText = "Email должен содержать символ '@'.";
      } else if (!/\.[a-zA-Z]{2,}/.test(inputValue)) {
        errorText = "Email должен содержать точку после символа" +
          " '@' с последующими буквами.";
      } else {
        errorText = "Email должен быть корректного формата.";
      }
    }
    return errorText;
  }

  validateLogin(inputValue) {
    const loginRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/;
    let errorText = "";
    if (!inputValue) {
      errorText = "Поле логина обязательное.";
    } else if (!loginRegex.test(inputValue)) {
      errorText = "Логин должен быть от 3 до 20 символов и содержать" +
        " хотя бы одну латинскую букву.";
    }
    return errorText;
  }

  onSubmit(e) {
    e.preventDefault();
    const data = {};
    const errors = {};

    const formElements = e.target.elements;
    data.email = formElements["email"].value;
    data.login = formElements["login"].value;
    data.first_name = formElements["first_name"].value;
    data.last_name = formElements["last_name"].value;
    data.nickname = formElements["nickname"].value;
    data.phone = formElements["phone"].value;

    errors.email = this.validateEmail(data.email);
    errors.login = this.validateLogin(data.login);
    errors.first_name = this.validateFirstName(data.first_name);
    errors.last_name = this.validateLastName(data.last_name);
    errors.nickname = this.validateNickname(data.nickname);
    errors.phone = this.validatePhone(data.phone);

    const isErrorPresent =
      Object.values(errors).some((errorText) => errorText !== "");

    if (isErrorPresent) {
      this.setProps({error: true});
      this.children.TableErrorLine.setProps({
        error: true,
        errorText: "Пожалуйста, исправьте ошибки в форме.",
      });
    } else {
      this.children.TableErrorLine.setProps({
        error: false,
        errorText: "",
      });
      console.log(data);
    }
  }


  render(): string {
    return `
      <form class="account-info-table">
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
      </form>
    `;
  }
}
