import Handlebars from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";
import {Page, PageClass} from "./types";
// import {ChatPage} from "./main";

const pages: Record<Page, [string | PageClass, PageArgs?]> = {
  [Page.Chat]: [Pages.ChatPage],
  [Page.Login]: [Pages.LoginPage],
  [Page.Register]: [Pages.RegisterPage],
  [Page.Error404]: [Pages.Error404],
  [Page.Error500]: [Pages.Error500],
  [Page.Profile]: [Pages.ProfilePage],
  [Page.ChangePassword]: [Pages.ChangePasswordPage],
  [Page.ChangeData]: [Pages.ChangeDataPage],
};

interface MenuItem {
  linkText: string;
  link: string;
}

interface Field {
  id: string;
  label: string;
  value: string;
  input: boolean;
  name?: string;
}

interface PageArgs {
  menuItems?: MenuItem[];
  fields?: Field[];
}

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

/**
 * Navigates to the specified page and renders its content using Handlebars
 * templates. This function determines the appropriate content and template
 * for the given page, compiles the Handlebars template, and updates the
 * document body with the rendered HTML. Specific page behavior and content
 * are defined by case statements that configure page-specific arguments
 * for the template.
 *
 * @param {string} page - The key identifying the page to navigate to. This key
 *                        should correspond to one of the keys in the 'pages'
 *                        object, which maps page identifiers to their
 *                        respective [PageComponent, pageArgs] tuples.
 *
 * Supported pages include:
 * - "chat": Navigates to the chat page.
 * - "login": Navigates to the login page.
 * - "register": Navigates to the registration page.
 * - "error-404": Navigates to the 404 error page.
 * - "error-500": Navigates to the 500 error page.
 * - "profile": Navigates to the user profile page.
 * - "change-password": Navigates to the change password page.
 * - "change-data": Navigates to the change user data page.
 *
 * The function adjusts the page's content and configuration based on the page
 * argument, setting up necessary data and parameters for rendering. It then
 * compiles the Handlebars template and updates the document body with the
 * resulting HTML.
 */
function navigate(page: Page) {
  const [source, pageArgs = {}] = pages[page] || [];
  let args: PageArgs = {...pageArgs};
  switch (page) {
  case Page.Profile:
    args = {
      ...pageArgs,
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
    };
    break;
  case Page.ChangePassword:
    args = {
      ...pageArgs,
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
    };
    break;
  case Page.ChangeData:
    args = {
      ...pageArgs,
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
    };
    break;
  }

  const container = document.getElementById("app")!;

  if (source instanceof Object) {
    const page = new source(args);
    container.innerHTML = "";
    container.append(page.getContent());
    // page.dispatchComponentDidMount();
    return;
  }

  const handlebarsFunct = Handlebars.compile(source);
  document.body.innerHTML = handlebarsFunct(args);
  // if (page === Page.Chat) {
  //   block = new ChatPage({});
  //   container = document.querySelector(".chat-page");
  //   if (!container) {
  //     throw new Error("No chat container found");
  //   }
  //   container.append(block.getContent()!);
  // }
}

document.addEventListener("DOMContentLoaded", () => navigate(Page.Register));

document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  const page = target.getAttribute("page") as Page | null;
  if (page) {
    // navigate(page);
    const app = document.getElementById("app")!;
    const chatPage = app.querySelector(".chat-page");

    if (chatPage) {
      app.classList.add("has-chat-page");
    }
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const app = document.getElementById("app")!;
  const chatPage = app.querySelector(".chat-page");

  if (chatPage) {
    app.classList.add("has-chat-page");
  }
});
