export type UserDTO = {
    email: string;
    username: string;
    password: string;
};

export type SignUpResponse = {
    data: {
        obfuscatedEmail: string;
    };
};
