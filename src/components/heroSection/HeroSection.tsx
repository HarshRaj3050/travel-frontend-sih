import heroSectionVideo from "../../../public/assets/heroSection_Video.mp4"

const HeroSection = () => {
  return (
    <>
      <div className="video-container relative w-screen h-screen flex justify-center items-center px-10 md:px-24 bg-gray-900 overflow-hidden">
        {/* Content */}
        <div className="hero-title w-full lg:w-[50%] z-10 text-white flex flex-col">
          <h1 className="text-[2rem] xl:text-[4rem] lg:text-[3rem] leading-none mt-10">Smart Tourist Safety Monitoring & Incident Response</h1>
          <p className="mt-5 text-xs md:text-lg">Blockchain-backed Digital Tourist ID, AI safety scoring, geo-fencing alerts and instant panic response — made for safer travel across India.</p>
          <div className="pt-10 flex gap-10 sm:flex-row flex-col text-black">
            <a href="#" className="bg-white px-8 py-3 rounded-2xl">Try HexaSafe - Demo</a>
            <a href="#" className="bg-white px-8 py-3 rounded-2xl">View Features</a>
          </div>
        </div>
        {/* The other half of the flex container can be empty */}
        <div className="hero-img lg:w-[50%]"></div>

        {/* Background Video */}
        <div className="absolute z-0 top-0 left-0 h-full w-full">
          <video autoPlay muted loop src={heroSectionVideo} className="h-full w-full object-cover"></video>
        </div>
      </div>
    </>
  )
}

export default HeroSection;