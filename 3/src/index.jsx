import 'babel-polyfill';
import React, { Component as C } from 'react';
import { render } from 'react-dom';

class Stars extends C {
  constructor(props) {
    super();
  }
  render() {
    return <span> { "⭐".repeat(this.props.length) } </span>;
  }
};

class Liker extends C {
  constructor(props) {
    super();
    this.state = {
      id: props.id,
      title: props.title,
      votes: props.votes
    };
  }
  plus() {
    const votes = +this.state.votes + 1;
    this.setState({ votes });
  }
  minus() {
    const votes = this.state.votes > 0 ? +this.state.votes - 1 : 0;
    this.setState({ votes });
  }
  render() {
    return (
      <div>
        <span>{this.state.id}. {this.state.title} </span>
        <button onClick={() => this.plus()}> + </button>
        <button onClick={() => this.minus()}> - </button>
        <Stars length={this.state.votes} />
      </div>
    );
  }
}

class List extends C {
  constructor(props) {
    super();
    const { stars } = props;
    this.state = { data: [] };
  }
  render() {
    return (
      <div> {
        this.state.data.map(el => {
          return <Liker key={el.id} id={el.id + 1} title={ el.title } votes={ el.votes } />
          })
        }
      </div>
    );
  }
  componentDidMount() {
    fetch('https://kodaktor.ru/j/react5b_6cbf2')
    .then(res => res.json())
    .then(data => this.setState({ data }));
  }
}

render(
  <List />,
  document.querySelector('.cont'),
  );
