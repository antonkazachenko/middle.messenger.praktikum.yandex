import Block from "../../tools/Block";
import {Button, InputField, PageSubtitle, PageTitle} from "../../components";

export default class RegisterPage extends Block {
  init() {
    this.onSubmit = this.onSubmit.bind(this);

    this.children = {
      RegisterPageTitle: new PageTitle({
        title: "Регистрация",
      }),
      FirstNameInputField: new InputField({
        inputClassName: "input__element",
        className: "register-page__input",
        title: "Имя",
        name: "first_name",
        onBlur: this.onChangeFirstName.bind(this),
      }),
      LastNameInputField: new InputField({
        inputClassName: "input__element",
        className: "register-page__input",
        title: "Фамилия",
        name: "second_name",
        onBlur: this.onChangeLastName.bind(this),
      }),
      EmailInputField: new InputField({
        inputClassName: "input__element",
        className: "register-page__input",
        title: "E-mail",
        name: "email",
        onBlur: this.onChangeEmail.bind(this),
      }),
      LoginInputField: new InputField({
        inputClassName: "input__element",
        className: "register-page__input",
        title: "Логин",
        name: "login",
        onBlur: this.onChangeLogin.bind(this),
      }),
      PasswordInputField: new InputField({
        inputClassName: "input__element",
        className: "register-page__input",
        title: "Пароль",
        name: "password",
        onBlur: this.onChangePassword.bind(this),
      }),
      RepeatPasswordInputField: new InputField({
        inputClassName: "input__element",
        className: "register-page__input",
        title: "Повторите пароль",
        name: "password_repeat",
      }),
      PhoneInputField: new InputField({
        inputClassName: "input__element",
        className: "register-page__input",
        title: "Номер телефона",
        name: "phone",
        onBlur: this.onChangePhone.bind(this),
      }),
      RegisterPageSubtitle: new PageSubtitle({
        title: "Уже есть аккаунт?",
        link: "login",
        linkText: "Вход",
      }),
      RegisterButton: new Button({
        text: "Создать аккаунт",
        page: "chat",
      }),
    };

    this.props = {
      events: {
        submit: this.onSubmit,
      },
    };

    super.init();
  }

  onChangeFirstName(e) {
    const inputValue = e.target.value;
    const errorText = this.validateName(inputValue);
    this.children.FirstNameInputField.setProps({
      error: !!errorText,
      errorText: errorText,
    });
  }

  onChangeLastName(e) {
    const inputValue = e.target.value;
    const errorText = this.validateName(inputValue);
    this.children.LastNameInputField.setProps({
      error: !!errorText,
      errorText: errorText,
    });
  }

  validateName(inputValue) {
    const nameRegex = /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/;
    if (!inputValue) return "Это поле обязательно.";
    if (!nameRegex.test(inputValue)) return "Имя должно начинаться с заглавной буквы и может содержать только буквы или дефисы.";
    return "";
  }

  onChangeEmail(e) {
    const inputValue = e.target.value;
    const errorText = this.validateEmail(inputValue);
    this.children.EmailInputField.setProps({
      error: !!errorText,
      errorText: errorText,
    });
  }

  validateEmail(inputValue) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!inputValue) return "Это поле обязательно.";
    if (!emailRegex.test(inputValue)) return "Некорректный формат email.";
    return "";
  }

  onChangePhone(e) {
    const inputValue = e.target.value;
    const errorText = this.validatePhone(inputValue);
    this.children.PhoneInputField.setProps({
      error: !!errorText,
      errorText: errorText,
    });
  }

  validatePhone(inputValue) {
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!inputValue) return "Это поле обязательно.";
    if (!phoneRegex.test(inputValue)) return "Номер телефона должен содержать от 10 до 15 цифр.";
    return "";
  }

  onChangePassword(e) {
    const inputValue = e.target.value;
    const errorText = this.validatePassword(inputValue);
    this.children.PasswordInputField.setProps({
      error: !!errorText,
      errorText: errorText,
    });
  }

  validatePassword(inputValue) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;
    if (!inputValue) return "Это поле обязательно.";
    if (!passwordRegex.test(inputValue)) return "Пароль должен содержать минимум 8 символов, включая одну заглавную букву и цифру.";
    return "";
  }

  onChangeLogin(e) {
    const inputValue = e.target.value;
    const errorText = this.validateLogin(inputValue);
    this.children.LoginInputField.setProps({
      error: !!errorText,
      errorText: errorText,
    });
  }

  validateLogin(inputValue) {
    const loginRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/;
    if (!inputValue) return "Это поле обязательно.";
    if (!loginRegex.test(inputValue)) return "Логин должен быть от 3 до 20 символов, может содержать латинские буквы, цифры, дефисы и нижние подчеркивания.";
    return "";
  }

  onSubmit(e) {
    e.preventDefault();
    const errors = Object.keys(this.children).reduce((acc, key) => {
      if (this.children[key].props.error) {
        acc.push(this.children[key].props.errorText);
      }
      return acc;
    }, []);

    if (errors.length > 0) {
      console.log("Errors:", errors);
      return;
    }

    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    console.log(data);
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
