declare var Promise;
import * as fetch from 'node-fetch';

export default class UpdateService {
  public async checkUpdate (): Promise<boolean> {
    const updateURL = `https://raw.githubusercontent.com/damoonrashidi/wdp/master/package.json`;
    let data = await (await fetch(updateURL)).json();
    return data.version;
  }
}