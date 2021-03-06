import "./index.css";
import React, { Component } from "react";
import subscribeToMessages from "./messages";
import FadeIn from "./FadeIn";

// Scroll down anytime new messages come
// Don't scroll down if someone scrolls up

class PinScrollToBottom extends Component {

  componentDidMount() {
    // this.doImperativeStuff();
    this.scroll();
  }

  componentDidUpdate () {
    // this.doImperativeStuff();
    this.scroll();
  }

  componentWillUpdate () {
    const { clientHeight, scrollTop, scrollHeight } = document.documentElement;
    this.scrolledUp = clientHeight + scrollTop < scrollHeight;
  }

  scroll () {
    if (!this.scrolledUp) {
      window.scrollTo(0, document.documentElement.scrollHeight);
    }
  }

  render() {
    return this.props.children;
  }
}

class App extends Component {
  state = {
    messages: []
  };

  componentDidMount() {
    subscribeToMessages(message => {
      this.setState({
        messages: this.state.messages.concat([message])
      });
    });
  }

  render() {
    const { messages, scrollTop } = this.state;
    return (
      <div className="app">
        <div className="link">
          <a href="https://www.youtube.com/watch?v=VKHFZBUTA4k&list=RDVKHFZBUTA4k">
            Sketch on YouTube
          </a>
        </div>
        <PinScrollToBottom>
          <ol className="messages">
            {messages.map((message, index) => (
              <FadeIn key={index}>
                <li className="message">
                  <div
                    className="avatar"
                    style={{ backgroundImage: `url(${message.avatar})` }}
                  />
                  <div className="text">{message.text}</div>
                </li>
              </FadeIn>
            ))}
          </ol>
        </PinScrollToBottom>
      </div>
    );
  }
}

export default App;
