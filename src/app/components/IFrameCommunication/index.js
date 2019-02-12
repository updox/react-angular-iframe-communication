import React, { Component, Fragment } from 'react';
import { Bellhop } from 'bellhop-iframe';

/**
 * -----------------------------------------------------------------------------
 * React Component: IFrameCommunication
 * -----------------------------------------------------------------------------
 */
export default class IFrameCommunication extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.input = React.createRef();
        this.iframe = React.createRef();
        this.bellhop = new Bellhop();
    }

    shouldComponentUpdate() {
        return false;
    }

    onSend() {
        if (this.input.current.value) {
            this.bellhop.send('products', [this.input.current.value]);
            this.input.current.value = '';
        }
    }

    componentDidMount() {
        this.bellhop.connect(this.iframe.current);
    }

    render() {
        return (
            <main>
                <section className='iframe-demo-row'>
                    React Control
                    <div className='form-group'>
                        <input
                            ref={this.input}
                            type='text'
                            placeholder='Add item from React'
                        />
                        <button
                            onClick={this.onSend.bind(this)}
                            className='btn btn-primary'>
                            Send to webapp
                        </button>
                    </div>
                </section>

                <section className='iframe-demo-row'>
                    <iframe
                        id={'webapp'}
                        frameBorder={0}
                        scrolling={'no'}
                        ref={this.iframe}
                        src='http://localhost:8080/ui/html/index.html#/inbox'
                    />
                </section>
            </main>
        );
    }
}

IFrameCommunication.defaultProps = {};
