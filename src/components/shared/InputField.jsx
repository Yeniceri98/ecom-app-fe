const InputField = ({
	id,
	label,
	placeholder,
	message,
	type,
	register,
	errors,
	required,
	className,
	min,
	value,
}) => {
	return (
		<div className="flex flex-col gap-1 w-full">
			<label
				htmlFor={id}
				className={`${className ? className : ''} font-semibold text-sm`}>
				{label}
			</label>
			<input
				type={type}
				id={id}
				placeholder={placeholder}
				min={min}
				value={value}
				{...register(id, {
					required: required && `${label} is required`,
					message: message,
					minLength: min
						? { value: min, message: `Minimum ${min} characters is required` }
						: null,
					pattern:
						type === 'email'
							? {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: 'Invalid email format',
							  }
							: type === 'url'
							? {
									value:
										/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
									message: 'Invalid URL format',
							  }
							: null,
				})}
				className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
			{errors && errors[id] && (
				<span className="text-red-500 text-sm">{errors[id].message}</span>
			)}
		</div>
	);
};
export default InputField;
