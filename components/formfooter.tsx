import Link from './link';

type FormFooterProps = {
    alternative: 'signup' | 'login';
};

export default function FormFooter(props: FormFooterProps) {
    return (
        <footer className="flex items-center justify-center gap-4 mt-8 mb-4">
            <Link
                text="forgot my password"
                href="/auth/forgot-password"
                external={false}
            />
            {props.alternative == 'signup' ? (
                <Link
                    text="signup instead"
                    href="/auth/signup"
                    external={false}
                />
            ) : (
                <Link
                    text="login instead"
                    href="/auth/login"
                    external={false}
                />
            )}
        </footer>
    );
}
