import React, { Component } from 'react';
import fs from 'fs';
import os from 'os';
import $ from 'jquery';
import Wallet from '../../utils/wallet';
import { traduction } from '../../lang/lang';

const event = require('../../utils/eventhandler');
const remote = require('electron').remote;

const dialog = remote.require('electron').dialog;
const app = remote.app;

const lang = traduction();
const wallet = new Wallet();

class Security extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      pass1: '',
      pass2: '',
      passStrengh: lang.backup1PasswordWeak,
      passEqual: '',
    };
  }

  componentDidMount(){
    this.checkIfWalletEncrypted();
  }

  checkIfWalletEncrypted(){
    const self = this;
    wallet.help().then((data) => {
      // console.log(data);
      if (data.indexOf('walletlock') > -1) {
        self.setState({ step: 3 });
      }
    }).catch((err) => {
      const errMessage = err.message === 'connect ECONNREFUSED 127.0.0.1:19119'
        ? 'Daemon not running.'
        : err.message;
      event.emit('animate', errMessage);
    });
  }

  scorePassword(pass) {
    let score = 0;
    if (!pass) {
      return score;
    }

    // award every unique letter until 5 repetitions
    const letters = {};
    for (let i = 0; i < pass.length; i += 1) {
      letters[pass[i]] = (letters[pass[i]] || 0) + 1;
      score += 5.0 / letters[pass[i]];
    }

    // bonus points for mixing it up
    const variations = {
      digits: /\d/.test(pass),
      lower: /[a-z]/.test(pass),
      upper: /[A-Z]/.test(pass),
      nonWords: /\W/.test(pass),
    };

    let variationCount = 0;
    for (const check in variations) {
      variationCount += (variations[check] === true) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;

    return parseInt(score);
  }

  onChangePass1(event) {
    const score = this.scorePassword(event.target.value);
    let aux = lang.backup1PasswordWeak;
    if (score > 80){
      aux = lang.backup1PasswordStrong;
    } else if (score > 60) {
      aux = lang.backup1PasswordGood;
    }
    this.setState({ pass1: event.target.value, passStrengh: aux });
  }

  onChangePass2(event) {
    this.setState({ pass2: event.target.value });
  }

  onClickNext1() {
    if (this.state.pass1.length <= 0) {
      event.emit('animate', lang.invalidFields);
    } else {
      this.setState({ step: 2, pass2: '', passEqual: '' });
    }
  }

  onClickNext2() {
    const self = this;
    if (this.state.pass2.length <= 0) {
      event.emit('animate', lang.invalidFields);
    } else {
      if (this.state.pass1 !== this.state.pass2) {
        this.setState({ passEqual: lang.backup2PasswordsDontMatch });
      } else {
        wallet.encryptWallet(self.state.pass2).then((data) =>{
          if (data.code === -1) {
            event.emit('animate', lang.walletEncryptedError);
          } else {
            self.setState({ step: 3 });
            event.emit('animate', lang.walletEncrypted);
          }
        }).catch((err) => {
          console.log(err);
          event.emit('animate', err);
        });
      }
    }
  }

  onClickBack() {
    this.setState({ step: 1, pass1: '', passStrengh: ''});
  }

  onClickBackupLocation() {
    const self = this;
    dialog.showOpenDialog({
      properties: ['openDirectory']
    }, (folderPaths) => {
        if (folderPaths === undefined) {
          event.emit('animate', lang.noFolderSelected);
          return;
        } else {
          const platform = os.platform();
          let walletpath;

          if (platform.indexOf('win') > -1) {
            walletpath = `${app.getPath('appData')}/eccoin/wallet.dat`;
          } else {
            walletpath = `${app.getPath('home')}/.eccoin/wallet.dat`;
          }

          fs.readFile(walletpath, (err, data) => {
            if (err) {
              console.log(err);
              event.emit('animate', lang.readingFileError);
              return;
            }

            fs.writeFile(`${folderPaths}/walletBackup.dat`, data, (err) => {
              if (err) {
                console.log(err);
                event.emit('animate', lang.writtingFileError);
              }
              event.emit('animate', lang.backupOk);
            });
          });
        }
    });
  }

  renderCircle(opt){
    if (this.state.step === opt) {
      return 'circle_active';
    }
    return null;
  }

  renderPageStep() {
    if (this.state.step === 1) {
      let passColor = '#f44336';

      if (this.state.passStrengh === lang.backup1PasswordGood) {
        passColor = '#ffc107';
      } else if (this.state.passStrengh === lang.backup1PasswordStrong) {
        passColor = '#4caf50';
      }

      return(
        <div className="page">
          <p className="title">{lang.backup1CreateYourPassword}</p>
          <p className="desc">{lang.backup1Warning1} <span className="desc_green">{lang.backup1Warning2Green}</span> {lang.backup1Warning3}</p>
          <input className="input" placeholder={lang.typeYourPassword} type="password" value={this.state.pass1} onChange={this.onChangePass1.bind(this)}/>
          <p style={{ color: passColor }} className="desc_pass">{this.state.passStrengh}</p>
          <p className="nextButton" onClick={this.onClickNext1.bind(this)}>{lang.backupNext}</p>
        </div>
      );
    } else if (this.state.step === 2) {
      return (
        <div className="page">
          <p className="title">{lang.backup2TitleBold}</p>
          <p className="desc">{lang.backup2Warning1} <span className="desc_green">{lang.backup2Warning2Green}</span> {lang.backup2Warning3}</p>
          <input className="input" placeholder={lang.typeYourPassword} type="password" value={this.state.pass2} onChange={this.onChangePass2.bind(this)}/>
          <p className="desc_pass">{this.state.passEqual}</p>
          <p className="nextButton left" onClick={this.onClickBack.bind(this)}>{lang.backupBack}</p>
          <p className="nextButton right" onClick={this.onClickNext2.bind(this)}>{lang.backupNext}</p>
        </div>
      );
    } else if (this.state.step === 3) {
      return (
        <div className="page">
          <p className="title">{lang.backup3TitleBold}</p>
          <p className="desc">{lang.backup3Message1}</p>
          <p className="desc">{lang.backup3Message2}
          <span className="desc_green"> {lang.backup3Message3Green}</span></p>
          <p className="desc">{lang.backup3Message4}</p>
          <p className="nextButton" onClick={this.onClickBackupLocation.bind(this)}>{lang.backup3SetBackupLocation}</p>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="backup">
        <div className={"circle circle_left" + " " + this.renderCircle(1)}>1</div>
        <div className={"circle circle_center" + " " + this.renderCircle(2)}>2</div>
        <div className={"circle circle_right"  + " " + this.renderCircle(3)}>3</div>
        <div className="line"></div>
        <div className="backup_inner">
          <p>{lang.backup1Step + " " + this.state.step + lang.conjuctionOf + " 3"}</p>
          {this.renderPageStep()}
        </div>
        <div className="tip">
            <p className="tip_title">{lang.backupTipBold}</p>
            <p className="tip_desc">{lang.backupTipMessage}</p>
          </div>
      </div>
    );
  }
}

export default Security;
