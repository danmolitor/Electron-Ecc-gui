import Client from 'bitcoin-core';

const { exec } = require('child_process');

const client = new Client({
  host: '127.0.0.1',
  port: 19119,
  username: 'yourusername',
  password: 'yourpassword'
});

export default class Wallet {
  help() {
    return new Promise((resolve, reject) => {
      client.help().then((data) => {
        return resolve(data);
      }).catch((err) => {
        return reject(err);
      });
    });
  }

  command(batch) {
    return new Promise((resolve, reject) => {
      client.command(batch).then((responses) => {
        return resolve(responses);
      }).catch((err) => {
        return reject(err);
      });
    });
  }

  getInfo() {
    return new Promise((resolve, reject) => {
      client.getInfo().then((data) => {
        return resolve(data);
      }).catch((err) => {
        return reject(err);
      });
    });
  }

  getTransactions(account, count, skip) {
    return new Promise((resolve, reject) => {
      let a = account;
      if (a === null) {
        a = '*';
      }
      client.listTransactions(a, count, skip).then((transactions) => {
        return resolve(transactions);
      }).catch((err) => {
        return reject(err);
      });
    });
  }

  listAllAccounts() {
    return new Promise((resolve, reject) => {
      client.listReceivedByAddress(0, true).then((addresses) => {
        return resolve(addresses);
      }).catch((err) => {
        return reject(err);
      });
    });
  }

  async createNewAddress(nameOpt) {
    const name = nameOpt || null;
    let newAddress;
    if (name === null) {
      newAddress = await client.getNewAddress();
    } else {
      newAddress = await client.getNewAddress(name);
    }
    return newAddress;
  }

  async sendMoney(sendAddress, amount) {
    const amountNum = parseFloat(amount);
    const sendAddressStr = `${sendAddress}`;
    await client.sendToAddress(sendAddressStr, amountNum);
  }

  async setTxFee(amount) {
    const amountNum = parseFloat(amount);
    await client.setTxFee(amountNum);
  }

  async validate(address) {
    const result = await client.validateAddress(address);
    return result;
  }

  async getblockcount() {
    const result = await client.getBlockCount();
    return result;
  }

  async getblockhash(hash) {
    const result = await client.getBlockHash(hash);
    return result;
  }

  async getpeerinfo() {
    const result = await client.getPeerInfo();
    return result;
  }

  async encryptWallet(passphrase) {
    try {
      const result = await client.encryptWallet(passphrase);
      return result;
    } catch (err) {
      return err;
    }
  }

  async walletlock() {
    try {
      const result = await client.walletLock();
      return result;
    } catch (err) {
      return err;
    }
  }

  async walletpassphrase(passphrase, time) {
    try {
      const ntime = parseInt(time)
      const result = await client.walletPassphrase(passphrase, ntime);
      return result;
    } catch (err) {
      return err;
    }
  }

  async walletChangePassphrase(oldPassphrase, newPassphrase) {
    try {
      const result = await client.walletPassphraseChange(oldPassphrase, newPassphrase);
      return result;
    } catch (err) {
      return err;
    }
  }

  async walletstop() {
    try {
      return await client.stop();
    } catch (err) {
      return err;
    }
  }

  walletstart(cb) {
    const path = '../../../eccoind';
    exec(path, (err, stdout, stderr) => {
      if (err) {
        console.error(err);
      }
      if (stderr) {
        return cb(false);
      }
      return cb(true);
    });
  }
}
