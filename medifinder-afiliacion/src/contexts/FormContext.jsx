import { createContext, useContext, useState } from 'react'

const FormContext = createContext()

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    pharmacyName: '',
    nit: '',
    address: '',
    department: '',
    city: '',
    phone: '',
    email: '',
    representativeId: '',
    commerceRegistry: null,
    operationLicense: null,
    sanitaryRegistry: null,
    comments: ''
  })

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  )
}

export const useForm = () => {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('useForm must be used within a FormProvider')
  }
  return context
}