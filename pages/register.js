import Layout from '@/components/layout/Layout';
import Brand1Slider from '@/components/slider/Brand1Slider';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import premiumApi from '../src/util/premiumAPI';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { serialize } from 'cookie';
import { useRouter } from 'next/router';

export default function Register() {
  const router = useRouter();
  const [errorText, setErrorText]=useState('')
  const { t } = useTranslation('common');
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setError: setFormError,
    reset
  } = useForm();
  const [loadingRegister, setLoadingRegister] = useState(false);

  async function onSubmit(data) {
    try {
      setLoadingRegister(true);
    const { firstName, lastName, email, phoneNumber, password } = data;

    const payload = {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    };
    const registerResponse = await premiumApi.post('/Authentication/register', payload);

    if (registerResponse.status ) {
      reset();
      toast.success('User created', {
        position: 'top-right',
      });
    }

    const loginResponse = await premiumApi.post('/Authentication/login', {
      email: data.email,
      password: data.password,
    });

    const cookie = serialize('session', loginResponse.data.token, {
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 7, // One week
      path: '/',
    });
    document.cookie = cookie;

   if (loginResponse.status){
    const { role } = loginResponse.data;
    if (localStorage) {
    localStorage.setItem('userRole', role)
   }
   router.push('/logistics/shipments');
 }

    
    } catch (error) {
      setErrorText(error.response?.data?.detail || 'An error occurred while submitting the form');
      console.log(error);
      if (error.config?.url === '/Authentication/register') {
        toast.error(error.response?.data?.detail || 'An error occurred while submitting the form', {
          position: 'top-right',
        });
      }
    } finally {
      setLoadingRegister(false);
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
                  Create an account
                </h2>
                {/* <p className="font-md color-grey-500 wow animate__animated animate__fadeIn">
                  Describe yourself as clearly so that there are no mistakes
                </p> */}
                {/* <div className="box-btn-signin mt-55"><Link className="btn btn-signin mb-10 wow animate__animated animate__fadeIn" href="#"><img src="/assets/imgs/page/login/Google.svg" alt="Transp" />Sign up with Google</Link><Link className="btn btn-signin wow animate__animated animate__fadeIn" href="#"><img src="/assets/imgs/page/login/apple.svg" alt="Transp" />Sign up with Apple ID</Link></div> */}
                <div className="box-or-login">
                  <span className="text-or font-xs color-grey-500 wow animate__animated animate__fadeIn">
                    Premium Logistics
                  </span>
                </div>
                <div className="box-form-login wow animate__animated animate__fadeIn">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            {...register('firstName', {
                              required: t('form-validation.firstName.required'),
                              maxLength: {
                                value: 220,
                                message: t(
                                  'form-validation.firstName.maxLength'
                                ),
                              },
                              minLength: {
                                value: 4,
                                message: t(
                                  'form-validation.firstName.minLength'
                                ),
                              },
                            })}
                            className="form-control"
                            type="text"
                            placeholder={t('firstName')}
                          />

                          {errors.firstName?.message && (
                            <p
                              style={{ marginTop: 10, color: '#FF3E3E' }}
                              role="alert"
                            >
                              {errors.firstName?.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            {...register('lastName', {
                              required: t('form-validation.lastName.required'),
                              maxLength: {
                                value: 220,
                                message: t(
                                  'form-validation.lastName.maxLength'
                                ),
                              },
                              minLength: {
                                value: 4,
                                message: t(
                                  'form-validation.lastName.minLength'
                                ),
                              },
                            })}
                            className="form-control"
                            type="text"
                            placeholder={t('lastName')}
                          />

                          {errors.lastName?.message && (
                            <p
                              style={{ marginTop: 10, color: '#FF3E3E' }}
                              role="alert"
                            >
                              {errors.lastName?.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <Controller
                            name="phoneNumber"
                            control={control}
                            rules={{
                              validate: (value) =>
                                isValidPhoneNumber(value ?? ''),
                            }}
                            render={({ field }) => (
                              <PhoneInput
                                {...field}
                                defaultCountry="AL"
                                id="phoneNumber"
                                className="form-control"
                                numberInputProps={{
                                  className: 'form-control',
                                }}
                                placeholder="Phone Number *"
                              />
                            )}
                          />
                          {errors['phoneNumber'] && (
                            <p
                              style={{ marginTop: 10, color: '#FF3E3E' }}
                              role="alert"
                            >
                              {t('form-validation.phoneNumber')}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            {...register('email', {
                              required: t('form-validation.email.required'),
                              maxLength: {
                                value: 220,
                                message: t('form-validation.email.maxLength'),
                              },
                              pattern: {
                                value:
                                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: t('form-validation.email.invalid'),
                              },
                            })}
                            className="form-control"
                            type="text"
                            placeholder={t('email-address') + '*'}
                          />
                          {errors.email?.message && (
                            <p
                              style={{ marginTop: 10, color: '#FF3E3E' }}
                              role="alert"
                            >
                              {errors.email?.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            {...register('password', {
                              required: t('form-validation.password.required'),
                              maxLength: {
                                value: 220,
                                message: t(
                                  'form-validation.password.maxLength'
                                ),
                              },
                              minLength: {
                                value: 4,
                                message: t(
                                  'form-validation.password.minLength'
                                ),
                              },
                            })}
                            className="form-control"
                            type="password"
                            placeholder={t('enter-your-password') + '*'}
                          />
                          {errors.email?.message && (
                            <p
                              style={{ marginTop: 10, color: '#FF3E3E' }}
                              role="alert"
                            >
                              {errors.password?.message}

                            </p>
                          )}
                         {/* <span className='text-red-600'>*{errorText}</span>  */}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <div className="box-remember">
                            {/* <label
                              className="font-xs color-grey-900"
                              htmlFor="rememberme"
                            >
                              <input id="rememberme" type="checkbox" />
                              By clicking Register button, you agree our terms
                              and policy,
                            </label> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group mt-30">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="box-button-form-login">
                          <input
                            disabled={loadingRegister}
                            className="btn btn-brand-1-big mr-20"
                            type="submit"
                            defaultValue="Create Account"
                          />
                        </div>
                        <div className="box-text-form-login">
                          <span className="font-xs color-grey-500">
                            Already have an account?
                          </span>
                          <Link className="font-xs color-brand-2" href="/login">
                            Sign In
                          </Link>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="box-login-right box-register-right">
                {/* <div className="quote-shape shape-1" /> */}
                <div className="box-info-bottom-img-3">
                  <div className="box-info-3-bottom">
                    <h3 className="color-brand-2 wow animate__animated animate__fadeIn mb-10">
                      Warehousing
                    </h3>
                    <p className="font-sm color-grey-900 wow animate__animated animate__fadeIn">
                      We are professional in ocean freight with more than 12
                      years of experience and have shipped more than 100k
                      shipments.
                    </p>
                    <div className="mt-30 wow animate__animated animate__fadeIn">
                      <Link
                        className="btn btn-link font-sm color-brand-2"
                        href="#"
                      >
                        View Details
                        <span>
                          <svg
                            className="icon-16 h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="section bg-2 pt-65 pb-35">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-3 mb-30 text-lg-start wow animate__animated animate__fadeIn text-center">
                <p className="font-2xl-bold color-brand-2">
                  We are<span className="color-brand-1"> trusted</span> by major
                  global brands
                </p>
              </div>
              <div className="col-lg-9 mb-30">
                <div className="box-swiper">
                  <div className="swiper-container swiper-group-6 pb-0">
                    <Brand1Slider />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Toaster />
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
