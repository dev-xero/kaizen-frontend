export type SignUpDTO = {
    email: string;
    username: string;
    password: string;
};

export type SignUpResponse = {
    data: {
        obfuscatedEmail: string;
    };
};
