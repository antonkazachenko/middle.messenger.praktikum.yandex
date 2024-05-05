import Block from "../../tools/Block";
import {Link} from "../link";

type TChangeProfileSectionProps = {
  ChangeDataLink: Link;
  ChangePasswordLink: Link;
  LoginLink: Link;
};

export default class ChangeProfileSection extends Block {
  constructor(props: { menuItems: string[] } | TChangeProfileSectionProps) {
    super({
      ...props,
      ChangeDataLink: new Link({
        text: "Изменить данные",
        page: "change-data",
        className: "menu__link",
      }),
      ChangePasswordLink: new Link({
        text: "Изменить пароль",
        page: "change-password",
        className: "menu__link",
      }),
      LoginLink: new Link({
        text: "Выйти",
        page: "login",
        className: "menu__link-red",
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
