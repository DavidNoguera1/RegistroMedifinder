import { FormProvider } from './contexts/FormContext'
import FormLayout from './components/layout/FormLayout'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <FormProvider>
        <FormLayout />
      </FormProvider>
    </div>
  )
}

export default App
