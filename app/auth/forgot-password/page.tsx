'use client';

import FormFooter from '@/components/formfooter';
import KaizenLogo from '@/components/kaizen';
import Spinner from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CenteredGridLayout from '@/layouts/CenteredGridLayout';
import { cn } from '@/lib/utils';
import { At } from '@phosphor-icons/react';
import { useState } from 'react';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');

    return (
        <CenteredGridLayout>
            <section>
                <KaizenLogo />
                <h2 className="font-bold text-2xl my-2">Forgot My Password</h2>
                <p className="text-gray-700 dark:text-gray-400">
                    You can get your password changed if you&apos;ve forgotten
                    it. We will send you an email with the reset link.
                </p>

                <div className="flex flex-col gap-2 my-4">
                    <div className="relative">
                        <At
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-indigo-500 dark:text-indigo-400 "
                            size={24}
                        />
                        <Input
                            name="kaizen-email"
                            type="email"
                            required={true}
                            placeholder="Email address"
                            className={cn(
                                'pl-10 py-2 border border-gray-300 dark:focus:ring-indigo-300 focus-visible:border-indigo-500 rounded-md focus:ring-2 focus-visible:ring-2 focus:ring-indigo-100 focus:!outline-none focus-visible:ring-indigo-100 dark:border-zinc-700'
                            )}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <Button
                    name="kaizen-button"
                    className="bg-indigo-500 font-bold text-xl mt-2 w-full hover:bg-indigo-600 disabled:opacity-90 disabled:cursor-default text-gray-200"
                    disabled={false}
                >
                    {false ? (
                        <span className="flex gap-2 items-center justify-center">
                            <Spinner /> Just a Moment
                        </span>
                    ) : (
                        <span>Proceed With Reset</span>
                    )}
                </Button>
                <FormFooter alternative="signup" />
            </section>
        </CenteredGridLayout>
    );
}
