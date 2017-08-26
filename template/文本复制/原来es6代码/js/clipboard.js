import ClipboardAction from './clipboard-action';
import Emitter from 'tiny-emitter';
import listen from 'good-listener';
/**
 * Base class which takes one or more elements, adds event listeners to them,
 * and instantiates a new `ClipboardAction` on each click.
 */
class Clipboard extends Emitter {
    /**
     * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
     * @param {Object} options
     */
    constructor(trigger, options) {

        console.log("******************** 1 ********************");
        super();
        this.resolveOptions(options);
        this.listenClick(trigger);
    }

    /**
     * Defines if attributes would be resolved using internal setter functions
     * or custom functions that were passed in the constructor.
     * @param {Object} options
     */
    resolveOptions(options = {}) {
        console.log("******************** 2 ********************");
          console.log('optons',options);
        this.action    = (typeof options.action    === 'function') ? options.action    : this.defaultAction;
        this.target    = (typeof options.target    === 'function') ? options.target    : this.defaultTarget;
        this.text      = (typeof options.text      === 'function') ? options.text      : this.defaultText;
        this.container = (typeof options.container === 'object')   ? options.container : document.body;
        console.log( 'this.target',this.target );
    }

    /**
     * Adds a click event listener to the passed trigger.
     * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
     */
    listenClick(trigger) {
        console.log("******************** 3 ********************");
        console.log(trigger);
        this.listener = listen(trigger, 'click', (e) => this.onClick(e));
    }

    /**
     * Defines a new `ClipboardAction` on each click event.
     * @param {Event} e
     */
    onClick(e) {
        console.log("******************** 4 ********************");
        const trigger = e.delegateTarget || e.currentTarget;
        console.log('trigger::',trigger);
        console.log("this.clipboardAction",this.clipboardAction);
        if (this.clipboardAction) {
            this.clipboardAction = null;
        }
        
        this.clipboardAction = new ClipboardAction({
            action    : this.action(trigger),
            target    : this.target(trigger),
            text      : this.text(trigger),
            container : this.container,
            trigger   : trigger,
            emitter   : this
        });
        console.log("复制后this.clipboardAction",this.clipboardAction);

    }

    /**
     * Default `action` lookup function.
     * @param {Element} trigger
     */
    defaultAction(trigger) {
        console.log("******************** 5 ********************");
        console.log(getAttributeValue('action', trigger))
        return getAttributeValue('action', trigger);
    }

    /**
     * Default `target` lookup function.
     * @param {Element} trigger
     */
    defaultTarget(trigger) {
        console.log("******************** 6 ********************");
        const selector = getAttributeValue('target', trigger);

        if (selector) {
            return document.querySelector(selector);
        }
    }

    /**
     * Returns the support of the given action, or all actions if no action is
     * given.
     * @param {String} [action]
     */
    static isSupported(action = ['copy', 'cut']) {
        console.log(7);
        const actions = (typeof action === 'string') ? [action] : action;
        let support = !!document.queryCommandSupported;

        actions.forEach((action) => {
            support = support && !!document.queryCommandSupported(action);
        });

        return support;
    }

    /**
     * Default `text` lookup function.
     * @param {Element} trigger
     */
    defaultText(trigger) {
        console.log("******************** 8 ********************");
        return getAttributeValue('text', trigger);
    }

    /**
     * Destroy lifecycle.
     */
    destroy() {
        console.log(9);
        this.listener.destroy();

        if (this.clipboardAction) {
            this.clipboardAction.destroy();
            this.clipboardAction = null;
        }
    }
}

/**
 * Helper function to retrieve attribute value.
 * @param {String} suffix
 * @param {Element} element
 */
function getAttributeValue(suffix, element) {
    const attribute = `data-clipboard-${suffix}`;

    if (!element.hasAttribute(attribute)) {
        return;
    }

    return element.getAttribute(attribute);
}

module.exports = Clipboard;
