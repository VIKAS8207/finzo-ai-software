export default function MinimalInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  maxLength,
  className = "",
  containerClassName = "",
  actionButton = null,
  autoFocus = false
}) {
  return (
    <div className={`relative ${containerClassName}`}>
      <div className="flex justify-between items-end mb-1">
        <label className="block text-xs font-medium text-finzo-white/50 uppercase tracking-widest">
          {label}
        </label>
        {actionButton}
      </div>
      <input
        type={type}
        required={required}
        autoFocus={autoFocus}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        className={`w-full bg-transparent border-0 border-b border-finzo-white/20 px-0 py-2 text-base text-finzo-white placeholder-finzo-white/20 focus:outline-none focus:border-finzo-primary transition-colors rounded-none ${className}`}
      />
    </div>
  );
}