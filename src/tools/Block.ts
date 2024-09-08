import EventBus from "./EventBus";
import {nanoid} from "nanoid";
import Handlebars from "handlebars";

// eslint-disable-next-line valid-jsdoc
/**
 * Represents the base component class in a web application framework.
 * This class provides core functionality for component lifecycle management,
 * event handling, and rendering.
 */
export default class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  private readonly _eventBus: EventBus;
  private _element: HTMLElement | null = null;
  private _id: string = nanoid(6);
  public children: { [key: string]: Block };
  // eslint-disable-next-line @typescript-eslint/ban-types
  public props: { [key: string]: Object | string | Function };

  /**
   * Initializes a new instance of the Block class with optional properties
   * and children.
   * @param {Object} propsWithChildren - Initial properties and child
   * components.
   */
  constructor(propsWithChildren: object = {}) {
    this._eventBus = new EventBus();
    const {props, children} = this._getChildrenAndProps(propsWithChildren);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.props = this._makePropsProxy({...props});
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.children = children;

    this._registerEvents(this._eventBus);

    this._eventBus.emit(Block.EVENTS.INIT);
  }

  get eventBus(): EventBus {
    return this._eventBus;
  }

  /**
   * Registers DOM events based on component's properties.
   */
  _addEvents() {
    const {events = {}} = this.props;

    Object.keys(events).forEach((eventName) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  /**
   * Registers internal component lifecycle events with the event bus.
   * @param {EventBus} eventBus - The event bus for the component.
   */
  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  /**
   * Initialization lifecycle method that sets up the component.
   */
  _createResources() {
    // const {tagName} = this._meta;
    // this._element = this._createDocumentElement(tagName);
  }

  /**
   * Initialization lifecycle method that sets up the component.
   */
  _init() {
    // this._createResources();
    this.init();

    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  /**
   * Additional initialization logic for derived classes. Intended to
   * be overridden.
   */
  init() {

  }

  /**
   * Lifecycle method called after the component is mounted to the DOM.
   */
  _componentDidMount() {
    this.componentDidMount();
    console.log("CDM");

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  /**
   * Additional logic after component mount. Intended to be overridden.
   */
  componentDidMount() {
  }

  /**
   * Triggers the component-did-mount event for child components.
   */
  dispatchComponentDidMount() {
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: object, newProps: object) {
    console.log("CDU");
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }


  /**
   * Lifecycle method called when the component's properties change.
   * @param {Object} oldProps - The previous properties.
   * @param {Object} newProps - The new properties.
   * @return {boolean} Indicates whether the component should re-render.
   */
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidUpdate(oldProps?: object, newProps?: object): boolean {
    return true;
  }

  /**
   * Separates children components from properties.
   * @param {Object} propsAndChildren - Combined properties and children.
   * @return {{children: Object, props: Object}} Separated children and
   * properties.
   */
  _getChildrenAndProps(propsAndChildren: object): {
    children: object;
    props: object;
  } {
    const children = {};
    const props = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        children[key] = value;
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        props[key] = value;
      }
    });

    return {children, props};
  }

  setProps(nextProps: object) {
    if (!nextProps) {
      return;
    }

    const oldProps = {...this.props};
    Object.assign(this.props, nextProps);

    this.eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, this.props);
  }


  get element() {
    return this._element;
  }

  _render() {
    const propsAndStubs = {...this.props};

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    const fragment = this._createDocumentElement("template");

    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const newElement = fragment.content.firstElementChild;

    Object.values(this.children).forEach((child) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

      stub?.replaceWith(child.getContent());
    });

    if (this._element) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();
  }

  render() {}

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: object) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = {...target};
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        target[prop] = value;

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в следующей итерации нужно заставлять
        // добавлять cloneDeep им самим
        console.log("Updated ", target);
        self.eventBus.emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  show() {
    this.getContent()!.style.display = "show";
  }

  hide() {
    this.getContent()!.style.display = "none";
  }
}
