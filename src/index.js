import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

const pages = {
  'chat': [ Pages.ChatPage ],
  'login': [ Pages.LoginPage ],
  'register': [ Pages.RegisterPage ],
  'error-404': [ Pages.Error404 ],
  'error-500': [ Pages.Error500 ],
  'profile': [ Pages.ProfilePage ],
  'change-password': [ Pages.ChangePasswordPage ],
  'change-data': [ Pages.ChangeDataPage ],
};

Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});
function navigate(page) {
  const [ source, pageArgs ] = pages[page];
  let args;
    switch (page) {
      case 'profile':
        args = {
          ...pageArgs,
          menuItems: [
            {linkText: 'Изменить данные', link: 'change-data'},
            {linkText: 'Изменить пароль', link: 'change-password'},
            {linkText: 'Выйти', link: 'login'}
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
          ]
        }
        break;
      case 'change-password':
        args = {
          ...pageArgs,
          menuItems: [
            {linkText: 'Изменить данные', link: 'change-data'},
            {linkText: 'Изменить пароль', link: 'change-password'},
            {linkText: 'Выйти', link: 'login'}
          ],
          fields: [
            {
              id: "old-password",
              label: "Старый пароль",
              value: "",
              input: true,
            },
            {
              id: "new-password",
              label: "Новый пароль",
              value: "",
              input: true,
            },
            {
              id: "new-password-again",
              label: "Повторите новый пароль",
              value: "",
              input: true,
            },
          ]
        }
        break;
      case 'change-data':
        args = {
          ...pageArgs,
          menuItems: [
            {linkText: 'Изменить данные', link: 'change-data'},
            {linkText: 'Изменить пароль', link: 'change-password'},
            {linkText: 'Выйти', link: 'login'}
          ],
          fields: [
            {
              id: "email",
              label: "Почта",
              value: "example@example.com",
              input: true,
            },
            {
              id: "login",
              label: "Логин",
              value: "example",
              input: true,
            },
            {
              id: "first-name",
              label: "Имя",
              value: "Иван",
              input: true,
            },
            {
              id: "second-name",
              label: "Фамилия",
              value: "Иванов",
              input: true,
            },
            {
              id: "display-name",
              label: "Имя в чате",
              value: "Иван",
              input: true,
            },
            {
              id: "phone",
              label: "Телефон",
              value: "+7 (909) 967 30 30",
              input: true,
            },
          ]
        }
        break;
    }
  const handlebarsFunct = Handlebars.compile(source);
  document.body.innerHTML = handlebarsFunct(args);
}


document.addEventListener('DOMContentLoaded', () => navigate('profile'));

document.addEventListener('click', e => {
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
