class AuditTrail {
  name!: string;
  constructor(name: string) {
    this.name = name;
  }
  sayHello() {
    console.log('Hi! Im ' + this.name);
  }
}

const before = async (request: any) => {
  const { event } = request;
  const { pathParameters } = event;
  const { type } = pathParameters;
  request.internal.AuditTrail = new AuditTrail(type ?? 'noname');
};

const after = async (request: any) => {
  request?.internal?.AuditTrail?.sayHello();
};

const onError = async (request: any) => {
  if (request.response === undefined) return;
  return after(request);
};

const fns = {
  before: before,
  after: after,
  onError: onError,
};

export default function auditLogMiddleware() {
  return fns;
}
