// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import EventBus from "./EventBus";
import Handlebars from "handlebars";
/* eslint-disable @typescript-eslint/ban-types,
@typescript-eslint/no-explicit-any, valid-jsdoc,
@typescript-eslint/no-unused-vars */
/**
 * Represents a generic block component in an application, managing lifecycle
 * events, properties, and rendering.
 */
export default class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  _element = null;
  _id = Math.floor(100000 + Math.random() * 900000);

  /**
   * Creates an instance of Block.
   * @param {Object} propsWithChildren - The initial properties and children
   * of the block.
   */
  constructor(propsWithChildren: object = {}) {
    const eventBus = new EventBus();
    const {props, children, lists} =
      this._getChildrenPropsAndProps(propsWithChildren);
    this.props = this._makePropsProxy({...props});
    this.children = children;
    this.lists = lists;
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  /**
   * Registers the DOM events listed in the block's properties.
   */
  _addEvents() {
    const {events = {}} = this.props;
    Object.keys(events).forEach((eventName) => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  /**
   * Registers block events with the event bus.
   * @param {EventBus} eventBus - The event bus to register the block's
   * events with.
   */
  _registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  /**
   * Initializes the block by emitting the FLOW_RENDER event.
   */
  _init() {
    this.init();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  init() {}

  /**
   * Handles the component did mount lifecycle event.
   */
  _componentDidMount() {
    this.componentDidMount();
    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  /**
   * Placeholder for the componentDidMount lifecycle method which can be
   * overridden.
   * @param {Object} oldProps - The previous properties of the block.
   */
  componentDidMount(oldProps: object) {}

  /**
   * Dispatches the component did mount event for this block.
   */
  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  /**
   * Handles the component did update lifecycle event.
   * @param {Object} oldProps - The old properties of the block.
   * @param {Object} newProps - The new properties of the block.
   * @return {boolean} Whether the component should re-render.
   */
  _componentDidUpdate(oldProps: object, newProps: object): boolean {
    console.log("_componentDidUpdate");
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
    return true;
  }

  /**
   * Placeholder for the componentDidUpdate lifecycle method which can be
   * overridden.
   * @param {Object} oldProps - The old properties of the block.
   * @param {Object} newProps - The new properties of the block.
   * @return {boolean} Whether the component should re-render.
   */
  componentDidUpdate(oldProps, newProps) {
    return true;
  }

  /**
   * Separates children blocks, lists, and props from a combined object.
   * @param {Object} propsAndChildren - The combined properties and children.
   * @return {Object} The separated properties, children, and lists.
   */
  _getChildrenPropsAndProps(propsAndChildren) {
    const children = {};
    const props = {};
    const lists = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value)) {
        lists[key] = value;
      } else {
        props[key] = value;
      }
    });

    return {children, props, lists};
  }

  /**
   * Adds attributes to the block's root element based on the `attr` property.
   */
  addAttributes() {
    const {attr = {}} = this.props;

    Object.entries(attr).forEach(([key, value]) => {
      this._element.setAttribute(key, value);
    });
  }

  /**
   * Updates the block's properties with new values.
   * @param {Object} nextProps - The new properties to be set.
   */
  setProps(nextProps) {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  }

  /**
   * Gets the root element of the block.
   * @return {HTMLElement} The root HTML element of the block.
   */
  get element() {
    return this._element;
  }

  /**
   * Renders the block's content, updates the DOM, and binds events.
   */
  _render() {
    const propsAndStubs = {...this.props};
    const _tmpId = Math.floor(100000 + Math.random() * 900000);
    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    if (this.lists) {
      Object.entries(this.lists).forEach(([key, _]) => {
        propsAndStubs[key] = `<div data-id="__l_${_tmpId}"></div>`;
      });
    }

    const fragment = this._createDocumentElement("template");
    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      stub.replaceWith(child.getContent());
    });

    if (this.lists) {
      Object.entries(this.lists).forEach(([, list]) => {
        const listContainer = this._createDocumentElement("template");
        list.forEach((item) => {
          if (item instanceof Block) {
            listContainer.content.append(item.getContent());
          } else {
            listContainer.content.append(`${item}`);
          }
        });
        const stub = fragment.content
          .querySelector(`[data-id="__l_${_tmpId}"]`);
        stub.replaceWith(listContainer.content);
      });
    }

    const newElement = fragment.content.firstElementChild;
    if (this._element) {
      this._element.replaceWith(newElement);
    }
    this._element = newElement;
    this._addEvents();
  }

  /**
   * Placeholder for the render method, which should be overridden to return
   * HTML content as a string.
   * @return {string} The HTML content to render.
   */
  render() {}

  /**
   * Retrieves the content of the block, which is its root element.
   * @return {HTMLElement} The root element of the block.
   */
  getContent(): string | Node {
    return this.element;
  }

  /**
   * Creates a proxy around the block's props to enable reactivity.
   * @param {Object} props - The initial props object.
   * @return {Proxy} A proxy that surrounds the props.
   */
  _makePropsProxy(props) {
    return new Proxy(props, {
      get: (target, prop) => {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set: (target, prop, value) => {
        const oldTarget = {...target};
        target[prop] = value;
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty: () => {
        throw new Error("No access");
      },
    });
  }

  /**
   * Creates a new HTML element with the specified tag name.
   * @param {string} tagName - The tag name for the new element.
   * @return {Element} The new HTML element.
   */
  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  /**
   * Shows the block by setting its display style to 'block'.
   */
  show() {
    this.getContent().style.display = "block";
  }

  /**
   * Hides the block by setting its display style to 'none'.
   */
  hide() {
    this.getContent().style.display = "none";
  }
}
