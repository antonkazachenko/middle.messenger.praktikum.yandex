import Block from "../../tools/Block";

export default class ChangeProfileSection extends Block {
  constructor(props) {
    super(props);
  }

  render() {
    return `
      <div class="menu">
        {{#each menuItems}}
          <div class="menu__field">
            {{> Link page=link text=linkText className="menu__link" }}
          </div>
        {{/each}}
      </div>
    `;
  }
}
