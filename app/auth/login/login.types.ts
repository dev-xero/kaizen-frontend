import { User } from '@/types/user.type';

export type LogInDTO = {
    email: string;
    password: string;
};

type PartialLogInResponse = {
    accessToken: string;
    refreshToken: string;
};

export type LogInResponse = {
    data: PartialLogInResponse & User;
};
