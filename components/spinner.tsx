import Lottie from 'lottie-react';
import spinner from '@/animated/spinner.json';

export default function Spinner() {
    return (
        <div className="w-8 max-w-8 h-8 max-h-8">
            <Lottie animationData={spinner} loop={true} />
        </div>
    );
}
