import { useForm } from '../../contexts/FormContext';
import Input from '../common/Input';

const CommentsSection = () => {
  const { formData, updateFormData } = useForm();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-primary border-b pb-2">Comentarios Adicionales</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          ¿Alguna información adicional que desee compartir?
        </label>
        <textarea
          name="comments"
          value={formData.comments}
          onChange={(e) => updateFormData('comments', e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          placeholder="Escriba aquí cualquier comentario o información adicional que considere relevante..."
        />
      </div>
    </div>
  );
};

export default CommentsSection;