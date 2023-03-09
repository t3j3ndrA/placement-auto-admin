import React from 'react'

export const Card1 = () => {
  return (
    <div className=' p-4 mx-72 text-white rounded-lg' style={{ backgroundColor: '#1A1C33' }}>
    
        <div>
            <h3><b>Amazon</b></h3>
        </div>

        <br />

        <div className='flex flex-row justify-between'>
            <div>
                <label><b>www.jobs.amazon.com</b></label>
            </div>

            <div>
            <label>Mail to: </label><label><u><b>sde20@amazon.com</b></u></label>
            </div>
        </div>

        <br />

        <div className='flex flex-row justify-between '>
            <div className='p-2 rounded-lg' style={{ backgroundColor: '#292B45' }}>
                <div>
                    <label className='text-[#989898]'>Role</label>
                </div>
                <div>
                    <label>Software Developer</label>
                </div>
            </div>

            <div className='p-2 rounded-lg' style={{ backgroundColor: '#292B45' }}>
                <div>
                    <label className=' text-[#989898]'>Last Date to Apply</label>
                </div>
                <div className='flex space-x-1 -space-x-1'>
                    <div>
                        <label>6:30 PM</label>
                    </div>
                    <div>
                        <label>12-08-2023</label>
                    </div>
                </div>
            </div>

            <div className='p-2 rounded-lg' style={{ backgroundColor: '#292B45' }}>
                <div>
                    <label className=' text-[#989898]'>Stipend</label>
                </div>
                <div>
                    <label>INR 25 lpa</label>
                </div>
            </div>
        </div>

        <br />

        <div>
            <label>Amazon.com, Inc. is an American multinational company focusing on e-commerce, cloud computing, online advertising, digital streaming, and artificial intelligence.</label>
        </div>

        <br />

        <div className='grid justify-items-center'>
            <div className='bg-white text-black w-1/4 rounded-lg grid justify-items-center'>

                <button>View More</button>
            </div>
        </div>
    </div>
  )
}
