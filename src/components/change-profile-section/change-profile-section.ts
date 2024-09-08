import Block from "../../tools/Block";
import {Link} from "../link";

type TChangeProfileSectionProps = {
  ChangeDataLink: Link;
  ChangePasswordLink: Link;
  LoginLink: Link;
  menuItems?: string[]; // If menuItems is needed, make it optional
};

export default class ChangeProfileSection extends Block {
  constructor(props: TChangeProfileSectionProps) {
    super({
      ...props,
      ChangeDataLink: new Link({
        text: "Изменить данные",
        page: "change-data",
        className: "menu__link",
        events: {
          click: () => window.router.go("/change-data"),
        },
      }),
      ChangePasswordLink: new Link({
        text: "Изменить пароль",
        page: "change-password",
        className: "menu__link",
        events: {
          click: () => window.router.go("/change-password"),
        },
      }),
      LoginLink: new Link({
        text: "Выйти",
        page: "login",
        className: "menu__link-red",
        events: {
          click: () => window.router.go("/login"),
        },
      }),
    });
  }

  render() {
    return `
      <div class="menu">
        <div class="menu__field">
            {{{ ChangeDataLink }}}
        </div>
        <div class="menu__field">
            {{{ ChangePasswordLink }}}
        </div>
        <div class="menu__field">
          {{{ LoginLink }}}
        </div>
      </div>
    `;
  }
}
