import { AxiosError } from 'axios';

// Extracts error messages from axios request-response object
export default function ExtractErrorMessage(err: Error): string {
    if (err instanceof AxiosError) {
        if (err.response) {
            const { data } = err.response;

            return data.message;
        } else {
            return 'An unknown error occurred.';
        }
    }

    return 'Something went wrong, please try again shortly.';
}
