class Response {
  constructor(json) {
    this.name = json.name;
    this.status = json.status;
    this.code = json.code;
    this.headers = json.header;
    this.body = json.body;
  }

  getBodyExample() {
    let result = '';
    if (this.body == null) return result;
    try {
      result = JSON.parse(this.body);
      result = '```json\n' + JSON.stringify(result, null, 2) + '\n```';
    } catch (e) {
      result = '```\n' + this.body + '\n```';
    }
    return result;
  }
}

export default Response;