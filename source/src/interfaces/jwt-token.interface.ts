export interface JwtToken {
    sub: string;
    token_use: string;
    scope: string;
    auth_time: number;
    iss: string;
    exp: number;
    iat: number;
    version: number;
    jti: string;
    client_id: string;
  }
  