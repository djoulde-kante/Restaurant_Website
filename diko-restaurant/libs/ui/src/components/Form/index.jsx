import React from 'react';
import Button from '../Button';

export const FormGroup = ({ children, error, label, htmlFor, required }) => {
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={htmlFor}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export const Input = React.forwardRef(({
  error,
  label,
  type = 'text',
  required,
  className = '',
  ...props
}, ref) => {
  return (
    <FormGroup
      error={error}
      label={label}
      htmlFor={props.id || props.name}
      required={required}
    >
      <input
        ref={ref}
        type={type}
        required={required}
        className={`
          block w-full rounded-md border-gray-300 shadow-sm
          focus:border-restaurant focus:ring-restaurant sm:text-sm
          ${error ? 'border-red-300' : ''}
          ${className}
        `}
        {...props}
      />
    </FormGroup>
  );
});

Input.displayName = 'Input';

export const Select = React.forwardRef(({
  error,
  label,
  options = [],
  required,
  className = '',
  placeholder,
  ...props
}, ref) => {
  return (
    <FormGroup
      error={error}
      label={label}
      htmlFor={props.id || props.name}
      required={required}
    >
      <select
        ref={ref}
        required={required}
        className={`
          block w-full rounded-md border-gray-300 shadow-sm
          focus:border-restaurant focus:ring-restaurant sm:text-sm
          ${error ? 'border-red-300' : ''}
          ${className}
        `}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FormGroup>
  );
});

Select.displayName = 'Select';

export const Textarea = React.forwardRef(({
  error,
  label,
  required,
  className = '',
  ...props
}, ref) => {
  return (
    <FormGroup
      error={error}
      label={label}
      htmlFor={props.id || props.name}
      required={required}
    >
      <textarea
        ref={ref}
        required={required}
        className={`
          block w-full rounded-md border-gray-300 shadow-sm
          focus:border-restaurant focus:ring-restaurant sm:text-sm
          ${error ? 'border-red-300' : ''}
          ${className}
        `}
        {...props}
      />
    </FormGroup>
  );
});

Textarea.displayName = 'Textarea';

export const Checkbox = React.forwardRef(({
  error,
  label,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          ref={ref}
          type="checkbox"
          className={`
            h-4 w-4 rounded border-gray-300 text-restaurant
            focus:ring-restaurant
            ${error ? 'border-red-300' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      <div className="ml-3 text-sm">
        {label && (
          <label
            htmlFor={props.id || props.name}
            className="font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        {error && (
          <p className="text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export const Form = ({
  onSubmit,
  children,
  submitText = 'Enregistrer',
  cancelText = 'Annuler',
  onCancel,
  isLoading = false,
  error,
  className = ''
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {error && (
        <div className="mb-4 p-4 rounded-md bg-red-50 border border-red-200">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {children}

      <div className="mt-6 flex justify-end space-x-3">
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
          >
            {cancelText}
          </Button>
        )}
        <Button
          type="submit"
          isLoading={isLoading}
        >
          {submitText}
        </Button>
      </div>
    </form>
  );
};