// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// import Handlebars from "handlebars";
// import * as Components from "./components";
// import * as Pages from "./pages";
import Block from "./tools/Block";

// const context = {
//   title: "Title",
// }

// const pages = {
//   'chat': [ Pages.ChatPage ],
//   'login': [ Pages.LoginPage, context ],
// };

// Object.entries(Components).forEach(([ name, component ]) => {
//   Handlebars.registerPartial(name, component);
// });

// function navigate(page) {
//   const [ source, args ] = pages[page];
//   const handlebarsFunct = Handlebars.compile(source);
//   const lll =  handlebarsFunct(args);
//   console.log(lll)
//   document.body.innerHTML = lll;
// }

// document.addEventListener('DOMContentLoaded', () => navigate('login'));

// document.addEventListener('click', e => {
//   const page = e.target.getAttribute('page');
//   if (page) {
//     navigate(page);

//     e.preventDefault();
//     e.stopImmediatePropagation();
//   }
// });

/**
 * Represents a ChatItem component, extending the generic Block component.
 * This component is specifically designed to display a single chat message,
 * including the sender's name and the message content.
 */
class ChatItem extends Block {
  /**
   * Creates an instance of the ChatItem component with specified properties.
   * @param {Object} props - The initial properties for the ChatItem component.
   * @param {string} props.name - The name of the user who sent the message.
   * @param {string} props.message - The chat message content.
   */
  constructor({ ...props }: { name: string; message: string }) {
    super({ ...props });
  }

  /**
   * Renders the HTML content for the ChatItem component.
   * The method returns an HTML string representing a chat item, which includes
   * the sender's name and the message content.
   * @return {string} HTML string representing the chat item.
   */
  render() {
    return `
      <div>
        <div>{{ name }}</div>
        <div>{{ message }}</div>
      </div>`;
  }
}

/**
 * Represents a Button component, extending the generic Block component.
 * This component is specifically designed to handle button elements, with a click event listener.
 */
// class Button extends Block {
//   /**
//    * Creates an instance of the Button component with specific properties and event handlers.
//    * @param {Object} props - The initial properties for the Button component, including event handlers.
//    */
//   constructor(props) {
//     super({
//       ...props,
//       events: {
//         click: () => console.log("event"),
//       },
//     });
//   }
//
//   /**
//    * Renders the HTML content for the Button component.
//    * The method returns an HTML string representing a button element with dynamic text content.
//    * @returns {string} HTML string representing the button element.
//    */
//   render() {
//     return "<button>{{text}}</button>";
//   }
// }

/**
 * Represents an Input component, extending the generic Block component.
 * This component is specifically designed to handle input elements, providing
 * change and blur event handlers, and a validation method.
 */
// class Input extends Block {
//   /**
//    * Creates an instance of the Input component with specific properties, event handlers, and attributes.
//    * @param {Object} props - The initial properties for the Input component.
//    * @param {Function} props.onChange - The callback function to execute when the value of the input changes.
//    * @param {Object} [props.attr] - Additional attributes to be added to the input element.
//    */
//   constructor(props) {
//     super({
//       ...props,
//       events: {
//         change: (e) => props.onChange(e.target.value),
//         blur: (e) => this.validate(),
//       },
//       attr: {
//         class: "fake",
//       },
//     });
//   }
//
//   /**
//    * Renders the HTML content for the Input component.
//    * @returns {string} HTML string representing an input element.
//    */
//   render() {
//     return "<input />";
//   }
//
//   /**
//    * Validates the input value. This method is called when the input loses focus (on blur event).
//    */
//   validate() {
//     console.log("blur");
//   }
// }

// class Page extends Block {
//   constructor(props) {
//     super({
//       ...props, // {buttonText: 'Button'}
//       button: new Button({ text: props.buttonText }),
//       input: new Input({
//         label: "input",
//         onChange: (value) => {
//           this.setProps({ buttonText: value });
//         },
//       }),
//     });
//   }
//
//   componentDidUpdate(oldProps, newProps) {
//     if (oldProps.buttonText !== newProps.buttonText) {
//       this.children.button.setProps({ text: newProps.buttonText });
//     }
//     return true;
//   }
//
//   override render() {
//     return "<div>{{{ button }}} {{{ input }}}</div>";
//   }
// }

/**
 * Represents a Page2 component, extending the generic Block component.
 * This component is specifically designed to handle and display a list of ChatItem components.
 */
class Page2 extends Block {
  /**
   * Creates an instance of the Page2 component with specific properties and a list of ChatItem components.
   * @param {Object} props - The initial properties for the Page2 component.
   */
  constructor(props: NonNullable<unknown>) {
    super({
      ...props, // {buttonText: 'Button'}
      lists: [
        new ChatItem({ name: "Samanta Smith", message: "Алло, на!" }),
        new ChatItem({ name: "John Dow", message: "What?" }),
        new ChatItem({ name: "John Dow", message: "What?" }),
        new ChatItem({ name: "John Dow", message: "What?" }),
        new ChatItem({ name: "John Dow", message: "What?" }),
        new ChatItem({ name: "John Dow", message: "What?" }),
        new ChatItem({ name: "John Dow", message: "What?" }),
        new ChatItem({ name: "John Dow", message: "What?" }),
        new ChatItem({ name: "John Dow", message: "What?" }),
        new ChatItem({ name: "John Dow", message: "What?" }),
        new ChatItem({ name: "John Dow", message: "What?" }),
      ],
    });
  }

  /**
   * Renders the HTML content for the Page2 component.
   * The method overrides the render method from the Block class to provide specific HTML for this component.
   * @return {string} HTML string representing the content of the Page2 component.
   */
  override render(): string {
    return "<div>{{{ lists }}}</div>";
  }
}

const block = new Page2();
const container = document.getElementById("app")!;
console.log(container);
container.append(block.getContent()!);
