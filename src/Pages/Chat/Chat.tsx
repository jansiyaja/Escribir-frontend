import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";


const Chat = () => {
  const {darkMode}  =  useSelector(( state:RootState)=>state.theme);
  return (
    <div className={`min-h-screen flex items-center justify-around ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-r from-blue-100 to-purple-100'}`}>
      
    </div>
  )
}

export default Chat
