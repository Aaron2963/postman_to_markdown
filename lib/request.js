class Request {
  constructor(json, auth = null) {
    this.name = json.name;
    this.method = json.request.method;
    this.url = json.request.url.path.join('/');
    this.description = json.request.description ?? '';
    this.headers = json.request.header;
    if ('body' in json.request) {
      this.bodyMode = json.request.body.mode;
      this.body = json.request.body[this.bodyMode];
    }
    if (auth == null) {
      this.auth = json.request.auth;
    } else {
      this.auth = auth;
    }
    this.hasAuth = this.auth != null && this.auth.type !== 'noauth';
    this.hasHeaders = this.headers != null || this.headers.length > 0 || this.hasAuth;
  }

  getHeaderTable() {
    let result = '', keys = [];
    if (!this.hasHeaders) return result;
    result += '| Name | Type | Description |\n';
    result += '| ---- | ---- | ----------- |\n';
    // authorization
    if (this.hasAuth) {
      result += `| \`Authorization\` | \`string\` | **(必填)** ${this.auth.type} token |\n`;
    }
    // other headers
    for (let i = 0; i < this.headers.length; i++) {
      const param = this.headers[i];
      if (keys.indexOf(param.key) !== -1) continue;
      param.description = param.description.replace('`必填`', '**(必填)** ');
      result += `| \`${param.key}\` | \`${param.type}\` | ${param.description} |\n`;
      keys.push(param.key);
    }
    return result;
  }

  getBodyTable() {
    let result = '', keys = [];
    if (this.body == null) return result;
    result += '| Name | Type | Description |\n';
    result += '| ---- | ---- | ----------- |\n';
    for (let i = 0; i < this.body.length; i++) {
      const param = this.body[i];
      if (keys.indexOf(param.key) !== -1) continue;
      param.description = param.description.replace('`必填`', '**(必填)** ');
      result += `| \`${param.key}\` | \`${param.type}\` | ${param.description} |\n`;
      keys.push(param.key);
    }
    return result;
  }

  getBodyExample() {
    let result = '';
    if (this.body == null) return result;
    for (let i = 0; i < this.body.length; i++) {
      const param = this.body[i];
      result += `${param.key}: ${param.value}\n`;
    }
    return result;
  }

  getParamBrief() {
    let result = [];
    if (this.hasHeaders) {
      result.push('String in HTTP Header');
    }
    if (this.body != null) {
      result.push('Parameter(s) in HTTP Body');
    }
    return result.join(', ');
  }
}

export default Request;