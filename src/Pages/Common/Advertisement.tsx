import { HiOutlineLightBulb, HiOutlinePlay, HiOutlineGlobeAlt } from "react-icons/hi2";
import banner from '../../assets/Images/banner.jpg'
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/Route";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { useEffect, useState } from "react";


const Advertisement = () => {
  const { darkMode } = useSelector((state: RootState) => state.theme);
  const user = useSelector((state: RootState) => state.auth.user);
  const [isClient,setIsClient]=useState(false)

  if (!user) return
  useEffect(() => {
    if (user.role == 'client') {
      setIsClient(true)
    }
  })
  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gradient-to-b from-gray-100 to-white"}`}>
    
      <header className={`relative bg-cover bg-center text-white ${darkMode ? "bg-black" : ""}`} style={{ backgroundImage: `url(${banner})` }}>
        <div className={`bg-black bg-opacity-50 py-20 md:py-32 ${darkMode ? "text-gray-100" : "text-gray-100"}`}>
          <div className="container mx-auto text-center px-6">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Create Ads That <span className="text-yellow-400">Inspire</span> and <span className="text-green-400">Perform</span>
            </h1>
            <p className={`text-lg md:text-xl ${darkMode ? "text-gray-300" : "text-gray-200"} max-w-3xl mx-auto mb-8`}>
              Unlock the full potential of your brand with our cutting-edge advertising platform. Create captivating campaigns effortlessly and see your business grow.
            </p>
            <Link to={ROUTES.PROTECTED.CREATEADD}>
              <button className="bg-yellow-400 text-black px-8 py-4 text-lg font-bold rounded-full shadow-lg hover:shadow-xl hover:bg-yellow-300 transition">
                Start Your Ad Campaign
              </button>
            </Link>
          </div>
        </div>
      </header>

      
  <section className={`container mx-auto px-6 py-16 text-center ${darkMode ? "text-gray-300" : "text-gray-800"}`}>
  <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Advertise With Us?</h2>
  <p className={`text-lg md:text-xl ${darkMode ? "text-gray-300" : "text-gray-600"} max-w-3xl mx-auto mb-12`}>
    From instant campaign creation to advanced analytics, our platform empowers you to connect with the right audience and achieve measurable results.
  </p>
  <div className={`grid gap-8 md:grid-cols-3 ${darkMode ? "bg-gray-900" : "bg-white"}`}> 
    {[ 
      {
        icon: <HiOutlineLightBulb className="w-12 h-12 md:w-16 md:h-16 text-yellow-500 mx-auto" />,
        title: "Instant Campaigns",
        description: "Set up and launch your ads in just minutes.",
      },
      {
        icon: <HiOutlineGlobeAlt className="w-12 h-12 md:w-16 md:h-16 text-green-500 mx-auto" />,
        title: "Global Reach",
        description: "Reach audiences worldwide with precise targeting.",
      },
      {
        icon: <HiOutlinePlay className="w-12 h-12 md:w-16 md:h-16 text-red-500 mx-auto" />,
        title: "Engaging Formats",
        description: "Choose from video, banners, or text ads.",
      },
    ].map((feature, index) => (
      <div key={index} className={`rounded-xl shadow-lg p-6 md:p-8 hover:shadow-xl transition ${darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-800"}`}>
        <div>{feature.icon}</div>
        <h3 className="text-xl md:text-2xl font-semibold mt-4">{feature.title}</h3>
        <p className="mt-2">{feature.description}</p>
      </div>
    ))}
  </div>
</section>


      
    <section className={`container mx-auto px-6 py-16 text-center ${darkMode ? "bg-gray-900 text-gray-200" : "bg-gradient-to-r from-yellow-300 to-orange-400"}`}>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Affordable Advertising with Big Returns</h2>
        <p className={`text-lg md:text-xl max-w-3xl mx-auto mb-8 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Invest just <strong>₹300/month</strong> for a full suite of advertising tools designed to elevate your brand.
          Compare this to traditional ad costs, and you’ll see how much more you can achieve at a fraction of the price.
        </p>

       
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 mb-12">
          {[ 
           
            { feature: "Targeted Audience", description: "Reach the audience most likely to engage." },

            { feature: "Multiple Formats", description: "Choose from video, banner, and text ad types." },
            { feature: "Global Reach", description: "Advertise to customers around the world." },
          ].map((service, index) => (
            <div key={index} className={`bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition ${darkMode ? "bg-gray-800 text-gray-300" : ""}`}>
              <h4 className="text-xl font-semibold">{service.feature}</h4>
              <p className={`text-gray-600 mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{service.description}</p>
            </div>
          ))}
        </div>
   
        <Link to={ROUTES.PROTECTED.CREATEADD}>
          <button className={`bg-yellow-400 text-black px-8 py-4 text-lg font-bold rounded-full shadow-lg hover:shadow-xl hover:bg-yellow-300 transition ${darkMode ? "text-white" : ""}`}>
            Start Your Campaign Now
          </button>
        </Link>
      </section>

      {/* Final Call to Action Section */}
      <section className={`bg-gradient-to-r ${darkMode ? "from-gray-900 to-gray-800" : "from-yellow-400 to-orange-500"} text-white py-12 md:py-16`}>
        <div className="container mx-auto text-center px-6">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Take the first step toward growing your business. Create an ad campaign that drives results.
          </p>
          <button className="bg-black px-10 py-4 text-lg font-bold rounded-full shadow-lg hover:shadow-xl hover:bg-gray-900 transition">
            Start Your Ad Now
          </button>
        </div>
      </section>

     
      <section className={`relative bg-cover bg-center bg-[url('https://escribir.s3.eu-north-1.amazonaws.com/advertisement.jpg')] text-white ${darkMode ? "bg-black" : ""}`}>
        <div className="bg-black bg-opacity-50 py-16 md:py-24">
          <div className="container mx-auto text-center px-6">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Create Your Ad Today</h2>
            <p className={`text-lg md:text-xl ${darkMode ? "text-gray-300" : "text-gray-200"} max-w-2xl mx-auto mb-8`}>
              With our simple and intuitive tools, you can create a professional-looking ad in just a few clicks.
            </p>
            {isClient ? (
          <Link to={ROUTES.PROTECTED.CREATEADD}>
            <button
              className={`bg-yellow-400 text-black px-8 py-4 text-lg font-bold rounded-full shadow-lg hover:shadow-xl hover:bg-yellow-300 transition ${
                darkMode ? "text-white" : ""
              }`}
            >
              Start Now
            </button>
          </Link>
        ) : (
          <Link to={ROUTES.PROTECTED.BUISNESS}>
            <button
              className={`bg-green-500 text-white px-8 py-4 text-lg font-bold rounded-full shadow-lg hover:shadow-xl hover:bg-green-400 transition ${
                darkMode ? "text-black" : ""
              }`}
            >
              Register Your Business
            </button>
          </Link>
        )}
          </div>
        </div>
      </section>

    <section className={`container mx-auto px-6 py-16 ${darkMode ? "text-gray-300" : "text-gray-800"}`}>
  <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
    Explore Ad Formats
  </h2>
  <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
    {[ 
      {
        image: "https://escribir.s3.eu-north-1.amazonaws.com/adbbaner2.jpg",
        title: "Video Ads",
        description: "Capture attention with high-quality video content.",
      },
      {
        image: "https://escribir.s3.eu-north-1.amazonaws.com/adbanner3.jpg",
        title: "Banner Ads",
        description: "Make a statement with vibrant, clickable banners.",
      },
      {
        image: "https://escribir.s3.eu-north-1.amazonaws.com/adbanner.jpg",
        title: "Text Ads",
        description: "Deliver a clear message with minimal distractions.",
      },
    ].map((adType, index) => (
      <div 
        key={index} 
        className={`rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition ${darkMode ? "bg-gray-800" : "bg-white"}`}
      >
        <img src={adType.image} alt={adType.title} className="w-full h-48 sm:h-56 object-cover" />
        <div className={`p-6 ${darkMode ? "text-gray-300" : "text-gray-800"}`}>
          <h3 className="text-xl md:text-2xl font-bold mb-2">{adType.title}</h3>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-800"}`}>{adType.description}</p>
        </div>
      </div>
    ))}
  </div>
</section>


   
<section className={`bg-gradient-to-r from-yellow-400 to-orange-500 py-12 md:py-16 ${darkMode ? "text-gray-900" : "text-white"}`}>
  <div className="container mx-auto text-center px-6">
    <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
    <p className={`text-lg md:text-xl max-w-3xl mx-auto mb-8`}>
      Create a professional ad campaign that connects with your audience and drives results.
    </p>
 <button className={` px-10 py-4 text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition ${darkMode ?   " bg-white hover:bg-gray-100" : " bg-black hover:bg-gray-900"}`}>
  Start Your Ad Now
</button>

  </div>
</section>

    </div>
  );
};

export default Advertisement;
