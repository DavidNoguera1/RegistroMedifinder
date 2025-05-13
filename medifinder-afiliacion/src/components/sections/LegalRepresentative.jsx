import Input from '../common/Input';
import { useForm } from '../../contexts/FormContext';
import { useEffect, useState } from 'react';

const LegalRepresentative = () => {
  const { formData, updateFormData } = useForm();
  const [repError, setRepError] = useState('');
  const [repTouched, setRepTouched] = useState(false);

  useEffect(() => {
    if (!repTouched || !formData.representativeId) {
      setRepError('');
      return;
    }

    const timeout = setTimeout(() => {
      const legalReps = JSON.parse(localStorage.getItem('legalRepresentatives')) || ['1234567890'];
      const exists = legalReps.includes(formData.representativeId);
      if (!exists) {
        setRepError('No hay registro de este representante legal en el sistema, no puede seguir.');
      } else {
        setRepError('');
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [formData.representativeId, repTouched]);

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
          onChange={(e) => {
            updateFormData('representativeId', e.target.value);
            setRepTouched(true);
          }}
          required
          placeholder="Ej: 1234567890"
        />
        {repError && (
          <p className="text-sm text-danger mt-1">{repError}</p>
        )}
      </div>
    </div>
  );
};

export default LegalRepresentative;
