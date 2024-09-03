import Block from "../../tools/Block";

export default class ProfileInput extends Block {
  constructor() {
    super();
  }

  render() {
    return `
      <input
        class="profile-input"
        type="text"
        id="{{field.id}}"
        name="{{field.name}}"
        value="{{field.defaultValue}}"
      />
     `;
  }
}
