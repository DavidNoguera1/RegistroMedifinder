import Header from './Header';
import PharmacyInfo from '../sections/PharmacyInfo';
import LegalRepresentative from '../sections/LegalRepresentative';
import DocumentsSection from '../sections/DocumentsSection';
import CommentsSection from '../sections/CommentsSection';
import Button from '../common/Button';
import { useForm } from '../../contexts/FormContext';

const FormLayout = () => {
  const { formData } = useForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    // Lógica de envío aquí
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <Header />
      
      <form onSubmit={handleSubmit} className="p-6 space-y-8">
        <PharmacyInfo />
        <LegalRepresentative />
        <DocumentsSection />
        <CommentsSection />
        
        <div className="flex justify-end pt-6 border-t">
          <Button type="submit" variant="success">
            Enviar Solicitud
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormLayout;