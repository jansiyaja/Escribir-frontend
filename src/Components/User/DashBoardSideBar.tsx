import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { Link } from "react-router-dom";

export interface Feature {
  label: string;
  path: string;
}

interface DashBoardSideBarProps {
  features: Feature[];
}

const DashBoardSideBar: React.FC<DashBoardSideBarProps> = ({ features }) => {
  const { darkMode } = useSelector((state: RootState) => state.theme);

  return (
    <aside>
      <div className="space-y-4 mt-8">
        {features.map((feature, index) => (
          <Link to={feature.path} key={index}>
            <button
              className={`w-full flex items-center justify-center py-3 px-6 text-lg font-semibold rounded-lg hover:bg-opacity-90 transition-colors duration-200 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-100'} focus:outline-none shadow-lg ${darkMode ? 'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800' : 'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white'}`}
            >
              {feature.label}
            </button>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default DashBoardSideBar;
