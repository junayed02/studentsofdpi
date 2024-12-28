
import Hero from '@/components/hero/Hero'
import Navbar from '@/components/navbar/Navbar'


const page = () => {
  return (
    <div className='min-h-screen w-full bg-gray-200' >
      <Navbar />
      <Hero/>
    </div>
  )
}

export default page