import Input from '../common/Input'
import { useForm } from '../../contexts/FormContext'

const departments = [
  'Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bogotá D.C.', 'Bolívar', 'Boyacá',
  'Caldas', 'Caquetá', 'Casanare', 'Cauca', 'Cesar', 'Chocó', 'Córdoba',
  'Cundinamarca', 'Guainía', 'Guaviare', 'Huila', 'La Guajira', 'Magdalena',
  'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindío', 'Risaralda',
  'San Andrés', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca', 'Vaupés',
  'Vichada'
]

const citiesByDepartment = {
'Amazonas': ['Leticia'],
  'Antioquia': ['Medellín', 'Bello', 'Itagüí', 'Envigado', 'Rionegro'],
  'Arauca': ['Arauca'],
  'Atlántico': ['Barranquilla'],
  'Bogotá D.C.': ['Bogotá'],
  'Bolívar': ['Cartagena'],
  'Boyacá': ['Tunja'],
  'Caldas': ['Manizales'],
  'Caquetá': ['Florencia'],
  'Casanare': ['Yopal'],
  'Cauca': ['Popayán'],
  'Cesar': ['Valledupar'],
  'Chocó': ['Quibdó'],
  'Córdoba': ['Montería'],
  'Cundinamarca': ['Soacha'],
  'Guainía': ['Inírida'],
  'Guaviare': ['San José del Guaviare'],
  'Huila': ['Neiva'],
  'La Guajira': ['Riohacha'],
  'Magdalena': ['Santa Marta'],
  'Meta': ['Villavicencio'],
  'Nariño': ['Pasto'],
  'Norte de Santander': ['Cúcuta'],
  'Putumayo': ['Mocoa'],
  'Quindío': ['Armenia'],
  'Risaralda': ['Pereira'],
  'San Andrés': ['San Andrés'],
  'Santander': ['Bucaramanga'],
  'Sucre': ['Sincelejo'],
  'Tolima': ['Ibagué'],
  'Valle del Cauca': ['Cali', 'Palmira', 'Buenaventura', 'Tuluá'],
  'Vaupés': ['Mitú'],
  'Vichada': ['Puerto Carreño']
}

const PharmacyInfo = () => {
  const { formData, updateFormData } = useForm()

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-primary border-b pb-2">Información de la Farmacia</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Nombre de la farmacia"
          name="pharmacyName"
          value={formData.pharmacyName}
          onChange={(e) => updateFormData('pharmacyName', e.target.value)}
          required
        />
        
        <Input
          label="NIT"
          name="nit"
          value={formData.nit}
          onChange={(e) => updateFormData('nit', e.target.value)}
          required
        />
        
        <Input
          label="Dirección completa"
          name="address"
          value={formData.address}
          onChange={(e) => updateFormData('address', e.target.value)}
          required
        />
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Departamento <span className="text-danger">*</span>
          </label>
          <select
            name="department"
            value={formData.department}
            onChange={(e) => updateFormData('department', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            required
          >
            <option value="">Seleccione...</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ciudad/Municipio <span className="text-danger">*</span>
          </label>
          <select
            name="city"
            value={formData.city}
            onChange={(e) => updateFormData('city', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            required
            disabled={!formData.department}
          >
            <option value="">Seleccione...</option>
            {formData.department && citiesByDepartment[formData.department]?.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        
        <Input
          label="Teléfono de contacto"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => updateFormData('phone', e.target.value)}
          required
        />
        
        <Input
          label="Correo electrónico"
          name="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData('email', e.target.value)}
          required
        />
      </div>
    </div>
  )
}

export default PharmacyInfo