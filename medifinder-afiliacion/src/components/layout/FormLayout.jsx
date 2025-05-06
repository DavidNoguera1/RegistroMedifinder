import { useState } from 'react';
import Header from './Header';
import ProgressSteps from '../common/ProgressSteps';
import PharmacyInfo from '../sections/PharmacyInfo';
import LegalRepresentative from '../sections/LegalRepresentative';
import DocumentsSection from '../sections/DocumentsSection';
import CommentsSection from '../sections/CommentsSection';
import Button from '../common/Button';
import Modal from '../common/Modal';
import { useForm } from '../../contexts/FormContext';

const FormLayout = () => {
  const [step, setStep] = useState(1);
  const [modalInfo, setModalInfo] = useState({ isOpen: false, title: '', description: '' });
  const [validationErrors, setValidationErrors] = useState([]);
  const { formData } = useForm();

  const totalSteps = 4;

  const nextStep = () => {
    const errors = validateCurrentStep();
    if (errors.length > 0) {
      setValidationErrors(errors);
      setModalInfo({
        isOpen: true,
        title: 'Formulario Incompleto',
        description: 'Por favor complete todos los campos requeridos antes de continuar.',
      });
      return;
    }
    setValidationErrors([]);
    setStep(prev => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const validateCurrentStep = () => {
    const errors = [];
    
    switch(step) {
      case 1:
        if (!formData.pharmacyName?.trim()) errors.push('Nombre de la farmacia');
        if (!formData.nit?.trim()) errors.push('NIT');
        if (!formData.address?.trim()) errors.push('Dirección');
        if (!formData.department?.trim()) errors.push('Departamento');
        if (!formData.city?.trim()) errors.push('Ciudad');
        if (!formData.phone?.trim()) errors.push('Teléfono');
        if (!formData.email?.trim()) errors.push('Email');
        break;
      case 2:
        if (!formData.representativeId?.trim()) errors.push('Cédula del representante legal');
        break;
      case 3:
        if (!formData.commerceRegistry) errors.push('Registro de cámara de comercio');
        if (!formData.operationLicense) errors.push('Licencia de funcionamiento');
        if (!formData.sanitaryRegistry) errors.push('Registro sanitario');
        break;
      default:
        break;
    }
    
    return errors;
  };

  const isFormEmpty = () => {
    return Object.values(formData).every(
      value => value === null || value === undefined || value === '' || 
              (typeof value === 'object' && value !== null && Object.keys(value).length === 0)
    );
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve(null);
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar si el formulario está completamente vacío
    if (isFormEmpty()) {
      setModalInfo({
        isOpen: true,
        title: 'Formulario Vacío',
        description: 'Por favor complete al menos los campos requeridos antes de enviar.',
      });
      return;
    }

    // Validar campos requeridos
    const errors = validateCurrentStep();
    if (errors.length > 0) {
      setValidationErrors(errors);
      setModalInfo({
        isOpen: true,
        title: 'Formulario Incompleto',
        description: `Los siguientes campos son requeridos: ${errors.join(', ')}`,
      });
      return;
    }

    // Solo verificar duplicados si estamos en el paso final
    if (step === totalSteps) {
      const existingPharmacies = JSON.parse(localStorage.getItem('pharmacies')) || [];
      const nits = existingPharmacies.map(pharmacy => pharmacy.nit);

      if (nits.includes(formData.nit)) {
        setModalInfo({
          isOpen: true,
          title: 'Error de Registro',
          description: 'Ya existe una farmacia registrada con este NIT.',
        });
        return;
      }

      // Convertir archivos a Base64
      try {
        const [commerceRegistryB64, operationLicenseB64, sanitaryRegistryB64] = await Promise.all([
          convertFileToBase64(formData.commerceRegistry),
          convertFileToBase64(formData.operationLicense),
          convertFileToBase64(formData.sanitaryRegistry),
        ]);

        const newPharmacy = {
          ...formData,
          commerceRegistry: commerceRegistryB64,
          operationLicense: operationLicenseB64,
          sanitaryRegistry: sanitaryRegistryB64,
        };

        // Guardar en localStorage
        const updatedPharmacies = [...existingPharmacies, newPharmacy];
        localStorage.setItem('pharmacies', JSON.stringify(updatedPharmacies));

        // Mostrar modal de éxito
        setModalInfo({
          isOpen: true,
          title: 'Registro Exitoso',
          description: 'La farmacia ha sido registrada correctamente.',
        });
      } catch (error) {
        setModalInfo({
          isOpen: true,
          title: 'Error',
          description: 'Ocurrió un error al procesar los documentos. Por favor intente nuevamente.',
        });
      }
    } else {
      nextStep();
    }
  };

  const closeModal = () => {
    setModalInfo({ isOpen: false, title: '', description: '' });
    if (modalInfo.title === 'Registro Exitoso') {
      window.location.reload();
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <Header />
      <ProgressSteps currentStep={step} totalSteps={totalSteps} />
      <form className="p-6">
        {step === 1 && <PharmacyInfo />}
        {step === 2 && <LegalRepresentative />}
        {step === 3 && <DocumentsSection />}
        {step === 4 && <CommentsSection />}
        <div className="flex justify-between pt-6 border-t mt-8">
          {step > 1 ? (
            <Button type="button" variant="secondary" onClick={prevStep}>
              Anterior
            </Button>
          ) : <div />}
          {step < totalSteps ? (
            <Button type="button" onClick={nextStep}>
              Siguiente
            </Button>
          ) : (
            <Button type="button" variant="success" onClick={handleSubmit}>
              Enviar Solicitud
            </Button>
          )}
        </div>
      </form>
      <Modal
        isOpen={modalInfo.isOpen}
        onClose={closeModal}
        title={modalInfo.title}
        description={modalInfo.description}
      />
    </div>
  );
};

export default FormLayout;