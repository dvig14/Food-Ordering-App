const SrchShimmer = () => {
    return(
        <div className='bg-[#F5F6F8] mt-[2rem] p-[2rem] flex flex-col gap-[2rem]'>
           <div className='bg-white w-[100%] p-[1rem] pb-[2rem] flex gap-3'>
             <button className='rounded-3xl bg-gray-200 py-[1.2rem] px-[2.5rem] animate-[flash_2s_infinite]'></button>
             <button className='rounded-3xl border border-gray-300 py-[1.2rem] px-[2.5rem] animate-[flash_2s_infinite]'></button>
           </div>
           {
             Array(10).fill('').map((e,index)=>(
                <div key={index} className='bg-white w-[100%] p-[1rem] pb-[2rem] flex flex-col gap-3'>
                   <span className='bg-gray-200 py-[0.6rem] px-[1rem] w-[5%] animate-[flash_2s_infinite]'></span>
                   <span className='bg-gray-200 py-[0.6rem] px-[1rem] w-[70%] animate-[flash_2s_infinite]'></span>
                   <span className='bg-gray-200 py-[0.6rem] px-[1rem] w-[60%] animate-[flash_2s_infinite]'></span>
                   <span className='bg-gray-200 py-[0.6rem] px-[1rem] w-[15%] animate-[flash_2s_infinite]'></span>

                </div>
             ))
           }
        </div>
    )
}
export default SrchShimmer