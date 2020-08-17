class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type);
    }
    setAttribute(name, value) {
        this.root.setAttribute(name, value);
    }
    appendChild(component) {
        this.root.appendChild(component.root);
    }
}

class TextWrapper {
    constructor(content) {
        this.root = document.createTextNode(content);
    }
}

export class Component {
    constructor(type) {
        this.props = Object.create(null);
        this.children = [];
        this._root = null;
    }
    setAttribute(name, value) {
        this.props[name] = value;
    }
    appendChild(component) {
        this.children.push(component);
    }
    get root() {
        if(!this._root) {
            this._root = this.render().root;
        }
        return this._root;
    }
}

export function createElement(type, attributes, ...children){
    let e;
    if (typeof type === "string"){
        e = new ElementWrapper(type);
    }
    else {
        e = new type;
    }
    for (let a in attributes){
        e.setAttribute(a, attributes[a]);
    }
    let insertChildren = (children) => {
        for (let c of children){
            if ((typeof c === "object") && (c instanceof Array)){
                insertChildren(c);
            }
            else {
                if(typeof c === "string"){
                    c = new TextWrapper(c)
                }
                e.appendChild(c);
            }
        }
    }
    insertChildren(children)
    return e;
}
export function render(component, parentElement) {
    parentElement.appendChild(component.root)
}