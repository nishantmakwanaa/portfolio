import 'react';

declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            'ion-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                name?: string;
                src?: string;
                size?: string;
                color?: string;
                'aria-hidden'?: boolean | 'true' | 'false';
                class?: string;
            };
        }
    }
}
