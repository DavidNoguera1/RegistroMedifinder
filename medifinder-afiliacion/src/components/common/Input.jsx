const Input = ({ label, required = false, type = 'text', className = '', ...props }) => {
    return (
      <div className={`mb-4 ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-danger">*</span>}
          </label>
        )}
        <input
          type={type}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          {...props}
        />
      </div>
    )
  }
  
  export default Input