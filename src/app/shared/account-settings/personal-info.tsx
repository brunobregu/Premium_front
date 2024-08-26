'use client';

import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { SubmitHandler, Controller } from 'react-hook-form';
import { PiClock, PiEnvelopeSimple } from 'react-icons/pi';
import { Form } from '@ui/form';
import { Loader, Text, Input } from 'rizzui';
import FormGroup from '@/app/shared/form-group';
import FormFooter from '@components/form-footer';
import {
  defaultValues,
  personalInfoFormSchema,
  PersonalInfoFormTypes,
} from '@/validators/personal-info.schema';
import UploadZone from '@ui/file-upload/upload-zone';
import { countries, roles, timezones } from '@/data/forms/my-details';
import AvatarUpload from '@ui/file-upload/avatar-upload';
import { useEffect, useState } from 'react';
import premiumApi from '@/util/premiumAPI';
import { useTranslation } from 'react-i18next';

const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
  loading: () => (
    <div className="grid h-10 place-content-center">
      <Loader variant="spinner" />
    </div>
  ),
});

const QuillEditor = dynamic(() => import('@ui/quill-editor'), {
  ssr: false,
});

export default function PersonalInfoView() {
  const { i18n } = useTranslation();
  const [data, setData] = useState<any>();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await premiumApi.get('en/User/personalData');

        if (response.status === 200) {
          // Clear the email input
          setData(response.data)
          // Show success toast
          toast.success(i18n.t('password-reset-link-sent'), { position: "top-right" });
        } else {

          toast.error("Error, try again!", { position: "top-right" })
        }
      } catch (error) {


      }
    }
    getData();
  }, [])

  console.log('data', data)
  const onSubmit: SubmitHandler<PersonalInfoFormTypes> = (data) => {
    toast.success(<Text as="b">Successfully added!</Text>);
  };



  const createdOnDate = new Date(data.createdOn);
  const day = createdOnDate.getDate().toString().padStart(2, '0');
  const month = (createdOnDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
  const year = createdOnDate.getFullYear();
  // Convert to a readable format: day/month/year
  const formattedDate = `${day}/${month}/${year} ${createdOnDate.toLocaleTimeString()}`;


  return (
    <Form<PersonalInfoFormTypes>
      validationSchema={personalInfoFormSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
        defaultValues,
      }}
    >
      {({ register, control, setValue, getValues, formState: { errors } }) => {
        return (
          <>
            <FormGroup
              title="Personal Info"
              //description="Update your photo and personal details here"
              className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            />

            <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
              <FormGroup
                title="Name"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Input
                  placeholder={data?.firstName || 'Not avaible'}
                  {...register('first_name')}
                  error={errors.first_name?.message}
                  className="flex-grow"
                  disabled
                />
                <Input
                  placeholder={data?.lastName || 'Not avaible'}
                  {...register('last_name')}
                  error={errors.last_name?.message}
                  className="flex-grow"
                  disabled
                />
              </FormGroup>

              <FormGroup
                title="Email Address"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Input
                  className="col-span-full"
                  prefix={
                    <PiEnvelopeSimple className="h-6 w-6 text-gray-500" />
                  }
                  type="email"
                  placeholder={data?.email || 'Not avaible'}
                  {...register('email')}
                  error={errors.email?.message}
                  disabled
                />
              </FormGroup>

              <FormGroup
                title="Phone"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Input
                  placeholder={data?.phoneNumber || 'No number avaible'}
                  {...register('last_name')}
                  error={errors.last_name?.message}
                  className="flex-grow"
                  disabled
                />
              </FormGroup>

              <FormGroup
                title="Creation Time"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Input
                  placeholder={formattedDate || 'Not avaible'}
                  {...register('last_name')}
                  error={errors.last_name?.message}
                  className="flex-grow"
                  disabled
                />
              </FormGroup>

              {/* <FormGroup
                title="Timezone"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Controller
                  control={control}
                  name="timezone"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      dropdownClassName="!z-10"
                      inPortal={false}
                      prefix={<PiClock className="h-6 w-6 text-gray-500" />}
                      placeholder="Select Timezone"
                      options={timezones}
                      onChange={onChange}
                      value={value}
                      className="col-span-full"
                      getOptionValue={(option) => option.value}
                      displayValue={(selected) =>
                        timezones?.find((tmz) => tmz.value === selected)
                          ?.label ?? ''
                      }
                      error={errors?.timezone?.message as string}
                    />
                  )}
                />
              </FormGroup> */}

            </div>

            {/* <FormFooter
              // isLoading={isLoading}
              altBtnText="Back"
              // submitBtnText="Save"
            /> */}
          </>
        );
      }}
    </Form>
  );
}
