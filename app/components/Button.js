"use client";

export default function Button({
  text = "Button",
  onClick = () => {},
  className = "",
  type = "button",
  disabled = false,
  loading = false,
  variant = "primary",
  size = "medium",
  icon = null,
  iconPosition = "left",
  fullWidth = false,
  href = null,
  target = "_self",
  ...props
}) {
  // Variant styles
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white shadow-lg hover:shadow-xl",
    success: "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl",
    warning: "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white shadow-lg hover:shadow-xl",
    danger: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl",
    outline: "bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
    gradient: "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-lg hover:shadow-xl",
    light: "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 hover:from-blue-100 hover:to-blue-200",
  };

  // Size styles
  const sizes = {
    small: "px-4 py-2 text-sm rounded-lg",
    medium: "px-6 py-3 text-base rounded-xl",
    large: "px-8 py-4 text-lg rounded-xl",
    xlarge: "px-10 py-5 text-xl rounded-2xl",
  };

  // Animation classes
  const baseClasses = `
    font-semibold transition-all duration-200 transform hover:-translate-y-0.5 
    active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-offset-2 
    focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed 
    disabled:transform-none disabled:hover:shadow-none
    flex items-center justify-center gap-2
    ${fullWidth ? "w-full" : ""}
  `;

  // Combined classes
  const buttonClasses = `
    ${baseClasses}
    ${variants[variant] || variants.primary}
    ${sizes[size] || sizes.medium}
    ${className}
    ${loading ? "opacity-70 cursor-wait" : ""}
  `;

  // Loading spinner component
  const LoadingSpinner = () => (
    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  // Icon component
  const IconComponent = () => {
    if (typeof icon === "string") {
      return <span className="text-xl">{icon}</span>;
    }
    return icon;
  };

  // If href is provided, render as link
  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={buttonClasses}
        onClick={onClick}
        {...props}
      >
        {icon && iconPosition === "left" && <IconComponent />}
        {loading ? <LoadingSpinner /> : text}
        {icon && iconPosition === "right" && <IconComponent />}
      </a>
    );
  }

  // Regular button
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={buttonClasses}
      {...props}
    >
      {icon && iconPosition === "left" && <IconComponent />}
      {loading ? <LoadingSpinner /> : text}
      {icon && iconPosition === "right" && <IconComponent />}
    </button>
  );
}

// Button Group Component
export function ButtonGroup({
  children,
  className = "",
  vertical = false,
  fullWidth = false,
}) {
  return (
    <div
      className={`
        flex ${vertical ? "flex-col" : "flex-row"} 
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

// Icon Button Component
export function IconButton({
  icon,
  onClick = () => {},
  className = "",
  size = "medium",
  variant = "primary",
  disabled = false,
  loading = false,
  ...props
}) {
  const sizes = {
    small: "w-8 h-8 text-sm",
    medium: "w-12 h-12 text-base",
    large: "w-16 h-16 text-lg",
  };

  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    outline: "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
  };

  const buttonClasses = `
    rounded-full flex items-center justify-center
    transition-all duration-200 hover:shadow-lg
    transform hover:-translate-y-0.5 active:translate-y-0
    disabled:opacity-50 disabled:cursor-not-allowed
    ${sizes[size] || sizes.medium}
    ${variants[variant] || variants.primary}
    ${className}
  `;

  const IconComponent = () => {
    if (typeof icon === "string") {
      return <span className="text-xl">{icon}</span>;
    }
    return icon;
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={buttonClasses}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <IconComponent />
      )}
    </button>
  );
}

// Floating Action Button
export function FAB({
  icon,
  onClick = () => {},
  className = "",
  position = "bottom-right",
  label = "",
  ...props
}) {
  const positions = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6",
  };

  const buttonClasses = `
    fixed ${positions[position] || positions["bottom-right"]}
    w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-blue-700
    text-white shadow-2xl hover:shadow-3xl
    flex items-center justify-center
    transition-all duration-200 transform hover:scale-110
    hover:from-blue-700 hover:to-blue-800
    active:scale-95 z-50
    ${className}
  `;

  const IconComponent = () => {
    if (typeof icon === "string") {
      return <span className="text-2xl">{icon}</span>;
    }
    return icon;
  };

  return (
    <button onClick={onClick} className={buttonClasses} {...props}>
      <IconComponent />
      {label && (
        <span className="sr-only">{label}</span>
      )}
    </button>
  );
}

// Split Button Component
export function SplitButton({
  mainText,
  dropdownItems = [],
  onClick = () => {},
  className = "",
  variant = "primary",
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);

  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
  };

  const baseClasses = `
    flex items-center divide-x divide-white/30
    rounded-xl overflow-hidden shadow-lg hover:shadow-xl
    transition-all duration-200
    ${variants[variant] || variants.primary}
    ${className}
  `;

  return (
    <div className="relative inline-flex">
      <div className={baseClasses}>
        <button
          onClick={onClick}
          className="px-6 py-3 font-semibold hover:bg-opacity-90 transition-colors"
          {...props}
        >
          {mainText}
        </button>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-3 py-3 hover:bg-opacity-90 transition-colors"
          aria-label="More options"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
      </div>

      {isOpen && dropdownItems.length > 0 && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
          {dropdownItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.onClick?.();
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              {item.icon && <span>{item.icon}</span>}
              {item.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}