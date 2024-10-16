
import ReportList from './SubComponents/ReportList'

const Report = () => {
  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-teal-950 via-blue-300 to-blue-100 flex flex-col items-center">
    <h1 className="text-4xl font-bold  font-bodoni mb-8 text-white shadow-md rounded-lg p-4 bg-opacity-40 border-">Tag List</h1>
    
      <ReportList />
 
  </div>
  )
}

export default Report
