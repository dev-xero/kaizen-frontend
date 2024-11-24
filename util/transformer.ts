import { AxiosError } from 'axios';

// Extracts error messages from axios request-response object
export default function TransformErrorMessage(err: Error): string {
    if (err instanceof AxiosError) {
        if (err.response) {
            const { data } = err.response;

            return data.message != 'Something went wrong internally.'
                ? data.message
                : 'Could not sign up, please try again shortly.';
        } else {
            return 'An unknown error occurred.';
        }
    }

    return 'Something went wrong, please try again shortly.';
}
