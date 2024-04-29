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
      inputClassName: "input__element",
      className: "register-page__input",
      title: "Имя",
      name: "first_name",
      onBlur: onChangeFirstNameBind,
    });

    const LastNameInputField = new InputField({
      inputClassName: "input__element",
      className: "register-page__input",
      title: "Фамилия",
      name: "second_name",
      onBlur: onChangeLastNameBind,
    });

    const EmailInputField = new InputField({
      inputClassName: "input__element",
      className: "register-page__input",
      title: "E-mail",
      name: "email",
      onBlur: onChangeEmailBind,
    });

    const LoginInputField = new InputField({
      inputClassName: "input__element",
      className: "register-page__input",
      title: "Логин",
      name: "login",
      onBlur: onChangeLoginBind,
    });

    const PasswordInputField = new InputField({
      inputClassName: "input__element",
      className: "register-page__input",
      title: "Пароль",
      name: "password",
      onBlur: onChangePasswordBind,
    });

    const RepeatPasswordInputField = new InputField({
      inputClassName: "input__element",
      className: "register-page__input",
      title: "Повторите пароль",
      name: "password",
    });

    const PhoneInputField = new InputField({
      inputClassName: "input__element",
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

  onChangeFirstName(e) {
    const inputValue = e.target.value;
    const nameRegex = /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/;

    if (inputValue === "") {
      this.children.FirstNameInputField.setProps({
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

      this.children.FirstNameInputField.setProps({
        error: true,
        errorText: errorText,
      });
    } else {
      this.children.FirstNameInputField.setProps({
        error: false,
        errorText: "",
      });
    }
  }

  onChangeLastName(e) {
    const inputValue = e.target.value;
    const nameRegex = /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/;

    if (inputValue === "") {
      this.children.LastNameInputField.setProps({
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

      this.children.LastNameInputField.setProps({
        error: true,
        errorText: errorText,
      });
    } else {
      this.children.LastNameInputField.setProps({
        error: false,
        errorText: "",
      });
    }
  }

  onChangeEmail(e) {
    const inputValue = e.target.value;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (inputValue === "") {
      this.children.EmailInputField.setProps({
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

      this.children.EmailInputField.setProps({
        error: true,
        errorText: errorText,
      });
    } else {
      this.children.EmailInputField.setProps({
        error: false,
        errorText: "",
      });
    }
  }

  onChangePhone(e) {
    const inputValue = e.target.value;
    const phoneRegex = /^\+?[0-9]{10,15}$/;

    if (inputValue === "") {
      this.children.PhoneInputField.setProps({
        error: false,
        errorText: "",
      });
    } else if (inputValue === "") {
      this.children.PhoneInputField.setProps({
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

      this.children.PhoneInputField.setProps({
        error: true,
        errorText: errorText,
      });
    } else {
      this.children.PhoneInputField.setProps({
        error: false,
        errorText: "",
      });
    }
  }

  onChangePassword(e) {
    const inputValue = e.target.value;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;

    if (inputValue === "") {
      this.children.PasswordInputField.setProps({
        error: false,
        errorText: "",
      });
    } else if (inputValue === "") {
      this.children.PasswordInputField.setProps({
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

      this.children.PasswordInputField.setProps({
        error: true,
        errorText: errorText,
      });
    } else {
      this.children.PasswordInputField.setProps({
        error: false,
        errorText: "",
      });
    }
  }

  onChangeLogin(e) {
    const inputValue = e.target.value;
    const loginRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/;

    if (inputValue === "") {
      this.children.LoginInputField.setProps({
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

      this.children.LoginInputField.setProps({
        error: true,
        errorText: errorText,
      });
    } else {
      this.children.LoginInputField.setProps({
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
