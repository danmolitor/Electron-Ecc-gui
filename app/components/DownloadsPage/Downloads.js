import React, { Component } from 'react';

export default class Downloads extends Component {
  render() {
    return (
      <div className={'row downloads'}>
        <div className="col-md-12">
          <p className="title">Downloads</p>
          <div className="panel panel-default">
            <div className="panel-body text-center larger-text">
              <div className="download-link-container col-md-3 col-lg-3 col-xs-6" style={{ cursor: 'pointer' }}>
                <a className="download-link" href="https://www.ecc.network/downloads/updates/eccoind-64" download="eccoind">Linux 64 Bit</a>
              </div>
              <div className="download-link-container col-md-3 col-lg-3 col-xs-6" style={{ cursor: 'pointer' }}>
                <a className="download-link" href="https://www.ecc.network/downloads/updates/eccoind-32" download="eccoind">Linux 32 Bit</a>
              </div>
              <div className="download-link-container col-md-3 col-lg-3 col-xs-6">
                <a className="download-link" href="https://www.ecc.network/downloads/updates/eccoind-64.exe" download="eccoind">Windows 64 Bit</a>
              </div>
              <div className="download-link-container col-md-3 col-lg-3 col-xs-6">
                <a className="download-link" href="https://www.ecc.network/downloads/updates/eccoind-32.exe" download="eccoind">Windows 32 Bit</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

