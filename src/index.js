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
};

Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});
function navigate(page) {
  const [ source, pageArgs ] = pages[page];
  const args = page === 'profile' ? {
    ...pageArgs,
    menuItems: [
      { linkText: 'Изменить данные', link: 'edit-data' },
      { linkText: 'Изменить пароль', link: 'change-password' },
      { linkText: 'Выйти', link: 'login' }
    ]
  } : pageArgs;
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
