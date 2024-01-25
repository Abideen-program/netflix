interface InputProps {
  id: string;
  onChange: any;
  value: string;
  label: string;
  type?: string;
}

const Input = ({ id, onChange, value, label, type }: InputProps) => {
  return (
    <div className="relative">
      <input
        onChange={onChange}
        value={value}
        type={type}
        id={id}
        className="
      block
      w-full
      rounded-md
      px-6
      pt-6
      pb-1
      bg-neutral-700
      text-white
      text-md
      focus:outline-none
      focus:ring-0
      appearance-none
      peer
      "
        placeholder=" "
      />

      <label
        htmlFor={id}
        className="
        absolute
        top-4
        left-6
        text-zinc-400
        text-md
        -translate-y-3
        transform
        duration-150
        scale-75
        z-10
        origin-[0]
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-3
      "
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
