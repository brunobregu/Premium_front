'use client';

import { useState } from 'react';
import { FormProvider, Controller, useForm } from 'react-hook-form';
import { CreateShipmentInput } from '@/validators/create-shipping.schema';
import { useLayout } from '@/layouts/use-layout';
import { Select, Input, Button } from 'rizzui';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';

// export default function MyDetails() {
//   const { layout } = useLayout();
//   const [isLoading, setLoading] = useState(false);
//   const [isModalOpen, setModalOpen] = useState(false);

//   return (
//     <div className="@container">
//           <h3>Vehicle</h3>
//           <hr />
//           <div className="mb-4 mt-4 grid grid-cols-4 gap-4">
//             <Input
//               label="VIN"
//               placeholder="vin"
//               labelClassName="font-medium text-gray-900"
//               {...register('vin')}
//             />
//             <Input
//               label="Make"
//               placeholder="make"
//               labelClassName="font-medium text-gray-900"
//               {...register('make')}
//               error={errors.make?.message as string}
//             />
//             <Input
//               label="Model"
//               placeholder="model"
//               labelClassName="font-medium text-gray-900"
//               {...register('model')}
//               error={errors.model?.message as string}
//             />
//             <Input
//               label="Year"
//               placeholder="year"
//               labelClassName="font-medium text-gray-900"
//               type="number"
//               {...register('year', { valueAsNumber: true })}
//               error={errors.year?.message as string}
//             />
//           </div>

//           <h3>Shipment details</h3>
//           <hr />
//           <div className="mb-4 mt-4 grid grid-cols-4 gap-4">
//             <Input
//               label="Lot"
//               placeholder="lot"
//               labelClassName="font-medium text-gray-900"
//               type="number"
//               {...register('lot', { valueAsNumber: true })}
//               error={errors.lot?.message as string}
//             />
//             <Input
//               label="Order ID"
//               placeholder="order id"
//               labelClassName="font-medium text-gray-900"
//               {...register('dspOrderID')}
//               error={errors.dspOrderID?.message as string}
//             />
//             <Input
//               label="Auction"
//               placeholder="auction"
//               labelClassName="font-medium text-gray-900"
//               {...register('auction')}
//               error={errors.auction?.message as string}
//             />
//             <Controller
//               control={control}
//               name="carStatus"
//               render={({ field: { value, onChange } }) => (
//                 <Select
//                   label="Car Status"
//                   labelClassName="text-gray-900"
//                   dropdownClassName="p-2 gap-1 grid !z-10"
//                   inPortal={false}
//                   value={value || null}
//                   onChange={onChange}
//                   options={carStatusArray}
//                   getOptionValue={(option) => option.value}
//                   displayValue={(selected) =>
//                     carStatusArray?.find((c) => c.value === selected)?.label ?? ''
//                   }
//                   error={errors?.carStatus?.message as string}
//                 />
//               )}
//             />
//             <Controller
//               control={control}
//               name="port"
//               render={({ field: { value, onChange } }) => (
//                 <Select
//                   label="Port"
//                   labelClassName="text-gray-900"
//                   dropdownClassName="p-2 gap-1 grid !z-10"
//                   inPortal={false}
//                   value={value || null}
//                   onChange={onChange}
//                   options={portOptions}
//                   getOptionValue={(option) => option.value}
//                   displayValue={(selected) =>
//                     portOptions.find((c) => c.value === selected)?.label ?? ''
//                   }
//                   error={errors?.port?.message as string}
//                 />
//               )}
//             />
//           </div>

//           <h3>Client Total</h3>
//           <hr />
//           <div className="mb-4 mt-4 grid grid-cols-4 gap-4">
//           <Input
//               label="Inland Price"
//               placeholder="inland price"
//               labelClassName="font-medium text-gray-900"
//               type="number"
//               {...register('inlandPrice', { valueAsNumber: true })}
//               error={errors.inlandPrice?.message as string}
//             />
//             <Input
//               label="Ocean Price"
//               placeholder="ocean price"
//               labelClassName="font-medium text-gray-900"
//               type="number"
//               {...register('oceanPrice', { valueAsNumber: true })}
//               error={errors.oceanPrice?.message as string}
//             />
//             <Input
//               label="Broker"
//               placeholder="broker"
//               labelClassName="font-medium text-gray-900"
//               type="number"
//               {...register('broker', { valueAsNumber: true })}
//               error={errors.broker?.message as string}
//             />
//             <Input
//               label="Storage"
//               placeholder="storage"
//               labelClassName="font-medium text-gray-900"
//               type="number"
//               {...register('storage', { valueAsNumber: true })}
//               error={errors.storage?.message as string}
//             />
//           </div>

//           <h3>Total Cost</h3>
//           <hr />
//           <div className="mb-4 mt-4 grid grid-cols-4 gap-4">
//             <Input
//               label="Inland Cost"
//               placeholder="inland cost"
//               labelClassName="font-medium text-gray-900"
//               type="number"
//               {...register('inlandCost', { valueAsNumber: true })}
//               error={errors.inlandCost?.message as string}
//             />
//             <Input
//               label="Ocean Cost"
//               placeholder="ocean cost"
//               labelClassName="font-medium text-gray-900"
//               type="number"
//               {...register('oceanCost', { valueAsNumber: true })}
//               error={errors.oceanCost?.message as string}
//             />
//           </div>

//           <h3>Payment info</h3>
//           <hr />
//           <div className="mb-4 mt-4 grid grid-cols-4 gap-4">
//             <Controller
//               control={control}
//               name="paymentStatus"
//               render={({ field: { value, onChange } }) => (
//                 <Select
//                   label="Payment Status"
//                   labelClassName="text-gray-900"
//                   dropdownClassName="p-2 gap-1 grid !z-10"
//                   inPortal={false}
//                   value={value || null}
//                   onChange={onChange}
//                   options={paymentStatusArray}
//                   getOptionValue={(option) => option.value}
//                   displayValue={(selected) =>
//                     paymentStatusArray?.find((c) => c.value === selected)?.label ?? ''
//                   }
//                   error={errors?.paymentStatus?.message as string}
//                 />
//               )}
//             />
//             {methods.watch('paymentStatus') === 'Partly Paid' && (
//               <Input
//                 label="Partly Paid Amount"
//                 placeholder="0"
//                 labelClassName="font-medium text-gray-900"
//                 type="number"
//                 {...register('partlyPaid', { valueAsNumber: true })}
//                 error={errors.partlyPaid?.message as string}
//               />
//             )}
//             <Controller
//               control={control}
//               name="userId"
//               render={({ field: { value, onChange } }) => (
//                 <div className="flex items-center gap-2">
//                   <Select
//                     label="User"
//                     labelClassName="text-gray-900"
//                     dropdownClassName="p-2 gap-1 grid !z-10"
//                     inPortal={false}
//                     value={value || null}
//                     onChange={onChange}
//                     options={userOptions}
//                     getOptionValue={(option) => option.value}
//                     displayValue={(selected) =>
//                       userOptions?.find((c: any) => c.value === selected)?.label ?? ''
//                     }
//                     error={errors?.userId?.message as string}
//                   />
//                 </div>
//               )}
//             />
//             <div className="flex flex-row mt-auto items-baseline gap-2">
//               <Button type="button" onClick={() => setModalOpen(true)}>
//                 Add Client
//               </Button>
//             </div>

//           </div>

//           <Button type="submit" isLoading={(addOrderDetailsMutation as any).isLoading} className="w-full @xl:w-auto">
//             {id ? 'Save Changes' : 'Create Shipment'}
//           </Button>
        
      

//       <CreateUserModal
//         isOpen={isModalOpen}
//         onRequestClose={() => setModalOpen(false)}
//         onSuccess={handleModalSuccess}
//       />
//     </div>
//   );
// }
