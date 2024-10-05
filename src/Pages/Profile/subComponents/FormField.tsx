import { FormFieldProps } from "../../../Interfaces/Components"


const FormField: React.FC<FormFieldProps> = ({
    label,
    name,
    value,
    editMode,
    type = 'text',
    onChange,
    darkMode,
    isTextArea = false,
  }) => {
    return (
      <div className='space-y-4'>
        <label className="block text-sm font-medium">{label}</label>
        {editMode ? (
          isTextArea ? (
            <textarea
              name={name}
              value={value}
              onChange={onChange}
              className={`mt-1 block w-full p-2 border ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 bg-white'} rounded-md shadow-sm`}
            ></textarea>
          ) : (
            <input
              type={type}
              name={name}
              value={value}
              onChange={onChange}
              className={`mt-1 block w-full p-2 border ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 bg-white'} rounded-md shadow-sm`}
            />
          )
        ) : (
          <p className={`mt-1 p-2 border ${darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-300 bg-gray-100'} rounded-md`}>
            {value}
          </p>
        )}
      </div>
    );
  };
export default FormField
