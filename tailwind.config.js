const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
    ],
    // #A28ABF, #C2A6E5, #8E6BBF
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                main: '#865fbd',
                second: '#8E6BBF6f'
            }
        },
    },

    plugins: [require('@tailwindcss/forms'), require('flowbite/plugin')],
};
