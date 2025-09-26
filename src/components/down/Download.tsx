
import backgroundImg from "../../../public/assets/downloadImg.png"

const Download = () => {
  return (
    <>
    <div className='w-screen h-[90vh] bg-blue-300 relative mb-0'>
      <img 
        src={backgroundImg} 
        alt="Background" 
        className='absolute inset-0 w-full h-full object-cover z-0' 
      />
      <div className='z-10 flex items-center justify-center h-full '>
        <h1 className='text-white bottom-30 left-50 w-[50%] absolute text-5xl font-bold  drop-shadow-lg'>Travel smart, and be a safe traveller.</h1>
      </div>
    </div>
    
    </>
  )
}

export default Download