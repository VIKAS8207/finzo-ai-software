export default function MinimalSelect({
  label,
  value,
  onChange,
  required = false,
  options = [],
  placeholder = "Select..."
}) {
  return (
    <div className="relative">
      <label className="block text-xs font-medium text-finzo-white/50 mb-1 uppercase tracking-widest">
        {label}
      </label>
      <select
        required={required}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent border-0 border-b border-finzo-white/20 px-0 py-2 text-base text-finzo-white focus:outline-none focus:border-finzo-primary transition-colors appearance-none cursor-pointer rounded-none"
      >
        <option value="" disabled className="bg-black text-finzo-white/50">
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#0a0a0a]">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}