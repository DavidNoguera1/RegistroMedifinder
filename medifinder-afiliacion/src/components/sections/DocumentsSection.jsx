import { useForm } from '../../contexts/FormContext';
import { FaFilePdf, FaFileImage, FaCheckCircle } from "react-icons/fa";

const FileUpload = ({ name, label, description, required }) => {
  const { formData, updateFormData } = useForm();
  const file = formData[name];

  const handleFileChange = (e) => {
    updateFormData(name, e.target.files[0]);
  };

  return (
    <div className="border rounded-md p-4 mb-4">
      <div className="flex items-start">
        <div className="mr-4 mt-1">
          {file ? (
            <FaCheckCircle className="h-5 w-5 text-success" />
          ) : (
            <div className="h-5 w-5 border-2 border-gray-300 rounded-full"></div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-800">{label} {required && <span className="text-danger">*</span>}</h3>
          <p className="text-sm text-gray-500 mb-2">{description}</p>
          
          <label className="inline-flex items-center px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer">
            <input
              type="file"
              onChange={handleFileChange}
              className="sr-only"
              accept=".pdf,.jpg,.jpeg,.png"
              required={required && !file}
            />
            Seleccionar archivo
          </label>
          
          {file && (
            <div className="mt-2 flex items-center text-sm text-gray-600">
              {file.type.includes('pdf') ? (
                <FaFilePdf className="mr-2 text-red-500" />
              ) : (
                <FaFileImage className="mr-2 text-blue-500" />
              )}
              <span>{file.name}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DocumentsSection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-primary border-b pb-2">Documentos Requeridos</h2>
      
      <p className="text-gray-600 text-sm">
        Adjunte los siguientes documentos en formato PDF, JPG o PNG (máximo 5MB cada uno)
      </p>
      
      <FileUpload
        name="commerceRegistry"
        label="Registro de la cámara de comercio"
        description="Documento vigente (máximo 3 meses)"
        required
      />
      
      <FileUpload
        name="operationLicense"
        label="Licencia de funcionamiento"
        description="Expedida por la autoridad competente"
        required
      />
      
      <FileUpload
        name="sanitaryRegistry"
        label="Registro sanitario"
        description="Documento vigente expedido por Invima"
        required
      />
    </div>
  );
};

export default DocumentsSection;