import { AlertDialog, Button, Card, Tabs } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { LIST_USER_ADVETISEMENTS, PAUSE_ADD } from "../../services/Api/clientApi";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/Route";

const ClientDashboard = () => {
  const [advertisements, setAdvertisements] = useState([
    {
      _id: "",
      id: 1,
      title: "Summer Sale Campaign",
      status: "Active",
      targetAudience: "blogPage",
      format: "",
    },
    {
      id: 2,
      title: "New Product Launch",
      status: "Paused",
      targetAudience: "home",
      format: "",
    },
  ]);

  // Fetch advertisements from the server
  useEffect(() => {
    const fetchAd = async () => {
      try {
        const response = await LIST_USER_ADVETISEMENTS();
        console.log(response.data);
        setAdvertisements(response.data);
      } catch (error) {
        console.error("Error fetching advertisements:", error);
      }
    };
    fetchAd();
  }, []);

  
  const handlePauseAd = async (adId: string, currentStatus: string) => {
    console.log("Toggling Ad ID:", adId);
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active"; 
      const response = await PAUSE_ADD(adId);
     console.log(response);
    setAdvertisements((prevAds) =>
        prevAds.map((ad) =>
          ad._id === adId ? { ...ad, status: newStatus } : ad
        )
      );
    } catch (error) {
      console.error("Error pausing/resuming ad:", error);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Client Dashboard</h1>

      <Tabs.Root defaultValue="advertisements" className="w-full">
        <Tabs.List className="grid w-full grid-cols-2">
          <Tabs.Trigger value="advertisements" className="tab-trigger">
            My Advertisements
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="advertisements">
          <Card className="p-6 shadow-lg rounded-lg bg-white">
            <h2 className="text-2xl font-semibold mb-4">My Advertisements</h2>
            <table className="min-w-full bg-white table-auto border border-gray-200 rounded-lg shadow-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">
                    Title
                  </th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">
                    Status
                  </th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">
                    Target
                  </th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">
                    Format
                  </th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {advertisements.map((ad, index) => (
                  <tr key={ad._id || index} className="hover:bg-gray-50">
                    <td className="py-2 px-4">{ad.title || "N/A"}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          ad.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {ad.status || "Unknown"}
                      </span>
                    </td>
                    <td className="py-2 px-4">{ad.targetAudience || "N/A"}</td>
                    <td className="py-2 px-4">{ad.format || "N/A"}</td>
                    <td className="py-2 px-4">
                      <div className="flex space-x-2">
                       
                        <AlertDialog.Root>
                          <AlertDialog.Trigger>
                            <Button variant="surface">
                              {ad.status === "active" ? "Pause" : "Start"}
                            </Button>
                          </AlertDialog.Trigger>
                          <AlertDialog.Content>
                            <AlertDialog.Title>
                              <span>
                                {ad.status === "Active"
                                  ? "Pause Advertisement?"
                                  : "Start Advertisement?"}
                              </span>
                            </AlertDialog.Title>
                            <AlertDialog.Description>
                              <span>
                                Are you sure you want to{" "}
                                {ad.status === "active" ? "pause" : "start"} this
                                advertisement?
                              </span>
                            </AlertDialog.Description>
                            <AlertDialog.Cancel>
                              <Button variant="outline">Cancel</Button>
                            </AlertDialog.Cancel>
                            <AlertDialog.Action
                              onClick={() =>
                                handlePauseAd(ad._id || "", ad.status)
                              }
                            >
                              <Button variant="surface">
                                {ad.status === "active" ? "Pause" : "Start"}
                              </Button>
                            </AlertDialog.Action>
                          </AlertDialog.Content>
                        </AlertDialog.Root>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex justify-between items-center">
              <Link to={ROUTES.PROTECTED.CREATEADD}>
                <Button variant="outline">Create New Advertisement</Button>
              </Link>
            </div>
          </Card>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default ClientDashboard;
