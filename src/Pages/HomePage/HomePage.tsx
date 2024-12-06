import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store/store";
import { LIST_ADVETISEMENTS } from "../../services/Api/clientApi";
import { setAdvertisement } from "../../redux/slices/addSlice";
import VideoAd from "../Advertisement/VideoAd";
import ImageAd from "../Advertisement/ImageAd";
import BlogCard from "./SubComponents/BlogCard";
import { Link } from "react-router-dom";
import TextAd from "../Advertisement/TextAd";

const HomePage: React.FC = () => {
  const { darkMode } = useSelector((state: RootState) => state.theme);
  const advertisements = useSelector((state: RootState) => state.ad.advertisement);
  const user = useSelector((state: RootState) => state.auth.user);
  const [adVisible, setAdVisible] = useState(true); 
  const [currentAd, setCurrentAd] = useState<any>(null); 

  const dispatch = useDispatch();

  useEffect(() => {
    const listAdvertisements = async () => {
      try {
        const response = await LIST_ADVETISEMENTS();
        if (response.status === 201 && response.data) {
          console.log("Advertisements fetched:", response.data);

          const transformedAds = response.data.map((ad: any) => {
            return {
              id: ad._id,
              title: ad.title,
              link: ad.link,
              format: ad.format,
              targetAudience: ad.targetAudience, 
              contents: ad.contents, // store all content
            };
          });

          dispatch(setAdvertisement(transformedAds));
        }
      } catch (error) {
        console.error("Failed to fetch advertisements:", error);
      }
    };

    listAdvertisements();
  }, [dispatch]);

  useEffect(() => {
    if (advertisements && advertisements.length > 0 && !user?.isPremium) {
      // Filter ads for the homepage
      const homepageAds = advertisements.filter((ad) => ad.targetAudience === "Homepage");

      if (homepageAds.length > 0) {
        // Select a random ad from the filtered homepage ads
        const randomAd = homepageAds[Math.floor(Math.random() * homepageAds.length)];
        setCurrentAd(randomAd); 
      } else {
        setAdVisible(false); 
      }
    }
  }, [advertisements, user]);

  const handleAdSkip = () => {
    setAdVisible(false); 
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center ${darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"} transition-colors duration-500`}
    >
      {/* Show Advertisement */}
      {adVisible && currentAd && (
        <>
          {currentAd.format === "Video Ad" && (
            <VideoAd
              title={currentAd.title}
              link={currentAd.link}
              thumbnailPreview={currentAd.contents[0]?.value || ""}
              onSkip={handleAdSkip}
            />
          )}
          {currentAd.format === "Image Ad" && (
            <ImageAd
              title={currentAd.title}
              link={currentAd.link}
              thumbnailPreview={currentAd.contents[0]?.value || ""}
              onSkip={handleAdSkip}
            />
          )}
          {currentAd.format === "Text Ad" && (
            <TextAd
              title={currentAd.title}
              link={currentAd.link}
              textContent={currentAd.contents[0]?.value || ""}
            />
          )}
        </>
      )}

      {/* Header Section */}
      <header
        className="w-full bg-cover bg-center h-64 relative"
        style={{
          backgroundImage:
            "url('https://escribir.s3.eu-north-1.amazonaws.com/man-is-using-laptop-books-notebook-top-view.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-5xl font-bold mb-2">Explore Our Blog</h1>
          <p className="text-lg max-w-2xl mb-4">
            Delve into a world of insights, tutorials, and creative articles tailored for you.
          </p>
          <Link
            to="/blog"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition duration-300"
          >
            Start Writing
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full p-6 sm:p-8">
        {/* Latest Articles Section */}
        <section className="my-8">
          <h2 className="text-3xl font-semibold mb-4">Latest Articles</h2>
          <BlogCard />
        </section>
      </main>
    </div>
  );
};

export default HomePage;
