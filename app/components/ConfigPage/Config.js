import React, { Component } from 'react';
import fs from 'fs';
import Wallet from '../../utils/wallet';
const homedir = require('os').homedir();

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

    this.toggleStaking = this.toggleStaking.bind(this);
  }

  componentDidMount() {
    this.getConfigInfo();
    console.log(homedir);
  }

  getConfigInfo() {
    fs.readFile(`${homedir}/.eccoin/eccoin.conf`, 'utf8', (err, data) => {
      if (err) {
        return console.log(err);
      }

      if (/staking=[0-9]/g.test(data)) {
        if (/staking=1/g.test(data)) {
          this.setState({ staking: true });
        } else {
          this.setState({ staking: false });
        }
      } else {
        this.setState({ staking: false });
      }

      // fs.writeFile(someFile, result, 'utf8', function (err) {
      //   if (err) return console.log(err);
      // });
    });
  }

  toggleStaking(event) {
    event.persist();
    fs.readFile(`${homedir}/.eccoin/eccoin.conf`, 'utf8', (err, data) => {
      if (err) {
        return console.log(err);
      }

      const result = data.replace(/staking=[0-9]/g, `staking=${event.target.value}`);

      fs.writeFile(`${homedir}/.eccoin/eccoin.conf`, result, 'utf8', (err) => {
        if (err) {
          return console.log(err);
        }
        this.getConfigInfo();
      });
    });
  }

  render() {
    return (
      <div className="configuration">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-body">
                <p className="title">Configuration (daemon must be stopped for changes to take effect)</p>
                <div className="row config-row">
                  <div className="col-md-6 col-sm-6 col-xs-6">Options</div>
                  <div className="col-md-3 col-sm-3 col-xs-3">On</div>
                  <div className="col-md-3 col-sm-3 col-xs-3">Off</div>
                </div>

                <div className="row config-row">
                  <div className="col-md-6 col-sm-6 col-xs-6">Staking</div>
                  <div className="col-md-3 col-sm-3 col-xs-3"><input onChange={this.toggleStaking} type="radio" value={1} name="staking" checked={this.state.staking} /></div>
                  <div className="col-md-3 col-sm-3 col-xs-3"><input onChange={this.toggleStaking} type="radio" value={0} name="staking" checked={!this.state.staking} /></div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
