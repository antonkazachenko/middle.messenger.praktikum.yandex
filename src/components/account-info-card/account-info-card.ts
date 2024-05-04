import Block from "../../tools/Block";

type TAccountInfoCardProps = {
  name: string;
  username: string;
  utcOffset: string;
};

export default class AccountInfoCard extends Block {
  constructor(props: TAccountInfoCardProps) {
    super(props);
  }

  render() {
    return `
      <div class="account-info-card">
        <div class="account-info-card__image-wrapper">
          <div class="account-info-card__image"></div>
        </div>
        <div class="account-info-card__info">
          <div class="account-info-card__name">{{ name }}</div>
          <div class="account-info-card__username">@{{ username }}</div>
          <div class="account-info-card__location">
            Location, UTC {{ utcOffset }}
          </div>
        </div>
      </div>
    `;
  }
}
