import { inputCls } from "../config/applicationConfig";
import { displayValue, toInputDate } from "../utils/applicationUtils";
export default function ApplicationField({ field, value, edit, onChange }) {
  const { label, type = "text", options = [], required } = field;

  if (!edit) {
    return (
      <div>
        {" "}
        <dt className="text-xs font-medium text-slate-500">{label}</dt>{" "}
        <dd className="mt-0.5 text-sm text-slate-900">
          {displayValue(value, type)}{" "}
        </dd>{" "}
      </div>
    );
  }

  const id = `f-${field.path}`;
  const commonProps = {
    id,
    className: inputCls,
    value: value ?? "",
    onChange: (event) => onChange(event.target.value),
  };

  let control;

  if (type === "select") {
    control = (
      <select {...commonProps}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option || "None"}{" "}
          </option>
        ))}{" "}
      </select>
    );
  } else if (type === "dateObj") {
    control = (
      <input
        id={id}
        type="date"
        className={inputCls}
        value={toInputDate(value)}
        onChange={(event) =>
          onChange(
            event.target.value
              ? new Date(`${event.target.value}T00:00:00`)
              : null,
          )
        }
      />
    );
  } else {
    control = (
      <input
        {...commonProps}
        type={{ date: "date", time: "time", email: "email" }[type] ?? "text"}
      />
    );
  }

  return (
    <div>
      {" "}
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium text-slate-700"
      >
        {label}
        {required && <span className="text-rose-600"> *</span>}{" "}
      </label>
      {control}
    </div>
  );
}
