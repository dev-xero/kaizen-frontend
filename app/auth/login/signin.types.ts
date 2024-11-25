import { User } from '@/types/user.type';

export type SignInDTO = {
    email: string;
    password: string;
};

type PartialSignInResponse = {
    accessToken: string;
    refreshToken: string;
};

export type SignInResponse = {
    data: PartialSignInResponse & User;
};
