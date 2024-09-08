import Handlebars from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";
import {Router} from "./tools/Router";

declare global {
  interface Window {
    router: Router;
  }
}


Object.entries(Components).forEach(([name, component]) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Handlebars.registerPartial(name, component);
});

document.addEventListener("DOMContentLoaded", () => {
  window.router = new Router(".app");

  window.router
    .use("/chat", Pages.ChatPage)
    .use("/login", Pages.LoginPage)
    .use("/register", Pages.RegisterPage)
    .use("/error-404", Pages.Error404)
    .use("/error-500", Pages.Error500)
    .use("/profile", Pages.ProfilePage, {
      menuItems: [
        {linkText: "Изменить данные", link: "change-data"},
        {linkText: "Изменить пароль", link: "change-password"},
        {linkText: "Выйти", link: "login"},
      ],
      fields: [
        {
          id: "email",
          label: "Почта",
          value: "user@example.com",
          input: false,
        },
        {
          id: "login",
          label: "Логин",
          value: "user",
          input: false,
        },
        {
          id: "first-name",
          label: "Имя",
          value: "Иван",
          input: false,
        },
        {
          id: "second-name",
          label: "Фамилия",
          value: "Иванов",
          input: false,
        },
        {
          id: "display-name",
          label: "Имя в чате",
          value: "Иван",
          input: false,
        },
        {
          id: "phone",
          label: "Телефон",
          value: "+7 (909) 967 30 30",
          input: false,
        },
      ],
    })
    .use("/change-password", Pages.ChangePasswordPage, {
      menuItems: [
        {linkText: "Изменить данные", link: "change-data"},
        {linkText: "Изменить пароль", link: "change-password"},
        {linkText: "Выйти", link: "login"},
      ],
      fields: [
        {
          id: "old-password",
          label: "Старый пароль",
          value: "",
          name: "oldPassword",
          input: true,
        },
        {
          id: "new-password",
          label: "Новый пароль",
          value: "",
          name: "newPassword",
          input: true,
        },
        {
          id: "new-password-again",
          label: "Повторите новый пароль",
          value: "",
          input: true,
        },
      ],
    })
    .use("/change-data", Pages.ChangeDataPage, {
      menuItems: [
        {linkText: "Изменить данные", link: "change-data"},
        {linkText: "Изменить пароль", link: "change-password"},
        {linkText: "Выйти", link: "login"},
      ],
      fields: [
        {
          id: "email",
          label: "Почта",
          value: "example@example.com",
          name: "email",
          input: true,
        },
        {
          id: "login",
          label: "Логин",
          value: "example",
          name: "login",
          input: true,
        },
        {
          id: "first-name",
          label: "Имя",
          value: "Иван",
          name: "first_name",
          input: true,
        },
        {
          id: "second-name",
          label: "Фамилия",
          value: "Иванов",
          name: "second_name",
          input: true,
        },
        {
          id: "display-name",
          label: "Имя в чате",
          value: "Иван",
          name: "display_name",
          input: true,
        },
        {
          id: "phone",
          label: "Телефон",
          value: "+7 (909) 967 30 30",
          name: "phone",
          input: true,
        },
      ],
    })
    .start();

  window.router.go("/login");
});
