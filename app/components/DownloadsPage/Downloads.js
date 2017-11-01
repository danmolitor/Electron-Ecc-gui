import React, { Component } from 'react';
import fs from 'fs';

const request = require('request-promise-native');

// axios.defaults.adapter = require('axios/lib/adapters/http');

const homedir = require('os').homedir();

const { ipcRenderer } = require('electron');

const event = require('../../utils/eventhandler');

export default class Downloads extends Component {
  componentWillMount() {
    ipcRenderer.on('daemon-downloaded', (e, err) => {
      if (err) {
        event.emit('hide');
        event.emit('animate', err);
      } else {
        const opts = {
          url: 'https://api.github.com/repos/Greg-Griffith/eccoin/releases/latest',
          headers: {
            'User-Agent': 'request',
          },
        };
        return request(opts)
          .then((response) => {
            const path = `${homedir}/.eccoin-daemon`;
            const parsed = JSON.parse(response);
            const version = parsed.name;
            fs.writeFile(`${path}/daemon-version.txt`, version, (err) => {
              if (err) throw err;
              ipcRenderer.send('daemon-version-created');
              event.emit('hide');
              event.emit('animate', 'Daemon downloaded and ready to start.');
            });
          })
          .catch(error => console.log(error));
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
    ipcRenderer.send('daemon-download', { url: 'https://www.ecc.network/downloads/updates/eccoind-win64.exe', filename: 'Eccoind' });
  };
  downloadWindows32 = () => {
    event.emit('animate', 'Daemon downloading...');
    ipcRenderer.send('daemon-download', { url: 'https://www.ecc.network/downloads/updates/eccoind-win32.exe', filename: 'Eccoind' });
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

