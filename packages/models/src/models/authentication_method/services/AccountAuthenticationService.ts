import { MockableService } from "@/models/mocks/MockableService";

class AuthenticationMethodServiceClass extends MockableService<AuthenticationMethodServiceClass> {
  constructor() {
    super();
    this.wrapMethods(this);
  }
}

export const AuthenticationMethodService =
  new AuthenticationMethodServiceClass();
