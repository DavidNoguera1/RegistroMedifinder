import { FormProvider } from './contexts/FormContext'
import FormLayout from './components/layout/FormLayout'
import './index.css'

function App() {
  return (
    <div className="fondo py-12 px-4 sm:px-6 lg:px-8">
      <FormProvider>
        <FormLayout />
      </FormProvider>
    </div>
  )
}

export default App
