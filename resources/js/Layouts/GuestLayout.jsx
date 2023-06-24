import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen overflow-hidden">
            <div className="flex items-center justify-center h-screen px-5">
                {children}
            </div>
        </div>
    );
}
