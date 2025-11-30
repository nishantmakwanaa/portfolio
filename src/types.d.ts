declare global {
    namespace JSX {
        interface IntrinsicElements {
            'ion-icon': {
                name?: string;
                src?: string;
                class?: string;
                className?: string;
                size?: string;
                color?: string;
                'aria-hidden'?: boolean | 'true' | 'false';
                style?: React.CSSProperties;
            };
        }
    }
}

export { };
