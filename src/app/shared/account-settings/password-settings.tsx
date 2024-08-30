'use client';

import { useState } from 'react';
import { SubmitHandler, Controller } from 'react-hook-form';
import { PiDesktop } from 'react-icons/pi';
import { Form } from '@ui/form';
import { Button, Password, Title, Text } from 'rizzui';
import cn from '@utils/class-names';
import { ProfileHeader } from '@/app/shared/account-settings/profile-settings';
import HorizontalFormBlockWrapper from '@/app/shared/account-settings/horiozontal-block';
import {
  passwordFormSchema,
  PasswordFormTypes,
} from '@/validators/password-settings.schema';
import toast from 'react-hot-toast';
import premiumApi from '@/util/premiumAPI';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useFiltersContext } from '@/store/state';

export default function PasswordSettingsView({
  settings
}: {
  settings?: PasswordFormTypes
}) {
  const [isLoading, setLoading] = useState(false);
  const [reset, setReset] = useState({});
  const router = useRouter(); // Correct usage inside a component
  const { i18n } = useTranslation();
  const { lang, setLang } = useFiltersContext();


  const onSubmit: SubmitHandler<PasswordFormTypes> = async (data) => {
    setLoading(true);
    try {
      const response = await premiumApi.post(`${lang}/Authentication/changePassword`, {
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmedPassword,
      });
      if (response.status === 200) {
        setReset({
          currentPassword: '',
          newPassword: '',
          confirmedPassword: '',
        });

        toast.success(i18n.t(('password.success')), { position: "top-right" })
      }
    } catch (error: any) {
      if (error) {
        toast.error(error.response?.data?.detail || i18n.t('form-validation.error'), { position: "top-right" });
      } else {
        toast.error(error.response?.data?.detail || i18n.t('form-validation.error'), { position: "top-right" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form<PasswordFormTypes>
        validationSchema={passwordFormSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        className="@container"
        useFormProps={{
          mode: 'onChange',
          defaultValues: {
            ...settings,
          },
        }}
      >
        {({ register, control, formState: { errors }, getValues }) => {
          return (
            <>
              <ProfileHeader
                title="Olivia Rhye"
                description="olivia@example.com"
              />

              <div className="mx-auto w-full max-w-screen-2xl">
                <HorizontalFormBlockWrapper
                  title={i18n.t('password.current')}
                  titleClassName="text-base font-medium"
                >
                  <Password
                    {...register('currentPassword')}
                    placeholder={i18n.t('password.enter')}
                    error={errors.currentPassword?.message}
                  />
                </HorizontalFormBlockWrapper>

                <HorizontalFormBlockWrapper
                  title={i18n.t('password.new')}
                  titleClassName="text-base font-medium"
                >
                  <Controller
                    control={control}
                    name="newPassword"
                    render={({ field: { onChange, value } }) => (
                      <Password
                        placeholder={i18n.t('password.enter')}
                        helperText={
                          getValues().newPassword.length < 8 &&
                          i18n.t('password.validation.length')
                        }
                        onChange={onChange}
                        error={errors.newPassword?.message}
                      />
                    )}
                  />
                </HorizontalFormBlockWrapper>

                <HorizontalFormBlockWrapper
                  title={i18n.t('password.confirm')}
                  titleClassName="text-base font-medium"
                >
                  <Controller
                    control={control}
                    name="confirmedPassword"
                    render={({ field: { onChange, value } }) => (
                      <Password
                        placeholder={i18n.t('password.enter')}
                        onChange={onChange}
                        error={errors.confirmedPassword?.message}
                      />
                    )}
                  />
                </HorizontalFormBlockWrapper>

                <div className="mt-6 flex w-auto items-center justify-end gap-3">
                  <Button type="button" variant="outline">
                    {i18n.t('password.actions.cancel')}
                  </Button>
                  <Button type="submit" variant="solid" isLoading={isLoading}>
                    {i18n.t('password.actions.update')}
                  </Button>
                </div>
              </div>
            </>
          );
        }}
      </Form>
      <LoggedDevices className="mt-10" />
    </>
  );
}

// Logged devices
function LoggedDevices({ className }: { className?: string }) {
  return (
    <></>
    // <div className={cn('mx-auto w-full max-w-screen-2xl', className)}>
    //   <div className="border-b border-dashed border-muted">
    //     <Title as="h2" className="mb-3 text-xl font-bold text-gray-900">
    //       Where you’re logged in
    //     </Title>
    //     <Text className="mb-6 text-sm text-gray-500">
    //       We’ll alert you via olivia@untitledui.com if there is any unusual
    //       activity on your account.
    //     </Text>
    //   </div>
    //   <div className="flex items-center gap-6 border-b border-dashed border-muted py-6">
    //     <PiDesktop className="h-7 w-7 text-gray-500" />
    //     <div>
    //       <div className="mb-2 flex items-center gap-2">
    //         <Title
    //           as="h3"
    //           className="text-base font-medium text-gray-900 dark:text-gray-700"
    //         >
    //           2018 Macbook Pro 15-inch
    //         </Title>
    //         <Text
    //           as="span"
    //           className="relative hidden rounded-md border border-muted py-1.5 pe-2.5 ps-5 text-xs font-semibold text-gray-900 before:absolute before:start-2.5 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:bg-green sm:block"
    //         >
    //           Active Now
    //         </Text>
    //       </div>
    //       <div className="flex items-center gap-2">
    //         <Text className="text-sm text-gray-500">Melbourne, Australia</Text>
    //         <span className="h-1 w-1 rounded-full bg-gray-600" />
    //         <Text className="text-sm text-gray-500">22 Jan at 4:20pm</Text>
    //       </div>
    //       <Text
    //         as="span"
    //         className="relative mt-2 inline-block rounded-md border border-muted py-1.5 pe-2.5 ps-5 text-xs font-semibold text-gray-900 before:absolute before:start-2.5 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:bg-green sm:hidden"
    //       >
    //         Active Now
    //       </Text>
    //     </div>
    //   </div>
    //   <div className="flex items-center gap-6 py-6">
    //     <PiDesktop className="h-7 w-7 text-gray-500" />
    //     <div>
    //       <Title
    //         as="h3"
    //         className="mb-2 text-base font-medium text-gray-900 dark:text-gray-700"
    //       >
    //         2020 Macbook Air M1
    //       </Title>
    //       <div className="flex items-center gap-2">
    //         <Text className="text-sm text-gray-500">Melbourne, Australia</Text>
    //         <span className="h-1 w-1 rounded-full bg-gray-600" />
    //         <Text className="text-sm text-gray-500">22 Jan at 4:20pm</Text>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}


export async function getServerSideProps(context: any) {
  const locale = context.locale || 'en'; // Default to 'en' if locale is undefined

  return {
    props: {
      locale,
      // other props
    },
  };
}
