import { ModalProps } from "../Interfaces/Components";

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    confirmMessage,
    onConfirm,
    children,
}) => {
    if (!isOpen) return null;

    return (
        <div className="absolute inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50  ">
                        <div className="bg-white rounded-lg m-6 p-6 max-w-lg w-full  shadow-lg relative"> 
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 "
                >
                    ✖
                </button>
                <div>
                  
                    {confirmMessage && <p className="mb-4">{confirmMessage}</p>}

                    
                    {children}

                    <div className="flex justify-end mt-4">
                        <button onClick={onClose} className="mr-2 bg-gray-300 px-4 py-2 rounded">Cancel</button>
                        <button 
                            onClick={() => { 
                                if (onConfirm) onConfirm(); 
                                onClose(); 
                            }} 
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
