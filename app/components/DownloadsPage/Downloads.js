import React, { Component } from 'react';

const electron = require('electron');

const event = require('../../utils/eventhandler');

export default class Downloads extends Component {
  downloadLinux64 = () => {
    electron.remote.require('electron-download-manager').download({ url: 'https://www.ecc.network/downloads/updates/eccoind-linux64', filename: 'Eccoind'}, (err, url) => {
      if (err) {
        event.emit('hide');
        event.emit('animate', err);
      } else {
        event.emit('hide');
        event.emit('animate', 'Daemon downloaded.');
      }
    });
  };
  downloadLinux32 = () => {
    electron.remote.require('electron-download-manager').download({ url: 'https://www.ecc.network/downloads/updates/eccoind-linux32', filename: 'Eccoind' }, (err, url) => {
      if (err) {
        event.emit('hide');
        event.emit('animate', err);
      } else {
        event.emit('hide');
        event.emit('animate', 'Daemon downloaded.');
      }
    });
  };
  downloadWindows64 = () => {
    electron.remote.require('electron-download-manager').download({ url: 'https://www.ecc.network/downloads/updates/eccoind-64.exe', filename: 'Eccoind' }, (err, url) => {
      if (err) {
        event.emit('hide');
        event.emit('animate', err);
      } else {
        event.emit('hide');
        event.emit('animate', 'Daemon downloaded.');
      }
    });
  };
  downloadWindows32 = () => {
    electron.remote.require('electron-download-manager').download({ url: 'https://www.ecc.network/downloads/updates/eccoind-32.exe', filename: 'Eccoind' }, (err, url) => {
      if (err) {
        event.emit('hide');
        event.emit('animate', err);
      } else {
        event.emit('hide');
        event.emit('animated', 'Daemon downloaded.');
      }
    });
  };
  render() {
    return (
      <div className={'row downloads'}>
        <div className="col-md-12">
          <p className="title">Downloads</p>
          <div className="panel panel-default">
            <div className="panel-body text-center larger-text">
              <div className="download-link-container col-md-3 col-lg-3 col-xs-6" style={{ cursor: 'pointer' }}>
                <a className="download-link" onClick={this.downloadLinux64}>Linux 64 Bit</a>
              </div>
              <div className="download-link-container col-md-3 col-lg-3 col-xs-6" style={{ cursor: 'pointer' }}>
                <a className="download-link" onClick={this.downloadLinux32}>Linux 32 Bit</a>
              </div>
              <div className="download-link-container col-md-3 col-lg-3 col-xs-6" style={{ cursor: 'pointer' }}>
                <a className="download-link" onClick={this.downloadWindows64}>Windows 64 Bit</a>
              </div>
              <div className="download-link-container col-md-3 col-lg-3 col-xs-6" style={{ cursor: 'pointer' }}>
                <a className="download-link" onClick={this.downloadWindows32}>Windows 32 Bit</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

