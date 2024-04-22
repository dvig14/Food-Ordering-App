import { IoCheckmarkCircleOutline } from "react-icons/io5";

const SuccessPg = ({orderId}) => {
    return(
        <div className='h-[80vh] flex justify-center items-center flex-col text-xl gap-1 font-medium'>
            <IoCheckmarkCircleOutline className='text-green-500 text-3xl'/>
            <span>Payment Success</span>
            <span>ref-{orderId}</span>
        </div>
    )
}
export default SuccessPg