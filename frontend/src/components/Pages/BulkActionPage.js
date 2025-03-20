import React from 'react'
import Sidebarr from '../Sidebarr'
import BulkAction from '../BulkAction/BulkAction'

function BulkAactionPage() {
  return (
    <div className='flex h-screen'>
      {/* Sidebar with fixed width */}
      <div className="w-64 bg-gray-100">
        <Sidebarr/>
      </div>

      {/* Main content area takes remaining space */}
      <div className="flex-grow bg-white p-6 overflow-y-auto">
        <BulkAction/>
      </div>
    </div>
  )
}

export default BulkAactionPage
