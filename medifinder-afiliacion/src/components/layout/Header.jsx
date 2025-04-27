import { FaClinicMedical } from "react-icons/fa";

const Header = () => {
  return (
    <header className="flex items-center p-6 border-b border-gray-200">
      <div className="bg-primary text-white p-3 rounded-lg mr-4">
        <FaClinicMedical className="h-8 w-8" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-primary">Solicitud de Afiliación para Farmacias</h1>
        <p className="text-gray-600">Complete los datos y adjunte los documentos requeridos</p>
      </div>
    </header>
  );
};

export default Header;