import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import premiumApi from '../src/util/premiumAPI';
import { error } from 'console';

export default function ResetPassword() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField
  } = useForm();

  async function onSubmit(data) {
    if (data.newPassword !== data.confirmNewPassword) {
      toast.error(t('form-validation.passwords-must-match'));
      return;
    }

    try {
      const response = await premiumApi.post('/Authentication/resetPassword', {
        email: data.email,
        temporaryPassword: data.temporaryPassword,
        newPassword: data.newPassword,
        confirmNewPassword: data.confirmNewPassword
      });

      if (response.status === 200) {
        // Clear the form inputs
        resetField('email');
        resetField('temporaryPassword');
        resetField('newPassword');
        resetField('confirmNewPassword');
        // Show success toast
        toast.success(t('password-reset-success'), {position:"top-right"});
        // Redirect to login page or another appropriate page
        router.push('/login');
      } else {
        toast.error('Error, try again!', {position:"top-right"});
      }
    } catch (error) {
      console.error('Error:', error);
      // Show error toast
      toast.error(error.response?.data?.detail ||'Error, try again !');
    }
  }

  return (
    <>
      <Layout>
        <section className="section box-login">
          <div className="row align-items-center m-0">
            <div className="col-lg-6">
              <div className="box-login-left">
                <h2 className="color-brand-2 wow animate__animated animate__fadeIn mb-10">
                  {t('reset-password')}
                </h2>
                <div className="box-form-login wow animate__animated animate__fadeIn">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                      <input
                        {...register('email', {
                          required: t('form-validation.email.required'),
                          maxLength: {
                            value: 220,
                            message: t('form-validation.email.maxLength'),
                          },
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: t('form-validation.email.invalid'),
                          },
                        })}
                        className="form-control"
                        type="text"
                        placeholder={t('email-address')}
                      />
                      {errors.email?.message && (
                        <p style={{ marginTop: 10, color: '#FF3E3E' }} role="alert">
                          {errors.email?.message}
                        </p>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        {...register('temporaryPassword', {
                          required: t('form-validation.temporaryPassword.required'),
                        })}
                        className="form-control"
                        type="text"
                        placeholder={t('temporary-password')}
                      />
                      {errors.temporaryPassword?.message && (
                        <p style={{ marginTop: 10, color: '#FF3E3E' }} role="alert">
                          {errors.temporaryPassword?.message}
                        </p>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        {...register('newPassword', {
                          required: t('form-validation.newPassword.required'),
                        })}
                        className="form-control"
                        type="password"
                        placeholder={t('new-password')}
                      />
                      {errors.newPassword?.message && (
                        <p style={{ marginTop: 10, color: '#FF3E3E' }} role="alert">
                          {errors.newPassword?.message}
                        </p>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        {...register('confirmNewPassword', {
                          required: t('form-validation.confirmNewPassword.required'),
                        })}
                        className="form-control"
                        type="password"
                        placeholder={t('confirm-new-password')}
                      />
                      {errors.confirmNewPassword?.message && (
                        <p style={{ marginTop: 10, color: '#FF3E3E' }} role="alert">
                          {errors.confirmNewPassword?.message}
                        </p>
                      )}
                    </div>
                    <div className="form-group mt-30">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="box-button-form-login">
                          <input
                            className="btn btn-brand-1-big mr-20"
                            type="submit"
                            value={t('submit')}
                          />
                        </div>
                        <div className="box-text-form-login">
                          <span className="font-xs color-grey-500">
                            {t('already-have-an-account')}
                          </span>
                          <Link className="font-xs color-brand-2" href="/login">
                            {t('sign-in')}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="box-login-right">
                {/* Additional content or images can be added here */}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  };
}
