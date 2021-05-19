export class Activity {
  static default = 'loading';

  // tslint:disable-next-line: variable-name
  private _activities: {
    [key: string]: boolean
  } = {};

  get loading() {
    return this.is(Activity.default);
  }

  is(key: string): boolean {
    return this._activities[key] || false;
  }

  stop(key?: string) {
    key = key || Activity.default;
    this._activities[key] = false;
  }

  start(key?: string) {
    key = key || Activity.default;
    this._activities[key] = true;
  }

  stopAll() {
    Object.keys(this._activities).forEach(key => {
      this._activities[key] = false;
    });
  }
}
