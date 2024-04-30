import Block from "../../tools/Block";
import {
  AccountInfoCard,
  AccountInfoTable,
  ChangeProfileSection,
} from "../../components";

export default class ProfilePage extends Block {
  constructor(props) {
    super({
      ...props,
      AccInfoCard: new AccountInfoCard({
        name: "Иван Иванов",
        username: "ivanivanov",
        utcOffset: "+3",
      }),
      AccInfoTable: new AccountInfoTable({
        noInput: true,
        noButton: true,
      }),
      ChangeProfileSection: new ChangeProfileSection({
        menuItems: props.menuItems,
      }),
    });
  }
  render() {
    return `
      <div class="profile-page">
        <div class="profile-page__content">
          <div class="profile-page__title-margin">
            Профиль
          </div>
          {{{ AccInfoCard }}}
          {{{ AccInfoTable }}}
        </div>
        <div class="profile-page__footer">
          {{{ ChangeProfileSection }}}
        </div>
      </div>
    `;
  }
}
