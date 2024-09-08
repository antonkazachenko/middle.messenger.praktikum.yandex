import Block from "../../tools/Block";
import ChatMessageInput
  from "../../components/chat-message-input/chat-message-input";
import {Link} from "../../components";

export default class ChatPage extends Block {
  init() {
    const onMessageChangeBind = this.onMessageChange.bind(this);

    const ChatMessageInputComponent = new ChatMessageInput({
      id: "search",
      name: "search",
      defaultValue: "Введите сообщение",
      onBlur: onMessageChangeBind,
    });

    this.children = {
      ...this.children,
      ChatMessageInputComponent,
      ProfileLink: new Link({
        text: "Профиль",
        page: "profile",
        className: "chat-page__messages-profile-text",
        events: {
          click: () => {
            window.router.go("/profile");
          },
        },
      }),
    };

    super.init();
  }

  onMessageChange(e: Event) {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }
    const inputValue = e.target.value;

    if (inputValue === "") {
      this.children.ChatMessageInputComponent.setProps({
        defaultValue: "Сообщение не должно быть пустым",
      });
    } else {
      this.children.ChatMessageInputComponent.setProps({
        defaultValue: "Введите сообщение",
      });
    }
  }

  render() {
    return `
      <div class="chat-page">
        <div class="chat-page__messages">
          <div class="chat-page__messages-profile">
            <div class="chat-page__messages-profile-title">
              {{{ ProfileLink }}}
            </div>
            {{> ArrowIcon }}
          </div>
          <div class="chat-page__messages-profile-input">
            {{> ChatSearchInput }}
          </div>
          {{#> ChatList className="chat-page__messages-list" }}
            {{#each (chat-page-list)}}
              {{> ChatItem }}
            {{/each}}
          {{/ ChatList }}
        </div>
        <div class="chat-page__main">
          <div class="chat-page__main-stub">
            <span class="chat-page__main-text">
              Выберите чат чтобы отправить сообщение
            </span>
          </div>
          {{{ ChatMessageInputComponent }}}
        </div>
      </div>
    `;
  }
}
