import Handlebars from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";

const pages = {
    "chat": [Pages.ChatPage],
    "login": [Pages.LoginPage],
    "register": [Pages.RegisterPage],
    "error-404": [Pages.Error404],
    "error-500": [Pages.Error500],
    "profile": [Pages.ProfilePage],
    "change-password": [Pages.ChangePasswordPage],
    "change-data": [Pages.ChangeDataPage],
};

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
function navigate(page) {
    const [source, pageArgs] = pages[page];
    let args;
    switch (page) {
    case "profile":
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
    case "change-password":
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
    case "change-data":
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
    const handlebarsFunct = Handlebars.compile(source);
    document.body.innerHTML = handlebarsFunct(args);
}


document.addEventListener("DOMContentLoaded", () => navigate("profile"));

document.addEventListener("click", (e) => {
    const page = e.target.getAttribute("page");
    if (page) {
        navigate(page);

        e.preventDefault();
        e.stopImmediatePropagation();
    }
});
