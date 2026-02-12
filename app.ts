interface ServiceRequest {
  name: string;
  email: string;
  serviceType: string;
  description: string;
}

let requests: ServiceRequest[] = [];

const addRequest = (request: ServiceRequest): void => {
  requests.push(request);
};

const sampleRequest: ServiceRequest = {
  name: "John",
  email: "john@example.com",
  serviceType: "Water",
  description: "Water leakage"
};

addRequest(sampleRequest);
