export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `btn flex items-center justify-center gap-2 border-2 border-main text-white bg-main py-2 rounded-md cursor-pointer ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
