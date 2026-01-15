import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface ScrollRevealProps {
    children: React.ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right';
    delay?: number;
    duration?: number;
    className?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.6,
    className = '',
}) => {
    const { ref, isVisible } = useScrollReveal({
        threshold: 0.1,
        triggerOnce: true,
    });

    return (
        <div
            ref={ref}
            className={`scroll-reveal scroll-reveal-${direction} ${isVisible ? 'is-visible' : ''
                } ${className}`}
            style={{
                transitionDelay: `${delay}s`,
                transitionDuration: `${duration}s`,
            }}
        >
            {children}
        </div>
    );
};
