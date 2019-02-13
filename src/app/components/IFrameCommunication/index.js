import React, { Component } from 'react';
import { Bellhop } from 'bellhop-iframe';

/**
 * -----------------------------------------------------------------------------
 * React Component: IFrameCommunication
 * -----------------------------------------------------------------------------
 */
export default class IFrameCommunication extends Component {
    constructor(props) {
        super(props);

        this.input = React.createRef();
        this.iframe = React.createRef();
        this.bellhop = new Bellhop();

        this.state = {
            practiceName: null,
        };
    }

    componentDidMount() {
        this.bellhop.connect(this.iframe.current);

        this.bellhop.on('AuthUser', event =>
            this.setState({ practiceName: event.data.practiceName }),
        );
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps - ', nextProps);
        if (this.props !== nextProps) {
            console.log('updated');
        }
    }

    // Sender function sends 'ehrs' type down to iframe
    onSend = () => {
        if (this.input.current.value) {
            this.bellhop.send('ehrs', [this.input.current.value]);
            this.input.current.value = '';
        }
    };

    render() {
        return (
            <main>
                <section className='iframe-demo-row--small'>
                    {this.state.practiceName && this.state.practiceName}
                    <div className='form-group'>
                        <input
                            ref={this.input}
                            type='text'
                            placeholder='Add EHR from React'
                        />
                        <button
                            onClick={this.onSend}
                            className='btn btn-primary'>
                            Send to webapp
                        </button>
                    </div>
                </section>

                <section className='iframe-wrapper'>
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
