import { Camera, Search, Users, X } from "lucide-react";
import { useState } from "react";

// New Group Creation Modal
interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateGroup: (groupData: any) => void;
}

export const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ 
  isOpen, 
  onClose, 
  onCreateGroup 
}) => {
  const [groupData, setGroupData] = useState({
    name: '',
    description: '',
    image: null as string | null,
    selectedMembers: [] as string[]
  });

  const [searchTerm, setSearchTerm] = useState('');

  // Sample users for demonstration
  const availableUsers = [
    { id: 1, name: 'Alice Smith', email: 'alice@example.com' },
    { id: 2, name: 'Bob Johnson', email: 'bob@example.com' },
    { id: 3, name: 'Carol White', email: 'carol@example.com' },
    { id: 4, name: 'David Brown', email: 'david@example.com' },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to a server
      const reader = new FileReader();
      reader.onloadend = () => {
        setGroupData(prev => ({
          ...prev,
          image: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateGroup(groupData);
    onClose();
  };

  if (!isOpen) return null;

  return (
   <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden">
         <div className="bg-blue-500 text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Create New Group</h2>
          <button onClick={onClose} className="hover:bg-blue-600 p-1 rounded">
            <X className="w-6 h-6" />
          </button>
        </div>

              

        <form onSubmit={handleSubmit} className="px-6 pb-6  space-x-6">
      
                  
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                {groupData.image ? (
                  <img 
                    src={groupData.image} 
                    alt="Group" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <Users className="w-12 h-12 text-gray-400" />
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer hover:bg-blue-600">
                <Camera className="w-4 h-4 text-white" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>

          {/* Group Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Group Name
            </label>
            <input
              type="text"
              value={groupData.name}
              onChange={e => setGroupData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter group name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={groupData.description}
              onChange={e => setGroupData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter group description"
              rows={3}
            />
          </div>

          {/* Member Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Add Members
            </label>
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search users..."
              />
            </div>

            <div className="max-h-40 overflow-y-auto border rounded-lg">
              {availableUsers
                .filter(user => 
                  user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  user.email.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map(user => (
                  <div 
                    key={user.id}
                    className="flex items-center space-x-3 p-2 hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={groupData.selectedMembers.includes(user.name)}
                      onChange={() => {
                        setGroupData(prev => ({
                          ...prev,
                          selectedMembers: prev.selectedMembers.includes(user.name)
                            ? prev.selectedMembers.filter(name => name !== user.name)
                            : [...prev.selectedMembers, user.name]
                        }));
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Selected Members Tags */}
          {groupData.selectedMembers.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {groupData.selectedMembers.map(member => (
                <span 
                  key={member}
                  className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full flex items-center"
                >
                  {member}
                  <button
                    onClick={() => setGroupData(prev => ({
                      ...prev,
                      selectedMembers: prev.selectedMembers.filter(m => m !== member)
                    }))}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              disabled={!groupData.name || groupData.selectedMembers.length === 0}
            >
              Create Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};