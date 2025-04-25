import React from 'react'

const TableSkeleton = () => {
  return (
    <>
     <div className="w-full animate-pulse my-10">
            <div className="w-full border border-gray-300 rounded overflow-x-auto">
                <div className="min-w-[600px]">
                    <div className="grid grid-cols-6 gap-4 bg-gray-100 border-b border-gray-300 p-4 rounded-t-lg">
                        <div className="h-6 bg-gray-300 rounded"></div>
                        <div className="h-6 bg-gray-300 rounded"></div>
                        <div className="h-6 bg-gray-300 rounded"></div>
                        <div className="h-6 bg-gray-300 rounded"></div>
                        <div className="h-6 bg-gray-300 rounded"></div>
                        <div className="h-6 bg-gray-300 rounded"></div>
                    </div>
                    <div className="divide-y divide-gray-300">
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className="grid grid-cols-6 gap-4 p-4">
                                <div className="h-6 bg-gray-300 rounded"></div>
                                <div className="h-6 bg-gray-300 rounded"></div>
                                <div className="h-6 bg-gray-300 rounded"></div>
                                <div className="h-6 bg-gray-300 rounded"></div>
                                <div className="h-6 bg-gray-300 rounded"></div>
                                <div className="h-6 bg-gray-300 rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    
    </>
  )
}

export default TableSkeleton