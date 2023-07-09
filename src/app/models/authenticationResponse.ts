export interface AuthenticationResponse {
    userName: string,
    token: string,
    expiration: Date,
    refreshToken: string,
    refreshTokenExpiration: Date,
}