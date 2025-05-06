const Modal = ({ isOpen, onClose, title, description }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
          <h2 className="text-xl font-bold text-primary mb-4">{title}</h2>
          <p className="text-gray-700 mb-6">{description}</p>
          <button
            onClick={onClose}
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  };
  
  export default Modal;
  