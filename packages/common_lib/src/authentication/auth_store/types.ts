import { AuthenticationType } from "@/models/models/authentication_method/_constants/type";

export interface VerifyPayload {
  challenge_id: string;
  type: AuthenticationType;
  code?: string;
  // Method-specific response data

  credential_id?: string;
  authenticator_data?: string;
  client_data_json?: string;
  signature?: string;
  user_handle?: string;
  response?: any;
  remember_me?: boolean;
}
export interface VerifyResponse {
  account_id: string;
  verified: boolean;
  //NOOP for typescript ssues
  required_2fa: null;
  //NOOP for typescript ssues
  test_code: null;
  //NOOP for typescript ssues
  signup: null;
}

export interface InitiatePayload {
  type: AuthenticationType;
  identifier?: string;
  account_id?: string;
  remember_me?: boolean;
  password?: string;
  token?: string;
  oauth_provider?: string;
  user_verification?: string;
}
export interface InitiateResponse {
  challenge_id: string;
  type: AuthenticationType;
  required_2fa?: AuthenticationType;
  expires_at: number;
  challenge_data: ChallengeData;
  verified: boolean;
  two_fa_identifier?: string;
  test_code?: string; // For testing purposes only
  signup?: boolean; // Signal to client that they should be sent to signup flow since they dont have an account after successful oauth verification
}

export interface RegistrationResponse {
  auth_challenge: InitiateResponse;
}

export interface ChallengeData {
  account_id: string;
  code_hash: string;
  masked_email: string;
  masked_phone: string;
  challenge: string;
  webauthn_user_id: string;
  user_verification: string;
  public_key_options: {
    publicKey: PublicKeyCredentialRequestOptions;
  };
  public_key_creation: any;
}
