import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';

const About: React.FC = () => {
  const { darkMode } = useSelector((state: RootState) => state.theme);

  return (
    <div className={darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}>
      <section className={`w-full py-16 px-6 text-center ${darkMode ? "bg-gray-800" : "bg-blue-800"} text-white`}>
        <h1 className="text-5xl font-bold font-bodoni mb-4">About Escribir</h1>
        <p className="text-lg max-w-2xl mx-auto mb-6 font-bodoni">
          Welcome to Escribir, a personal, professional blog where thoughts and ideas take shape. From insightful articles to creative musings, Escribir is dedicated to sharing knowledge, inspiration, and resources.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Mission", "Vision", "Purpose"].map((title, index) => (
            <div key={index} className={`p-6 rounded-lg shadow-lg transition-shadow ${darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-700"} hover:shadow-2xl`}>
              <h3 className="text-2xl font-semibold mb-4">{title}</h3>
              <p className="text-gray-600">
                {title === "Mission" && "As the developer behind Escribir, my mission is to create a platform that empowers individuals to share their stories, insights, and creative expressions."}
                {title === "Vision" && "I see Escribir as a place where people can share their ideas and find inspiration. I want to bring together readers and writers in a friendly community."}
                {title === "Purpose" && "As a developer, I believe in integrity, creativity, and always learning. These values help me create interesting content and build a genuine connection with my audience."}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className={`text-3xl font-bold mb-6 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>Who I Am</h2>
        <img 
          src="path-to-your-image.jpg" 
          alt="Jansiya Jahan" 
          className="w-32 h-32 rounded-full mx-auto mb-4" 
        />
        <p className={`leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Hi, I'm Jansiya Jahan, the developer behind Escribir. My passion for blogging and sharing ideas comes from a love for creativity, learning, and the art of storytelling. Escribir is my space to connect, inspire, and grow through my writing.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h2 className={`text-4xl font-bold mb-6 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>Write Your Own Blog</h2>
        <p className={`leading-relaxed max-w-2xl mx-auto mb-8 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Have something to share? Start writing your own blog on Escribir! We encourage diverse voices and unique perspectives.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card Components */}
          {["Start Writing", "Engage with the Community"].map((title, index) => (
            <div key={index} className={`p-6 rounded-lg shadow-lg transition-shadow ${darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-700"} hover:shadow-2xl`}>
              <img 
                src={index === 0 
                  ? "https://escribir.s3.eu-north-1.amazonaws.com/WhatsApp+Image+2024-11-01+at+8.36.47+PM.jpeg" 
                  : "https://escribir.s3.eu-north-1.amazonaws.com/WhatsApp+Image+2024-11-01+at+8.35.56+PM.jpeg"} 
                alt={title} 
                className="w-full h-40 object-cover rounded-md mb-4" 
              />
              <h3 className="text-2xl font-semibold mb-2">{title}</h3>
              <p className="mb-4">
                {title === "Start Writing" ? "Begin your journey with a simple and intuitive blog editor." : "Join discussions and connect with other readers and authors."}
              </p>
              {index === 0 && (
                <a href="/blog" className="text-blue-600 font-semibold hover:underline">
                  Go to Blog Writing Page &rarr;
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className={ `py-16 px-4  ${darkMode ? 'bg-gray-900': ' bg-gray-50'} `} >
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl font-bold text-center mb-12 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>What You’ll Find on Escribir</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           
            {["Blog Writing", "Community Engagement", "Interactive Features"].map((title, index) => (
              <div key={index} className={`p-6 rounded-lg shadow-md transition-shadow ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-700"} hover:shadow-lg`}>
                <img 
                  src={`https://escribir.s3.eu-north-1.amazonaws.com/image${index + 1}.jpeg`} 
                  alt={title} 
                  className="w-full h-40 object-cover rounded-md mb-4" 
                />
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="mt-2">
                  {title === "Blog Writing" ? "Engaging articles on various topics." 
                    : title === "Community Engagement" ? "Connect through discussions, chat features, and projects." 
                    : "Real-time interactions and community connections."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
