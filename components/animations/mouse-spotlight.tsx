
"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

type MouseSpotlightProps = {
    children: ReactNode;
    className?: string;
};

export default function MouseSpotlight({
    children,
    className = "",
}: MouseSpotlightProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const spotlightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const spotlight = spotlightRef.current;

        if (!container || !spotlight) return;

        const moveX = gsap.quickTo(spotlight, "x", {
            duration: 0.35,
            ease: "power3.out",
        });

        const moveY = gsap.quickTo(spotlight, "y", {
            duration: 0.35,
            ease: "power3.out",
        });

        const handlePointerMove = (event: PointerEvent) => {
            const rect = container.getBoundingClientRect();

            moveX(event.clientX - rect.left);
            moveY(event.clientY - rect.top);

            gsap.to(spotlight, {
                duration: 0.2,
                ease: "power2.out",
                overwrite: true,
            });
        };

        const handlePointerLeave = () => {
            gsap.to(spotlight, {
                opacity: 0,
                duration: 0.3,
            });
        };

        container.addEventListener("pointermove", handlePointerMove);
        container.addEventListener("pointerleave", handlePointerLeave);

        return () => {
            container.removeEventListener("pointermove", handlePointerMove);
            container.removeEventListener("pointerleave", handlePointerLeave);
            gsap.killTweensOf(spotlight);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={`relative isolate overflow-hidden ${className}`}
        >
            <div
                ref={spotlightRef}
                className="pointer-events-none absolute left-0 top-0 z-10 h-[150px] w-[190px] -translate-x-1/2 -translate-y-1/2 opacity-0"
                style={{
                    background:
                        "linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,177,193,0.16))",
                    filter: "blur(30px)",
                }}
            />
            <div className="relative z-20">{children}</div>
        </div>
    );
}
