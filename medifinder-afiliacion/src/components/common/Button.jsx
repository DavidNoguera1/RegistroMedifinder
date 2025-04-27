const Button = ({ children, type = 'button', variant = 'primary', className = '', ...props }) => {
    const baseClasses = 'px-6 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors'
    
    const variants = {
      primary: 'bg-primary text-white hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500',
      success: 'bg-success text-white hover:bg-green-700 focus:ring-green-500',
      outline: 'border border-primary text-primary hover:bg-blue-50 focus:ring-blue-500',
    }
    
    return (
      <button
        type={type}
        className={`${baseClasses} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }
  
  export default Button