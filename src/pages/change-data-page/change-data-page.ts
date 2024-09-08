import Block from "../../tools/Block";
import {AccountInfoCard, AccountInfoTable} from "../../components";

export default class ChangeDataPage extends Block {
  init() {
    const AccInfoCard = new AccountInfoCard({
      name: "Иван Иванов",
      username: "ivanivanov",
      utcOffset: "+3",
    });

    const AccInfoTableInputs = new AccountInfoTable({});

    this.children = {
      ...this.children,
      AccInfoCard,
      AccInfoTableInputs,
    };

    super.init();
  }

  render() {
    return `
        <div class="login-page__background">
          <div class="profile-page">
           <div class="profile-page__content">
             <div class="profile-page__title-margin">
               Профиль
             </div>
             {{{ AccInfoCard }}}
             {{{ AccInfoTableInputs }}}
           </div>
         </div>
        </div>
    `;
  }
}
