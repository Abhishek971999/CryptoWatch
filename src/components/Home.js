import React, { Component, Fragment } from 'react';
import axios from 'axios';
class Home extends Component {
  state = {
    data: [],
  };
  fetchData = () => {
    axios.get('https://api.coinlore.net/api/tickers/').then((res) =>
      this.setState({
        data: res.data.data,
      })
    );
  };
  componentDidMount = () => {
    this.fetchData();
  };
  convertNum = (labelValue) => {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e9
      ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + 'B'
      : Math.abs(Number(labelValue)) >= 1.0e6
      ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + 'M'
      : Math.abs(Number(labelValue)) >= 1.0e3
      ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + 'K'
      : Math.abs(Number(labelValue));
  };
  render() {
    console.log(this.state.data);
    const cryptoData = this.state.data.map((data, key) => (
      <tr key={key} className='t-row'>
        <td>{data.rank}</td>
        <td>{data.symbol}</td>
        <td>{data.name}</td>
        <td>{data.price_usd}</td>

        <td>{this.convertNum(data.volume24)}</td>
        <td>{this.convertNum(data.market_cap_usd)}</td>
        {data.percent_change_1h > 0 ? (
          <td style={{ color: '#10B915' }}>
            {data.percent_change_1h}&nbsp;&#8593;
          </td>
        ) : (
          <td style={{ color: 'red' }}>
            {data.percent_change_1h}&nbsp;&#8595;
          </td>
        )}
        {data.percent_change_24h > 0 ? (
          <td style={{ color: '#10B915' }}>
            {data.percent_change_24h}&nbsp;&#8593;
          </td>
        ) : (
          <td style={{ color: 'red' }}>
            {data.percent_change_24h}&nbsp;&#8595;
          </td>
        )}
        {data.percent_change_7d > 0 ? (
          <td style={{ color: '#10B915' }}>
            {data.percent_change_7d}&nbsp;&#8593;
          </td>
        ) : (
          <td style={{ color: 'red' }}>
            {data.percent_change_7d}&nbsp;&#8595;
          </td>
        )}
      </tr>
    ));
    return (
      <Fragment>
        <header className='text-center header'>
          <h4>CryptoWatch</h4>
          <h6>
            Cryptowatch is a real-time crypto markets platform to track and
            analyze price charts
          </h6>
          <button className='button' onClick={this.fetchData()}>
            Refresh
          </button>
        </header>
        <div className='row justify-content-center'>
          <table className='col-10 table table-hover table-striped table-sm table-dark'>
            <thead className='thead'>
              <tr>
                <th scope='col'></th>
                <th scope='col'>Symbol</th>
                <th scope='col'>Name</th>
                <th scope='col'>Price(&#36;)</th>
                <th scope='col'>24H Vol</th>
                <th scope='col'>Market Cap</th>
                <th scope='col'>Change 1H</th>
                <th scope='col'>Change 24H</th>
                <th scope='col'>Change 7D</th>
              </tr>
            </thead>
            <tbody>{cryptoData}</tbody>
          </table>
        </div>
      </Fragment>
    );
  }
}

export default Home;
