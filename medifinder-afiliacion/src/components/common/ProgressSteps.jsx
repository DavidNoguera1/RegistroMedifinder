const ProgressSteps = ({ currentStep, totalSteps }) => {
    return (
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
          
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((stepNumber) => (
            <div key={stepNumber} className="text-center relative z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${
                currentStep === stepNumber ? 'bg-primary text-white' : 
                currentStep > stepNumber ? 'bg-success text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {stepNumber}
              </div>
              <span className={`text-xs ${currentStep >= stepNumber ? 'font-medium text-gray-800' : 'text-gray-500'}`}>
                {stepNumber === 1 && 'Farmacia'}
                {stepNumber === 2 && 'Representante'}
                {stepNumber === 3 && 'Documentos'}
                {stepNumber === 4 && 'Comentarios'}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ProgressSteps;