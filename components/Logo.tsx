import React from 'react';
import { cn } from '@/lib/utils';

export interface LogoProps {
    className?: string;
    variant?: 'horizontal' | 'stacked' | 'icon';
    theme?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({
    className,
    variant = 'horizontal',
    theme = 'light'
}) => {
    // Colors
    const colors = {
        blue: '#0B5FA5',
        red: '#E53935',
        yellow: '#FFC107',
        charcoal: '#222222',
        white: '#FFFFFF',
    };

    const textColor = theme === 'dark' ? colors.white : colors.blue;
    const sloganColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : colors.blue;

    // SVG Geometry
    const Icon = () => (
        <svg viewBox="0 0 100 60" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Halo - Yellow */}
            <circle cx="50" cy="45" r="32" stroke={colors.yellow} strokeWidth="3" opacity="0.9" />

            {/* Sun - Red Semicircle */}
            <path d="M18 45 A 32 32 0 0 1 82 45" fill={colors.red} />

            {/* Car Silhouette - Blue */}
            {/* Simplified car profile: nose, windshield, roof, rear */}
            <path
                d="M20 42 L22 35 L35 25 L65 25 L80 35 L90 40"
                stroke={colors.blue}
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />

            {/* Road - Blue */}
            <path
                d="M10 55 Q 50 45 90 55"
                stroke={colors.blue}
                strokeWidth="6"
                strokeLinecap="round"
            />
        </svg>
    );

    if (variant === 'icon') {
        return (
            <div className={cn("relative w-12 h-8", className)}>
                <Icon />
            </div>
        );
    }

    if (variant === 'stacked') {
        return (
            <div className={cn("flex flex-col items-center gap-1", className)}>
                <div className="w-16 h-10 mb-1">
                    <Icon />
                </div>
                {/* <div className="text-center leading-none">
                    <div className="gradient-text font-bold tracking-tighter text-xl uppercase" style={{ color: textColor, fontFamily: 'var(--font-heading)' }}>
                        TE KAIRIRI
                    </div>
                    <div className="font-bold tracking-widest text-lg uppercase" style={{ color: textColor, fontFamily: 'var(--font-sans)' }}>
                        MOTORS
                    </div>
                    <div className="text-[10px] tracking-widest mt-1 font-medium uppercase opacity-80" style={{ color: sloganColor }}>
                        Keep Moving Forward
                    </div>
                </div> */}

                <div className="text-center leading-none">
                    <div className="font-bold tracking-tighter text-xl uppercase gradient-text" style={{ fontFamily: 'var(--font-heading)' }}>
                        TE KAIRIRI
                    </div>
                    <div className="font-bold tracking-widest text-lg uppercase gradient-text" style={{ fontFamily: 'var(--font-sans)' }}>
                        MOTORS
                    </div>
                    <div className="text-[10px] tracking-widest mt-1 font-medium uppercase opacity-80 gradient-text" style={{ fontFamily: 'var(--font-sans)' }}>
                        Keep Moving Forward
                    </div>
                </div>

            </div>
        );
    }

    // Horizontal (Default)
    return (
        <div className={cn("flex items-center gap-3", className)}>
            <div className="w-14 h-9 shrink-0">
                <Icon />
            </div>
            <div className="flex flex-col justify-center leading-none">
                <div className="flex flex-col">
                    <span className="font-black tracking-tight text-xl uppercase leading-none gradient-text" style={{ fontFamily: 'var(--font-heading)' }}>
                        TE KAIRIRI <span className="font-bold">MOTORS</span>
                    </span>
                </div>
                <span className="text-[10px] tracking-[0.2em] font-medium uppercase mt-1 ml-0.5 gradi                       ent-text" style={{ fontFamily: 'var(--font-sans)' }}>
                    Keep Moving Forward
                </span>
            </div>
        </div>
    );
};
