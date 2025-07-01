import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { FaTimes } from 'react-icons/fa';

const AddressInfoModal = ({ open, setOpen, children }) => {
	return (
		<Dialog open={open} onClose={() => setOpen(false)} className="relative z-5">
			<DialogBackdrop className="fixed inset-0 bg-black/30" />
			<div className="fixed inset-0 flex w-screen items-center justify-center p-4 mt-24">
				<DialogPanel className="max-w-lg space-y-4 border bg-white p-12 relative">
					<div className="flex justify-center">{children}</div>
					<div className="absolute top-4 right-4">
						<button onClick={() => setOpen(false)}>
							<FaTimes />
						</button>
					</div>
				</DialogPanel>
			</div>
		</Dialog>
	);
};

export default AddressInfoModal;
