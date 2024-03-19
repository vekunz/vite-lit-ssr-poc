import {LitElement, css, html} from 'lit';

export class LitDemo extends LitElement {
    static styles = css`
        :host {
            color: green;
        }
        input {
            color: red;
        }
    `;
    
    static properties = {
        value: {type: String, reflect: true}
    };
    
    render() {
        return html`<input .value=${this.value} @input="${this._input}" /><slot></slot><button @click="${this._click}">Alert</button><slot name="second"></slot>`;
    }
    
    _click() {
        alert(this.value);
    }
    
    _input(event) {
        this.value = event.target.value;
    }
}

customElements.define('ex-litdemo', LitDemo);
