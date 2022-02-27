export interface User {
    username: string;
    accessToken: string;
    accessTokenExpiration: Date;
    refreshToken: string;
    refreshTokenExpiration: Date;
    firstName: string;
    lastName: string;
    email: string;
    role: string[];
}