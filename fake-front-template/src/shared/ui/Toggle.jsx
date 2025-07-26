// src/shared/ui/Toggle.jsx
const Toggle = ({ enabled, onChange, label }) => {
  return (
    <div className="flex items-center justify-between">
      {label && (
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
      )}
      <button
        type="button"
        onClick={onChange}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full transition-colors
          ${enabled ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"}
        `}
      >
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white transition-transform
            ${enabled ? "translate-x-6" : "translate-x-1"}
          `}
        />
      </button>
    </div>
  );
};

export default Toggle;
