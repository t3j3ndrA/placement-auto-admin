import React from 'react'

export const Card2 = () => {
  return (
    <div className=' p-4 mx-8 text-white rounded-lg' style={{ backgroundColor: '#1A1C33' }}>
    
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


        <div className='grid justify-items-center'>
            <div className='bg-white text-black w-1/4 rounded-lg grid justify-items-center'>

                <button>View More</button>
            </div>
        </div>
    </div>
  )
}
