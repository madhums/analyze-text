import React, { Component } from 'react';
import sentiment from 'sentiment';
import qs from 'qs';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    const text = qs.parse(window.location.search.slice(1)).text || '';
    this.state = {
      result: text ? sentiment(text) : null,
      text
    };
  }

  render() {
    const { result, text } = this.state;
    const color = val => val === 0
      ? 'inherit'
      : result.score < 0
        ? 'red'
        : 'green';

    return (
      <div className="container">
        <h2 className="page-header">Analyze text</h2>
        <div className="row">
          <div className="col-sm-4">
            <form>
              <textarea rows={15} value={text} className="form-control"
                onChange={e => this.analyze(e)}
                placeholder="Type some text here to analyze"></textarea>
            </form>
          </div>
          <div className="col-sm-4">
            {result && <div className="result">
              <div className="item">
                <div className="head">Score</div>
                <div style={{ color: color(result.score) }}>{result.score}</div>
              </div>
              <div className="item">
                <div className="head">Comparative</div>
                <div style={{ color: color(result.comparative) }}>{result.comparative}</div>
              </div>
              <div className="item">
                <div className="head">Positive</div>
                <ul className="list-unstyled">
                  {result.positive.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
                {!result.positive.length && <em className="text-muted">None</em>}
              </div>
              <div className="item">
                <div className="head">Negative</div>
                <ul className="list-unstyled">
                  {result.negative.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
                {!result.negative.length && <em className="text-muted">None</em>}
              </div>
            </div>}
          </div>
          <div className="col-sm-4">
            <ul>
              <li>
                <a href="https://en.wikipedia.org/wiki/Sentiment_analysis" target="_blank">
                  Sentiment analysis (wikipedia)
                </a>
              </li>
              <li>
                <a href="https://github.com/thisandagain/sentiment" target="_blank">
                  Sentiment (github)
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  analyze (e) {
    this.setState({
      text: e.target.value,
      result: sentiment(e.target.value)
    });
  }
}

export default App;
