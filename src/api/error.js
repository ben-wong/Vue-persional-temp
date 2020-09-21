export function ResError({ msg = '', code = '', data = {}, name = 'Error', status = '' } = {}) {
  this.name = name;
  this.message = msg;
  this.data = data;
  this.code = code;
  this.status = status;
  this.stack = (new Error()).stack;
}

ResError.prototype = Object.create(Error.prototype);
ResError.prototype.constructor = ResError;
