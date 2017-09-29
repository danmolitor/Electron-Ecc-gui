import React, { Component } from 'react';
import Wallet from '../../utils/wallet';

const event = require('../../utils/eventhandler');

const wallet = new Wallet();

export default class Config extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staking: false,
      dns: false,
      storage: false,
      encrypted: false,
      messaging: false,
      requesting1: false,
      requesting2: false,
    };
  }

  componentDidMount() {
    this.exchangeInterval();
    this.getWalletInfo();
    this.setTimerFunctions();
  }

  componentWillUnmount() {
    clearInterval(this.exInterval);
    clearInterval(this.timerInfo);
    this.state.requesting1 = false;
    this.state.requesting2 = false;
  }

  setTimerFunctions() {
    const self = this;

    self.timerInfo = setInterval(() => {
      if (!self.state.requesting1) {
        self.getWalletInfo();
      }
    }, 5000);
  }

  getWalletInfo() {
    const self = this;

    this.setState({ requesting1: true });

    wallet.getInfo().then((data) => {
      if (self.state.requesting1) {
        self.setState({
          staking: data.staking,
          encrypted: data.encrypted,
          requesting1: false,
        });
      }
      event.emit('hide');
    }).catch((err) => {
      if (self.state.requesting1 && err.message !== 'Method not found') {
        const errMessage = err.message === 'connect ECONNREFUSED 127.0.0.1:19119'
          ? 'Daemon not running.'
          : err.message;
        self.setState({
          requesting1: false,
        });
        event.emit('show', errMessage);
      }
    });
  }

  render() {
    return (
      <div className="configuration">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-body">
                <p className="title">Configuration</p>
                <div className="row">
                  <div className="col-md-6">Options</div>
                  <div className="col-md-3">On</div>
                  <div className="col-md-3">Off</div>
                </div>

                <div className="row config-row">
                  <div className="col-md-6">Staking</div>
                  <div className="col-md-3"><input type="radio" name="staking" checked={this.state.staking} /></div>
                  <div className="col-md-3"><input type="radio" name="staking" checked={!this.state.staking} /></div>
                </div>

                <div className="row config-row">
                  <div className="col-md-6">DNS</div>
                  <div className="col-md-3"><input type="radio" name="dns" checked={this.state.dns} /></div>
                  <div className="col-md-3"><input type="radio" name="dns" checked={!this.state.dns} /></div>
                </div>

                <div className="row config-row">
                  <div className="col-md-6">Storage</div>
                  <div className="col-md-3"><input type="radio" name="storage" checked={this.state.storage} /></div>
                  <div className="col-md-3"><input type="radio" name="storage" checked={!this.state.storage} /></div>
                </div>

                <div className="row config-row">
                  <div className="col-md-6">Encrypted Wallet</div>
                  <div className="col-md-3"><input type="radio" name="encrypted" checked={this.state.encrypted} /></div>
                  <div className="col-md-3"><input type="radio" name="encrypted" checked={!this.state.encrypted} /></div>
                </div>

                <div className="row config-row">
                  <div className="col-md-6">Messaging</div>
                  <div className="col-md-3"><input type="radio" name="messaging" checked={this.state.messaging} /></div>
                  <div className="col-md-3"><input type="radio" name="messaging" checked={!this.state.messaging} /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
