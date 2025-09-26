
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type NavBarProps = {
    onLoginClick?: () => void;
}

const NavBar = ({ onLoginClick }: NavBarProps) => {
    const navRef = useRef<HTMLDivElement | null>(null);
    const lastScroll = useRef<number>(0);
    const tlRef = useRef<gsap.core.Tween | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const menuTimelineRef = useRef<gsap.core.Timeline | null>(null);

    // Handle menu animations
    useEffect(() => {
        if (!menuRef.current) return;

        // Cleanup previous timeline
        menuTimelineRef.current?.kill();

        // Lock/unlock body scroll
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';

        const menu = menuRef.current;
        const timeline = gsap.timeline({
            defaults: { duration: 0.6, ease: "power3.out" }
        });

        if (isMenuOpen) {
            // Show animation from right to left
            gsap.set(menu, { display: 'flex' });
            gsap.set('.menu-backdrop', { xPercent: 100 });  // Start from right
            timeline
                .fromTo(menu, 
                    { opacity: 0 },
                    { opacity: 1, duration: 0.2 }
                )
                .fromTo('.menu-backdrop',
                    { xPercent: 100, opacity: 1 },
                    { xPercent: 0, duration: 0.6, ease: "power2.inOut" },
                    "-=0.1"
                )
                .fromTo('.menu-item',
                    { x: 40, opacity: 0 },
                    { x: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "power2.out" },
                    "-=0.3"
                );
        } else {
                // Hide animation left-to-right (back to button)
                const navButton = document.querySelector('.navbar-menu-btn');
                if (navButton) {
                    timeline
                        .to('.menu-item',
                            { x: 40, opacity: 0, stagger: 0.05, duration: 0.3, ease: "power2.in" }
                        )
                        .to('.menu-backdrop',
                            { xPercent: 100, duration: 0.5, ease: "power2.inOut" },
                            "-=0.2"
                        )
                        .to(menu,
                            { opacity: 0, duration: 0.15 },
                            "-=0.1"
                        )
                        .set(menu, { display: 'none' });
                }
        }

        menuTimelineRef.current = timeline;

        return () => {
            timeline.kill();
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    useEffect(() => {
        const nav = navRef.current;
        if (!nav) return;

        // Ensure starting position
        gsap.set(nav, { y: 0, force3D: true });

        // Use ScrollTrigger's onUpdate to detect scroll direction efficiently
        const st = ScrollTrigger.create({
            onUpdate: (self) => {
            const scroller = self.scroller as unknown as { scrollTop?: number } | undefined;
            const current = scroller && typeof scroller.scrollTop === "number" ? scroller.scrollTop : window.scrollY;
                const delta = current - lastScroll.current;
                lastScroll.current = current;

                // If scrolling down (delta > 0) hide nav, else show
                const shouldHide = delta > 5; // small threshold to avoid micro jitter

                if (shouldHide) {
                    // hide smoothly
                    if (!tlRef.current || tlRef.current && tlRef.current.vars && tlRef.current.vars.to !== -100) {
                        tlRef.current?.kill();
                        tlRef.current = gsap.to(nav, { y: -100, duration: 0.45, ease: "power3.out" });
                    }
                } else if (delta < -5) {
                    // show smoothly
                    if (!tlRef.current || tlRef.current && tlRef.current.vars && tlRef.current.vars.to !== 0) {
                        tlRef.current?.kill();
                        tlRef.current = gsap.to(nav, { y: 0, duration: 0.45, ease: "power3.out" });
                    }
                }
            },
        });

        return () => {
            st.kill();
            tlRef.current?.kill();
        };
    }, []);

    return (
        <>
            <div ref={navRef} className="w-screen h-[70px] flex justify-center mt-10 fixed z-20 top-0 left-0">
                <div className="w-11/12 h-full bg-white/20 backdrop-blur-sm border-white/30 rounded-full border shadow-lg flex justify-between items-center px-10">
                    <div className="">
                        <a href="#">
                            <img src="" alt="" />
                            <h2 className="decoration-none text-black uppercase">Rahgir</h2>
                        </a>
                    </div>
                    <div className="lg:block hidden">
                        <ul className="flex gap-20 text-black">
                            <a href="#" className="hover:text-gray-600 transition-colors"><li>Home</li></a>
                            <a href="#" className="hover:text-gray-600 transition-colors"><li>Culture</li></a>
                            <a href="#" className="hover:text-gray-600 transition-colors"><li>Nature</li></a>
                            <a href="#" className="hover:text-gray-600 transition-colors"><li>Safety</li></a>
                        </ul>
                    </div>
                        <div className="flex items-center gap-4">
                        <div className="lg:hidden">
                            <button
                                onClick={() => setIsMenuOpen(true)}
                                className="p-2 rounded-lg hover:bg-white/10 transition-colors navbar-menu-btn"
                                aria-label="Open menu"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="hidden lg:flex items-center gap-3">
                            <button onClick={() => onLoginClick?.()} className="text-white bg-black text-base rounded-full px-5 py-2">Login</button>
                            <button className="bg-black rounded-full px-3 py-2 text-base cursor-pointer text-white">
                                <i className="fa-solid fa-download"></i> Download App
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Full-screen mobile menu */}
            <div
                ref={menuRef}
                className="fixed inset-0 z-50 hidden bg-black/20 backdrop-blur-lg overflow-hidden"
                aria-hidden={!isMenuOpen}
            >
                <div className="menu-backdrop absolute inset-0 bg-white/90 flex flex-col items-center justify-center p-6">
                    {/* Close button */}
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="absolute top-6 right-6 p-2 rounded-lg hover:bg-black/5 transition-colors"
                        aria-label="Close menu"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    {/* Menu items */}
                    <nav className="flex flex-col items-center gap-8">
                        <a href="#" className="menu-item text-4xl font-bold hover:text-gray-600 transition-colors">Home</a>
                        <a href="#" className="menu-item text-4xl font-bold hover:text-gray-600 transition-colors">Culture</a>
                        <a href="#" className="menu-item text-4xl font-bold hover:text-gray-600 transition-colors">Nature</a>
                        <a href="#" className="menu-item text-4xl font-bold hover:text-gray-600 transition-colors">Safety</a>
                    </nav>

                    {/* Download button */}
                    <button className="menu-item mt-12 bg-black text-white rounded-2xl p-3 hover:bg-black/80 transition-colors">
                        <i className="fa-solid fa-download"></i> Download App</button>
                </div>
            </div>
        </>
    );
};

export default NavBar;