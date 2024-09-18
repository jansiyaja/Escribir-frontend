

const Profile = () => {
  return (
    <div className="flex items-center p-6">
      <img src="user-avatar.jpg" alt="Profile" className="rounded-full w-24 h-24 mr-4" />
      <div>
        <h2 className="text-xl font-bold">@ Ernie Smith</h2>
      </div>
    </div>
  );
};

export default Profile;
