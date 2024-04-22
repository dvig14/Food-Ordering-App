import burgerImg from "../images/burgerImg.webp"

const Shimmer = () => {

    return(
      <>
      <div className='mt-[5rem] bg-[#0d152d] h-[330px] text-gray-400 flex flex-col gap-[2rem] justify-center items-center 
      px-[1rem]'>
        <div className='relative flex justify-center items-center'>
          <div className=" absolute animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-[#ffffff49]"></div>
          <img src={burgerImg} className="rounded-full h-16 w-16" alt=''/>
        </div>  
         <h2 className='text-3xl smallM:text-2xl'>Looking for great food near you...</h2>
      </div>
      <div className="shimmer-container w-[100%] h-fit flex flex-wrap justify-evenly gap-y-[2rem] p-4">
        {
        Array(20).fill('').map((e,index)=>(
          
          <div key={index} className="shimmer-card w-[270px] h-[40vh] flex flex-col gap-[0.3rem] animate-[flash_2s_infinite]">
            <div className="bg-gray-200 h-[37vh] mb-[0.3rem] rounded"></div>
            <div className="bg-gray-200 h-[1.5vh] rounded"></div>
            <div className="bg-gray-200 h-[1.5vh] rounded"></div>
          </div>
        ))
        }
      </div>
      </>
      )
   
}
export default Shimmer