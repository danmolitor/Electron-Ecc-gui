import React, { Component } from 'react';

const { ipcRenderer } = require('electron');

const event = require('../../utils/eventhandler');

export default class Downloads extends Component {
  componentWillMount() {
    ipcRenderer.on('daemon-downloaded', (e, err) => {
      if (err) {
        event.emit('hide');
        event.emit('animate', err);
      } else {
        event.emit('hide');
        event.emit('animate', 'Daemon downloaded and ready to start.');
      }
    });
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners('daemon-downloaded');
  }
  downloadLinux64 = () => {
    event.emit('animate', 'Daemon downloading...');
    ipcRenderer.send('daemon-download', { url: 'https://www.ecc.network/downloads/updates/eccoind-linux64', filename: 'Eccoind' });
  };
  downloadLinux32 = () => {
    event.emit('animate', 'Daemon downloading...');
    ipcRenderer.send('daemon-download', { url: 'https://www.ecc.network/downloads/updates/eccoind-linux32', filename: 'Eccoind' });

  };
  downloadWindows64 = () => {
    event.emit('animate', 'Daemon downloading...');
    ipcRenderer.send('daemon-download', { url: 'https://www.ecc.network/downloads/updates/eccoind-64.exe', filename: 'Eccoind' });
  };
  downloadWindows32 = () => {
    event.emit('animate', 'Daemon downloading...');
    ipcRenderer.send('daemon-download', { url: 'https://www.ecc.network/downloads/updates/eccoind-32.exe', filename: 'Eccoind' });
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

