import Layout from '@/components/layout/Layout';
import Brand1Slider from '@/components/slider/Brand1Slider';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { serialize } from 'cookie';
import { useRouter } from 'next/router';
import premiumApi from '../src/util/premiumAPI';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useFiltersContext } from '../src/store/state';


export default function Login() {
  
   const {  i18n } = useTranslation();
  const { locale } = useRouter();
  const router = useRouter()
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError: setFormError,
  } = useForm();
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {lang, setLang} =useFiltersContext();

  async function onSubmit(data) {
    setLoadingLogin(true);
    try {
      const apiResponse = await premiumApi.post( `${lang}/Authentication/login`, {
        email: data.email,
        password: data.password,
      });

      const { role } = apiResponse.data;
      if (localStorage) {
        localStorage.setItem('userRole', role)
      }

      const cookie = serialize('session', apiResponse.data.token, {
        httpOnly: false,
        maxAge: 60 * 60 * 24 * 7, // One week
        path: '/',
      });
      document.cookie = cookie;
      router.push(`/logistics/shipments`);
    } catch (error) {
      setLoadingLogin(false);
      if (error.response && error.response.status === 400) {
        const { detail } = error.response.data;
        toast.error(detail || 'Please check your credentialsss', {
          position: 'top-right',
        });}

      if (error.response) {
        setFormError('email', 'Email or password does not match');
        setFormError('password', 'Email or password does not match');
      }
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
                  {i18n.t('welcome-back')}
                </h2>
                {/* <p className="font-md color-grey-500 wow animate__animated animate__fadeIn">
                  Access to all features. No credit card required.
                </p> */}
                {/* <div className="box-btn-signin mt-55 wow animate__animated animate__fadeIn"><Link className="btn btn-signin mb-10" href="#"><img src="/assets/imgs/page/login/Google.svg" alt="Transp" />Sign in with Google</Link><Link className="btn btn-signin" href="#"><img src="/assets/imgs/page/login/apple.svg" alt="Transp" />Continue with Apple ID</Link></div> */}
                <div className="box-or-login wow animate__animated animate__fadeIn">
                  <span className="text-or font-xs color-grey-500">
                    Premium Logistics
                  </span>
                </div>
                <div className="box-form-login wow animate__animated animate__fadeIn">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                      <input
                        {...register('email', {
                          required: i18n.t('form-validation.email.required'),
                          maxLength: {
                            value: 220,
                            message: i18n.t('form-validation.email.maxLength'),
                          },
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: i18n.t('form-validation.email.invalid'),
                          },
                        })}
                        className="form-control"
                        type="text"
                        placeholder={i18n.t('email-address')}
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
                    <div className="form-group" style={{ position: 'relative', minHeight: '65px' }}>
  <input
    {...register('password', {
      required: i18n.t('form-validation.password.required'),
      maxLength: {
        value: 220,
        message: i18n.t('form-validation.password.maxLength'),
      },
      minLength: {
        value: 4,
        message: i18n.t('form-validation.password.minLength'),
      },
    })}
    className="form-control"
    type={passwordVisible ? 'text' : 'password'}
    placeholder={i18n.t('enter-your-password')}
    style={{ paddingRight: '40px' }} // Add padding to avoid text overlap with the icon
  />
  <span
    className="password-toggle-icon"
    style={{
      position: 'absolute',
      right: '10px',
      top: '40%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
    }}
    onClick={() => setPasswordVisible(!passwordVisible)}
  >
    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
  </span>

  {errors.password?.message && (
    <p style={{ color: '#FF3E3E', position: 'absolute', bottom: '-20px' }} role="alert">
      {errors.password?.message}
    </p>
  )}
</div>

                    <div className="form-group">
                      <div className="d-flex justify-content-between">
                        <div className="box-forgotpass">
                          <Link
                            className="font-xs color-brand-2"
                            href="/forgot-password"
                          >
                            {i18n.t('forgot-your-password')}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="form-group mt-30">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="box-button-form-login">
                          <input
                            disabled={loadingLogin}
                            className={`${loadingLogin? "opacity-50": ""} btn btn-brand-1-big mr-20`}
                            type="submit"
                            defaultValue={i18n.t('submit')}
                          />
                        </div>
                        <div className="box-text-form-login">
                          <span className="font-xs color-grey-500">
                            {i18n.t('dont-have-an-account')}
                          </span>
                          <Link
                            className="font-xs color-brand-2"
                            href="/register"
                          >
                            {i18n.t('sign-up')}
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
                {/* <div className="quote-shape shape-1" /> */}
                <div className="box-info-bottom-img box-info-bottom-img-3">
                  <div className="image-play wow animate__animated animate__fadeIn">
                    {/* <img
                      className="mb-15"
                      src="/assets/imgs/template/icons/play.svg"
                      alt="transp"
                    /> */}
                  </div>
                  <div className="info-play wow animate__animated animate__fadeIn">
                    <h4 className="color-white mb-15">
                      [We have 25 years experience in this passion]
                    </h4>
                    <p className="font-sm color-white">
                      [There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humour]
                    </p>
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
