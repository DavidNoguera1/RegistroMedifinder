import Input from '../common/Input';
import { useForm } from '../../contexts/FormContext';

const LegalRepresentative = () => {
  const { formData, updateFormData } = useForm();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-primary border-b pb-2">Representante Legal</h2>
      
      <div className="bg-blue-50 p-4 rounded-md mb-6">
        <p className="text-blue-800 text-sm">
          Verificaremos si el representante legal ya se encuentra registrado en nuestro sistema.
        </p>
      </div>
      
      <div className="max-w-md">
        <Input
          label="Número de cédula del representante legal"
          name="representativeId"
          value={formData.representativeId}
          onChange={(e) => updateFormData('representativeId', e.target.value)}
          required
          placeholder="Ej: 1234567890"
        />
      </div>
    </div>
  );
};

export default LegalRepresentative;