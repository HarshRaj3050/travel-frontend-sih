import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import blockchain from "../../../public/assets/blockchain.jpg"
import locationImg from "../../../public/assets/map.png"
import sosImg from "../../../public/assets/sos.png"
import geoImg from "../../../public/assets/geo-location.png"


gsap.registerPlugin(ScrollTrigger);

const featureData = [
  {
    id: 1,
    title: "Blockchain Digital ID",
    description: "Immutable tourist identity linked with itinerary and emergency contacts for trustworthy authentication.",
    img : blockchain,
  },
  {
    id: 2,
    title: "Real-Time Location Tracking",
    description: "Live monitoring of tourist whereabouts to ensure safety and provide assistance when needed.",
    img : locationImg,
  },
  {
    id: 3,
    title: "SOS Alerts & Panic Button",
    description: "Instantaneous alerts sent to authorities and emergency contacts with a single tap.",
    img : sosImg,
  },
  {
    id: 4,
    title: "Geo-Fenced Safe Zones",
    description: "Automated alerts when a tourist enters or exits predefined safe geographical areas.",
    img : geoImg,
  },
];

const KeyFeatures = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (!cards || cards.length === 0) return;

    const ctx = gsap.context(() => {
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div ref={containerRef} className="feature-section w-screen pb-60 bg-white flex flex-col items-center justify-center text-black">
        <div className="md:w-[40%] w-[80%] flex flex-col items-center mt-15 ">
          <h1 className="text-3xl md:text-4xl mb-5 text-center uppercase">How Rahgir Works</h1>
          <p className="text-center">Advanced technology stack ensuring comprehensive safety monitoring and rapid incident response</p>
        </div>

        <div className="feature-tabs mt-10 gap-20 self-center lg:mx-30 grid grid-cols-1 lg:grid-cols-2 grid-rows-2">
          {featureData.map((feature, i) => (
            <div
              key={feature.id}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="tabs shadow-xl w-98 h-56 bg-white rounded-4xl p-8 opacity-0"
            >
              <div className="w-12 h-12 bg-amber-300 rounded-2xl object-cover overflow-hidden">
                <img className="h-full" src={feature.img} alt="" />
              </div>
              <h3 className="py-3 text-xl">{feature.title}</h3>
              <p className="">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

    </>
  );
};

export default KeyFeatures;


