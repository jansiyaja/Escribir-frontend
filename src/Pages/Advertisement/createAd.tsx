import React, { useEffect, useState } from "react";
import { Camera, Target, Video, HelpCircle, Pin } from "lucide-react";
import { AdDetails, Tag } from "../../Interfaces/Components";
import { listTags } from "../../services/Api/blogApi";
import VideoAd from "./VideoAd";
import ImageAd from "./ImageAd";
import TextAd from "./TextAd";
import { CREATEADD } from "../../services/Api/clientApi";
import { handleAxiosError } from "../../utils/errorHandling";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/Route";

const CreateAd = () => {
  const [adDetails, setAdDetails] = useState<AdDetails>({
    title: "",
    targetAudience: "",
    format: "Video Ad",
    industry: "",
    thumbnailPreview: "",
    link: "",
    textContent: "", 
  });
    const [errors, setErrors] = useState<Partial<AdDetails>>({});
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const [adVisible, setAdVisible] = useState(true); 
  const navigate= useNavigate()


  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await listTags();
        setTags(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTags();
  }, []);
       console.log("thumbnailFile",thumbnailFile);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAdDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      setThumbnailFile(file); // Store the actual file
      const reader = new FileReader();
      reader.onloadend = () => {
        setAdDetails((prev) => ({
          ...prev,
          thumbnailPreview: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: Partial<AdDetails> = {};
    if (!adDetails.title.trim()) newErrors.title = "Ad title is required";
    if (!adDetails.targetAudience.trim())
      newErrors.targetAudience = "Target audience is required";
    if (!adDetails.industry.trim()) newErrors.industry = "Industry is required";
    if (!adDetails.link.trim()) {
      newErrors.link = "Ad link is required";
    } else if (!/^https?:\/\/[^\s]+$/.test(adDetails.link)) {
      newErrors.link = "Please enter a valid URL (e.g., https://example.com)";
    }
    if (adDetails.format === "Text Ad" && !adDetails.textContent.trim()) {
      newErrors.textContent = "Text content is required for Text Ad";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async () => {
    if (validateForm()) {
      try {
        
        const formData = new FormData();
        formData.append("title", adDetails.title);
        formData.append("targetAudience", adDetails.targetAudience);
        formData.append("format", adDetails.format);
        formData.append("industry", adDetails.industry);
        formData.append("link", adDetails.link);
        if (adDetails.format === "Text Ad") {
          formData.append("textContent", adDetails.textContent);
        }
        if (thumbnailFile) {
            formData.append("thumbnail", thumbnailFile); 
        
        }

         console.log("formData",formData);
   
        const response = await CREATEADD(formData);
          if (response.status === 201) {
            console.log(response.data);
            alert("Ad Created Successfully!");
           navigate(ROUTES.PUBLIC.HOME)
            
        }
      } catch (error) {
        let errorMessage = handleAxiosError(error);
        console.log(errorMessage);
      }
    }
  };
    const handleAdSkip = () => {
    setAdVisible(false); // Hide the ad when skipped
  };
  const renderPreview = () => {
    if (adVisible&&adDetails.format === "Video Ad") {
      return <VideoAd title={adDetails.title} link={adDetails.link} thumbnailPreview={adDetails.thumbnailPreview || ""} />;
    }

    if (adVisible&&adDetails.format === "Image Ad") {
      return <ImageAd title={adDetails.title} link={adDetails.link}   thumbnailPreview={adDetails.thumbnailPreview || ""} onSkip={handleAdSkip}/>;
    }

    if (adVisible&&adDetails.format === "Text Ad") {
      return <TextAd title={adDetails.title} textContent={adDetails.textContent} link={adDetails.link} />;
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 py-10">
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="bg-white p-8 rounded-xl shadow-2xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Your Ad</h1>

          <div className="space-y-6">
            {/* Ad Title */}
            <div>
              <label className="text-lg font-semibold mb-2 flex items-center">
                <Camera className="mr-2 text-blue-600" /> Ad Title
              </label>
              <input
                type="text"
                name="title"
                value={adDetails.title}
                onChange={handleChange}
                className={`w-full p-4 border rounded-lg ${errors.title ? "border-red-500" : ""}`}
                placeholder="Enter a catchy ad title"
              />
              {errors.title && <p className="text-red-500 mt-2">{errors.title}</p>}
            </div>

         
            <div>
              <label className="text-lg font-semibold mb-2 flex items-center">
                <Target className="mr-2 text-blue-600" /> Target
              </label>
              <select
                name="targetAudience"
                value={adDetails.targetAudience}
                onChange={handleChange}
                className={`w-full p-4 border rounded-lg ${errors.targetAudience ? "border-red-500" : ""}`}
              >
                <option value="">Select Target</option>
                <option value="Homepage">Homepage</option>
                <option value="Blog Page">Blog Page</option>
                <option value="Banner">Banner</option>
              </select>
              {errors.targetAudience && <p className="text-red-500 mt-2">{errors.targetAudience}</p>}
            </div>

           
            <div>
              <label className="text-lg font-semibold mb-2 flex items-center">
                <HelpCircle className="mr-2 text-blue-600" /> Industry
              </label>
              <select
                name="industry"
                value={adDetails.industry}
                onChange={handleChange}
                className={`w-full p-4 border rounded-lg ${errors.industry ? "border-red-500" : ""}`}
              >
                <option value="">Select Your Industry</option>
                {tags.map((tag) => (
                  <option key={tag._id} value={tag.name}>
                    {tag.name}
                  </option>
                ))}
              </select>
              {errors.industry && <p className="text-red-500 mt-2">{errors.industry}</p>}
            </div>

            {/* Ad Format */}
            <div>
              <label className="text-lg font-semibold mb-2 flex items-center">
                <Video className="mr-2 text-blue-600" /> Ad Format
              </label>
              <select
                name="format"
                value={adDetails.format}
                onChange={handleChange}
                className="w-full p-4 border rounded-lg"
              >
                <option>Video Ad</option>
                <option>Image Ad</option>
                <option>Text Ad</option>
              </select>
            </div>

          
            {adDetails.format !== "Text Ad" && (
              <div>
                <label className="text-lg font-semibold mb-2 flex items-center">
                  <Camera className="mr-2 text-blue-600" /> Ad Thumbnail
                </label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  className="w-full p-4 border rounded-lg"
                />
                {adDetails.thumbnailPreview && (
                  <img
                    src={adDetails.thumbnailPreview}
                    
                    className="mt-4 w-full h-auto object-cover rounded-lg"
                  />
                )}
              </div>
            )}

           
            {adDetails.format === "Text Ad" && (
              <div>
                <label className="text-lg font-semibold mb-2 flex items-center">
                  <Pin className="mr-2 text-blue-600" /> Text Content
                </label>
                <textarea
                  name="textContent"
                  value={adDetails.textContent}
                  onChange={handleChange}
                  className={`w-full p-4 border rounded-lg ${errors.textContent ? "border-red-500" : ""}`}
                  rows={6}
                  placeholder="Enter the ad text"
                />
                {errors.textContent && <p className="text-red-500 mt-2">{errors.textContent}</p>}
              </div>
                      )}
                      <div>
              <label className="text-lg font-semibold mb-2 flex items-center">
                <Pin className="mr-2 text-blue-600" /> Ad Link
              </label>
              <input
                type="text"
                name="link"
                value={adDetails.link}
                onChange={handleChange}
                className={`w-full p-4 border rounded-lg ${errors.textContent ? "border-red-500" : ""}`}
                placeholder="Enter the URL for your ad"
              />
              {errors.link && <p className="text-red-500 mt-2">{errors.link}</p>}
            </div>

          
            <div className="flex justify-center mt-6">
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg"
              >
                Create Ad
              </button>
            </div>
          </div>

          <div className="mt-8">
            {renderPreview()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAd;
