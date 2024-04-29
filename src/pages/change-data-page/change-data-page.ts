import Block from "../../tools/Block";
import {AccountInfoCard, AccountInfoTable, Button} from "../../components";

export default class ChangeDataPage extends Block {
  init() {
    const AccInfoCard = new AccountInfoCard({
      name: "Иван Иванов",
      username: "ivanivanov",
      utcOffset: "+3",
    });

    const AccInfoTable = new AccountInfoTable({});

    this.children = {
      ...this.children,
      AccInfoCard,
      AccInfoTable,
    };

    super.init();
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
         </div>
    `;
  }
}

// {{#> Dialog }}
//   <form class="profile-page">
//     <div class="profile-page__content">
//       <div class="profile-page__title-margin">
//         Профиль
//       </div>
//       {{> AccountInfoCard name="Иван Иванов" username="ivanivanov" utcOffset="+3" }}
//       {{> AccountInfoTable }}
//     </div>
//     <div class="profile-page__footer">
//       {{> ChangeProfileSection menuItems=menuItems }}
//     </div>
//   </form>
// {{/ Dialog }}

// <div class="account-info-table">
//   {{#each fields as |field|}}
//     <div class="account-info-table__field">
//       <label for="{{field.id}}" class="account-info-table__label">{{field.label}}</label>
//       <div id="{{field.id}}" class="account-info-table__value">
//         {{#if field.input}}
//           {{> PageInput id="{{field.id}}" name="{{field.name}}" value="{{field.defaultValue}}" }}
//         {{else}}
//           {{field.value}}
//         {{/if}}
//       </div>
//     </div>
//   {{/each}}
// </div>

// case Page.ChangeData:
//     args = {
//       ...pageArgs,
//       menuItems: [
//         {linkText: "Изменить данные", link: "change-data"},
//         {linkText: "Изменить пароль", link: "change-password"},
//         {linkText: "Выйти", link: "login"},
//       ],
//       fields: [
//         {
//           id: "email",
//           label: "Почта",
//           value: "example@example.com",
//           name: "email",
//           input: true,
//         },
//         {
//           id: "login",
//           label: "Логин",
//           value: "example",
//           name: "login",
//           input: true,
//         },
//         {
//           id: "first-name",
//           label: "Имя",
//           value: "Иван",
//           name: "first_name",
//           input: true,
//         },
//         {
//           id: "second-name",
//           label: "Фамилия",
//           value: "Иванов",
//           name: "second_name",
//           input: true,
//         },
//         {
//           id: "display-name",
//           label: "Имя в чате",
//           value: "Иван",
//           name: "display_name",
//           input: true,
//         },
//         {
//           id: "phone",
//           label: "Телефон",
//           value: "+7 (909) 967 30 30",
//           name: "phone",
//           input: true,
//         },
//       ],
//     };
//     break;
