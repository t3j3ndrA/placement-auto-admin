import React from 'react'

export const Pre_loading_page = () => {
    return (
        <div className="flex justify-center items-center h-screen dark:bg-gray-800">
            <div className="grid gap-2">
                <div className="flex items-center justify-center ">
                    <div className="w-24 h-24 border-l-2 border-white rounded-full animate-spin"></div>
                </div>
            </div>
        </div>
    )
}
