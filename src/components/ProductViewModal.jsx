import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from '@headlessui/react';
import { Divider } from '@mui/material';
import Status from './shared/Status';
import { MdDone, MdClose } from 'react-icons/md';

function ProductViewModal({ isOpen, setIsOpen, product, isAvailable }) {
	const {
		productId,
		productName,
		image,
		description,
		quantity,
		price,
		discount,
		specialPrice,
	} = product;

	function closeDialog() {
		setIsOpen(false);
	}

	return (
		<>
			<Dialog
				open={isOpen}
				as="div"
				className="relative z-10"
				onClose={closeDialog}>
				<DialogBackdrop className="fixed inset-0 bg-black/45" />
				<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4">
						<DialogPanel
							transition
							className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all md:max-w-[620px] md:min-w-[620px] w-full">
							{image && (
								<div className="flex justify-center">
									<img
										className="w-full cursor-pointer transitioan-transform duration-300"
										src={image}
										alt={productName}
									/>
								</div>
							)}

							<div className="px-6 pt-10 pb-2">
								<DialogTitle
									as="h3"
									className="lg:text-3xl sm:text-2xl text-xl font-semibold leading-6 text-gray-800 mb-4">
									{productName}
								</DialogTitle>
							</div>

							<div className="flex justify-between items-center mx-4">
								{specialPrice ? (
									<>
										<div className="flex flex-row">
											<span className="text-gray-500 line-through mb-1 p-1">
												${price.toFixed(2)}
											</span>
											<span className="text-xl font-bold text-indigo-600 p-1">
												${specialPrice.toFixed(2)}
											</span>
										</div>
										<span className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded">
											{discount}% OFF
										</span>
									</>
								) : (
									<span className="text-xl font-medium text-gray-800 p-1">
										${price ? price.toFixed(2) : '0.00'}
									</span>
								)}

								{isAvailable ? (
									<>
										<Status
											text="In Stock"
											icon={MdDone}
											bg="bg-teal-200"
											color="text-teal-900"
										/>
									</>
								) : (
									<>
										<Status
											text="Out of Stock"
											icon={MdClose}
											bg="bg-rose-200"
											color="text-rose-900"
										/>
									</>
								)}
							</div>

							<Divider />
							<p className="mt-2 text-sm/6 text-/50 m-4">{description}</p>

							<div className="px-6 py-4 flex justify-end gap-4">
								<button
									onClick={closeDialog}
									type="button"
									className="px-4 py-2 text-sm fond-semibold text-white bg-red-500 hover:bg-red-600 m-1">
									Close
								</button>
							</div>
						</DialogPanel>
					</div>
				</div>
			</Dialog>
		</>
	);
}

export default ProductViewModal;

// https://headlessui.com/react/dialog
