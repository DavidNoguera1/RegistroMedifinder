import { useState } from 'react'
import Header from './Header'
import ProgressSteps from '../common/ProgressSteps'
import PharmacyInfo from '../sections/PharmacyInfo'
import LegalRepresentative from '../sections/LegalRepresentative'
import DocumentsSection from '../sections/DocumentsSection'
import CommentsSection from '../sections/CommentsSection'
import Button from '../common/Button'

const FormLayout = () => {
  const [step, setStep] = useState(1)
  const totalSteps = 4

  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Formulario enviado')
    // Lógica de envío aquí
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <Header />
      
      <ProgressSteps currentStep={step} totalSteps={totalSteps} />
      
      <form onSubmit={handleSubmit} className="p-6">
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
            <Button type="submit" variant="success">
              Enviar Solicitud
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}

export default FormLayout