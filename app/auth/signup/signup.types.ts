export type UserDTO = {
    email: string;
    username: string;
    password: string;
};

export type SignUpResponse = {
    obfuscatedEmail: string;
    accessToken: string;
    refreshToken: string;
};
