import Lottie from 'lottie-react';
import spinner from '@/animated/spinner.json';
import darkSpinner from '@/animated/darkspinner.json';
import purpleSpinner from '@/animated/purplespinner.json';

export default function Spinner() {
    return (
        <div className="w-8 max-w-8 h-8 max-h-8">
            <Lottie animationData={spinner} loop={true} />
        </div>
    );
}

export function DarkSpinner() {
    return (
        <div className="w-8 max-w-8 h-8 max-h-8">
            <Lottie animationData={darkSpinner} loop={true} />
        </div>
    );
}

export function PurpleSpinner() {
    return (
        <div className="w-8 max-w-8 h-8 max-h-8">
            <Lottie animationData={purpleSpinner} loop={true} />
        </div>
    );
}
