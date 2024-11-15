import { useSelector } from 'react-redux';
import { RootState } from "../../redux/store/store";
import BlogCard from './SubComponents/BlogCard';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    const { darkMode } = useSelector((state: RootState) => state.theme);
 
    return (
        <div className={`min-h-screen flex flex-col items-center ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-900'} transition-colors duration-500`}>
   
            <header className="w-full bg-cover bg-center h-64 relative " style={{ backgroundImage: "url('https://escribir.s3.eu-north-1.amazonaws.com/man-is-using-laptop-books-notebook-top-view.jpg')" }}>
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="relative flex flex-col items-center justify-center h-full text-center">
                    <h1 className="text-5xl font-bold mb-2">Explore Our Blog</h1>
                    <p className="text-lg max-w-2xl mb-4">Delve into a world of insights, tutorials, and creative articles tailored for you.</p>
                    <Link to="/blog" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition duration-300">
                     Start Writing
                    </Link>
                </div>
            </header>

          
            <main className="w-full p-6 sm:p-8">

                <section className="my-8">
                    <h2 className="text-3xl font-semibold mb-4">Latest Articles</h2>
                    <BlogCard />
                </section>

      </main>
           
        </div>
    );
};

export default HomePage;
