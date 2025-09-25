import { useEffect, useRef, useCallback, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Types for the menu items
interface MenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}

interface SocialItem {
  label: string;
  link: string;
}

const NavBar = () => {
    const navRef = useRef<HTMLDivElement | null>(null);
    const lastScroll = useRef<number>(0);
    const tlRef = useRef<gsap.core.Tween | null>(null);

    // Staggered menu state and refs
    const [menuOpen, setMenuOpen] = useState(false);
    const menuOpenRef = useRef(false);
    const busyRef = useRef(false);
    
    const panelRef = useRef<HTMLDivElement | null>(null);
    const preLayersRef = useRef<HTMLDivElement | null>(null);
    const preLayerElsRef = useRef<HTMLElement[]>([]);
    
    const plusHRef = useRef<HTMLSpanElement | null>(null);
    const plusVRef = useRef<HTMLSpanElement | null>(null);
    const iconRef = useRef<HTMLSpanElement | null>(null);
    
    const textInnerRef = useRef<HTMLSpanElement | null>(null);
    const [textLines, setTextLines] = useState<string[]>(['Menu', 'Close']);
    
    const openTlRef = useRef<gsap.core.Timeline | null>(null);
    const closeTweenRef = useRef<gsap.core.Tween | null>(null);
    const spinTweenRef = useRef<gsap.core.Timeline | null>(null);
    const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);
    
    const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
    const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);

    // Menu data
    const menuItems: MenuItem[] = [
        { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
        { label: 'Culture', ariaLabel: 'Learn about culture', link: '/culture' },
        { label: 'Nature', ariaLabel: 'Explore nature', link: '/nature' },
        { label: 'Safety', ariaLabel: 'Safety information', link: '/safety' }
    ];

    const socialItems: SocialItem[] = [
        { label: 'Twitter', link: 'https://twitter.com' },
        { label: 'Instagram', link: 'https://instagram.com' },
        { label: 'Facebook', link: 'https://facebook.com' }
    ];

    // Scroll hide/show effect (original functionality)
    useEffect(() => {
        const nav = navRef.current;
        if (!nav) return;

        gsap.set(nav, { y: 0, force3D: true });

        const st = ScrollTrigger.create({
            onUpdate: (self) => {
                const scroller = self.scroller as unknown as { scrollTop?: number } | undefined;
                const current = scroller && typeof scroller.scrollTop === "number" ? scroller.scrollTop : window.scrollY;
                const delta = current - lastScroll.current;
                lastScroll.current = current;

                const shouldHide = delta > 5;

                if (shouldHide) {
                    if (!tlRef.current || (tlRef.current && tlRef.current.vars && tlRef.current.vars.to !== -100)) {
                        tlRef.current?.kill();
                        tlRef.current = gsap.to(nav, { y: -100, duration: 0.45, ease: "power3.out" });
                    }
                } else if (delta < -5) {
                    if (!tlRef.current || (tlRef.current && tlRef.current.vars && tlRef.current.vars.to !== 0)) {
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

    // Staggered menu animation setup
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const panel = panelRef.current;
            const preContainer = preLayersRef.current;

            const plusH = plusHRef.current;
            const plusV = plusVRef.current;
            const icon = iconRef.current;
            const textInner = textInnerRef.current;

            if (!panel || !plusH || !plusV || !icon || !textInner) return;

            let preLayers: HTMLElement[] = [];
            if (preContainer) {
                preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer')) as HTMLElement[];
            }
            preLayerElsRef.current = preLayers;

            const offscreen = 100; // Always from right for nav
            gsap.set([panel, ...preLayers], { xPercent: offscreen });

            gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
            gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
            gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
            gsap.set(textInner, { yPercent: 0 });

            if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: '#000' });
        });
        return () => ctx.revert();
    }, []);

    // Build open timeline for menu
    const buildOpenTimeline = useCallback(() => {
        const panel = panelRef.current;
        const layers = preLayerElsRef.current;
        if (!panel) return null;

        openTlRef.current?.kill();
        if (closeTweenRef.current) {
            closeTweenRef.current.kill();
            closeTweenRef.current = null;
        }
        itemEntranceTweenRef.current?.kill();

        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];

        const layerStates = layers.map(el => ({ el, start: Number(gsap.getProperty(el, 'xPercent')) }));
        const panelStart = Number(gsap.getProperty(panel, 'xPercent'));

        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

        const tl = gsap.timeline({ paused: true });

        layerStates.forEach((ls, i) => {
            tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
        });

        const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
        const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
        const panelDuration = 0.65;

        tl.fromTo(
            panel,
            { xPercent: panelStart },
            { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
            panelInsertTime
        );

        if (itemEls.length) {
            const itemsStartRatio = 0.15;
            const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;

            tl.to(
                itemEls,
                { yPercent: 0, rotate: 0, duration: 1, ease: 'power4.out', stagger: { each: 0.1, from: 'start' } },
                itemsStart
            );
        }

        if (socialLinks.length) {
            const socialsStart = panelInsertTime + panelDuration * 0.4;
            tl.to(
                socialLinks,
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.55,
                    ease: 'power3.out',
                    stagger: { each: 0.08, from: 'start' },
                    onComplete: () => {
                        gsap.set(socialLinks, { clearProps: 'opacity' });
                    }
                },
                socialsStart + 0.04
            );
        }

        openTlRef.current = tl;
        return tl;
    }, []);

    const playOpen = useCallback(() => {
        if (busyRef.current) return;
        busyRef.current = true;
        const tl = buildOpenTimeline();
        if (tl) {
            tl.eventCallback('onComplete', () => {
                busyRef.current = false;
            });
            tl.play(0);
        } else {
            busyRef.current = false;
        }
    }, [buildOpenTimeline]);

    const playClose = useCallback(() => {
        openTlRef.current?.kill();
        openTlRef.current = null;
        itemEntranceTweenRef.current?.kill();

        const panel = panelRef.current;
        const layers = preLayerElsRef.current;
        if (!panel) return;

        const all: HTMLElement[] = [...layers, panel];
        closeTweenRef.current?.kill();

        const offscreen = 100;

        closeTweenRef.current = gsap.to(all, {
            xPercent: offscreen,
            duration: 0.32,
            ease: 'power3.in',
            overwrite: 'auto',
            onComplete: () => {
                const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
                if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });

                const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];
                if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

                busyRef.current = false;
            }
        });
    }, []);

    const animateIcon = useCallback((opening: boolean) => {
        const icon = iconRef.current;
        const h = plusHRef.current;
        const v = plusVRef.current;
        if (!icon || !h || !v) return;

        spinTweenRef.current?.kill();

        if (opening) {
            gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
            spinTweenRef.current = gsap
                .timeline({ defaults: { ease: 'power4.out' } })
                .to(h, { rotate: 45, duration: 0.5 }, 0)
                .to(v, { rotate: -45, duration: 0.5 }, 0);
        } else {
            spinTweenRef.current = gsap
                .timeline({ defaults: { ease: 'power3.inOut' } })
                .to(h, { rotate: 0, duration: 0.35 }, 0)
                .to(v, { rotate: 90, duration: 0.35 }, 0)
                .to(icon, { rotate: 0, duration: 0.001 }, 0);
        }
    }, []);

    const animateText = useCallback((opening: boolean) => {
        const inner = textInnerRef.current;
        if (!inner) return;

        textCycleAnimRef.current?.kill();

        const currentLabel = opening ? 'Menu' : 'Close';
        const targetLabel = opening ? 'Close' : 'Menu';
        const cycles = 3;

        const seq: string[] = [currentLabel];
        let last = currentLabel;
        for (let i = 0; i < cycles; i++) {
            last = last === 'Menu' ? 'Close' : 'Menu';
            seq.push(last);
        }
        if (last !== targetLabel) seq.push(targetLabel);
        seq.push(targetLabel);

        setTextLines(seq);
        gsap.set(inner, { yPercent: 0 });

        const lineCount = seq.length;
        const finalShift = ((lineCount - 1) / lineCount) * 100;

        textCycleAnimRef.current = gsap.to(inner, {
            yPercent: -finalShift,
            duration: 0.5 + lineCount * 0.07,
            ease: 'power4.out'
        });
    }, []);

    const toggleMenu = useCallback(() => {
        const target = !menuOpenRef.current;
        menuOpenRef.current = target;
        setMenuOpen(target);

        if (target) {
            playOpen();
        } else {
            playClose();
        }

        animateIcon(target);
        animateText(target);
    }, [playOpen, playClose, animateIcon, animateText]);

    return (
        <>
            {/* Original NavBar */}
            <div ref={navRef} className="w-screen h-[70px] flex justify-center mt-10 fixed z-30 top-0 left-0">
                <div className="w-11/12 h-full bg-white/20 backdrop-blur-sm border-white/30 rounded-full border shadow-lg flex justify-between items-center px-10">
                    <div>
                        <a href="#">
                            <img src="" alt="" />
                            <h2 className="decoration-none text-black">Safe Travel</h2>
                        </a>
                    </div>
                    
                    {/* Desktop Menu (hidden on mobile) */}
                    <div className="lg:block hidden">
                        <ul className="flex gap-20 text-black">
                            {menuItems.map((item, index) => (
                                <a key={index} href={item.link}>
                                    <li>{item.label}</li>
                                </a>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <button className="bg-black rounded-2xl p-3 cursor-pointer text-white">
                            <i className="fa-solid fa-download"></i> Download App
                        </button>
                        
                        {/* Mobile Menu Button */}
                        <button
                            ref={toggleBtnRef}
                            className="sm-toggle lg:hidden relative inline-flex items-center gap-2 bg-transparent border-0 cursor-pointer text-black font-medium leading-none overflow-visible"
                            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={menuOpen}
                            onClick={toggleMenu}
                            type="button"
                        >
                            <span className="sm-toggle-textWrap relative inline-block h-4 overflow-hidden whitespace-nowrap w-16">
                                <span ref={textInnerRef} className="sm-toggle-textInner flex flex-col leading-none">
                                    {textLines.map((l, i) => (
                                        <span className="sm-toggle-line block h-4 leading-none text-sm" key={i}>
                                            {l}
                                        </span>
                                    ))}
                                </span>
                            </span>

                            <span
                                ref={iconRef}
                                className="sm-icon relative w-3.5 h-3.5 shrink-0 inline-flex items-center justify-center"
                            >
                                <span
                                    ref={plusHRef}
                                    className="sm-icon-line absolute left-1/2 top-1/2 w-full h-0.5 bg-current rounded -translate-x-1/2 -translate-y-1/2"
                                />
                                <span
                                    ref={plusVRef}
                                    className="sm-icon-line sm-icon-line-v absolute left-1/2 top-1/2 w-full h-0.5 bg-current rounded -translate-x-1/2 -translate-y-1/2"
                                />
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Staggered Menu Overlay */}
            <div className="sm-scope fixed inset-0 z-40 pointer-events-none">
                <div 
                    className="staggered-menu-wrapper relative w-full h-full"
                    data-open={menuOpen || undefined}
                >
                    {/* Background Layers */}
                    <div
                        ref={preLayersRef}
                        className="sm-prelayers absolute top-0 right-0 bottom-0 pointer-events-none z-5"
                        aria-hidden="true"
                    >
                        {['#B19EEF', '#5227FF'].map((c, i) => (
                            <div
                                key={i}
                                className="sm-prelayer absolute top-0 right-0 h-full w-full translate-x-0"
                                style={{ background: c }}
                            />
                        ))}
                    </div>

                    {/* Menu Panel */}
                    <aside
                        ref={panelRef}
                        className="staggered-menu-panel absolute top-0 right-0 h-full bg-white flex flex-col p-24 pt-32 overflow-y-auto z-10 backdrop-blur-lg"
                        aria-hidden={!menuOpen}
                        style={{ width: 'clamp(260px, 38vw, 420px)' }}
                    >
                        <div className="sm-panel-inner flex-1 flex flex-col gap-5">
                            {/* Menu Items */}
                            <ul className="sm-panel-list list-none m-0 p-0 flex flex-col gap-2" role="list">
                                {menuItems.map((it, idx) => (
                                    <li className="sm-panel-itemWrap relative overflow-hidden leading-none" key={it.label + idx}>
                                        <a
                                            className="sm-panel-item relative text-black font-semibold text-4xl cursor-pointer leading-none tracking-tight uppercase transition-colors duration-150 ease-linear inline-block no-underline pr-14"
                                            href={it.link}
                                            aria-label={it.ariaLabel}
                                            onClick={() => toggleMenu()}
                                        >
                                            <span className="sm-panel-itemLabel inline-block transform-origin-50-100 will-change-transform">
                                                {it.label}
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            {/* Social Links */}
                            <div className="sm-socials mt-auto pt-8 flex flex-col gap-3" aria-label="Social links">
                                <h3 className="sm-socials-title m-0 text-base font-medium text-purple-600">Follow Us</h3>
                                <ul className="sm-socials-list list-none m-0 p-0 flex flex-row items-center gap-4 flex-wrap" role="list">
                                    {socialItems.map((s, i) => (
                                        <li key={s.label + i} className="sm-socials-item">
                                            <a
                                                href={s.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="sm-socials-link text-lg font-medium text-gray-900 no-underline relative inline-block py-0.5 transition-colors duration-300 ease-linear hover:text-purple-600"
                                            >
                                                {s.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Custom Styles */}
            <style>{`
                .sm-scope .staggered-menu-wrapper { pointer-events: none; }
                .sm-scope .staggered-menu-wrapper[data-open] { pointer-events: auto; }
                
                .sm-scope .staggered-menu-panel { 
                    transform: translateX(100%); 
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                }
                
                .sm-scope .sm-prelayers { 
                    width: clamp(260px, 38vw, 420px); 
                    transform: translateX(100%);
                }
                
                .sm-scope .sm-panel-item:hover { color: #5227FF; }
                
                .sm-toggle-textWrap { min-width: 4rem; }
                
                @media (max-width: 1024px) {
                    .sm-scope .staggered-menu-panel { width: 100%; }
                    .sm-scope .sm-prelayers { width: 100%; }
                }
            `}</style>
        </>
    );
};

export default NavBar;