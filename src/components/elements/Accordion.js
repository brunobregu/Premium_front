import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Accordion() {
  const { i18n } = useTranslation();
  const [isActive, setIsActive] = useState({
    status: false,
    key: 1,
  });

  const handleToggle = (key) => {
    if (isActive.key === key) {
      setIsActive({
        status: false,
      });
    } else {
      setIsActive({
        status: true,
        key,
      });
    }
  };
  return (
    <>
      <div className="accordion" id="accordionFAQ">
        <div className="accordion-item wow animate__animated animate__fadeIn">
          <h5 className="accordion-header" onClick={() => handleToggle(1)}>
            <button
              className={
                isActive.key == 1
                  ? 'accordion-button text-heading-5 '
                  : 'accordion-button text-heading-5 collapsed'
              }
            >
              {i18n.t('faq_title_1')}
            </button>
          </h5>
          <div
            className={
              isActive.key == 1
                ? 'accordion-collapse'
                : 'accordion-collapse collapse'
            }
          >
            <div className="accordion-body">{i18n.t('faq_desc_1')}</div>
          </div>
        </div>
        <div className="accordion-item wow animate__animated animate__fadeIn">
          <h5 className="accordion-header" onClick={() => handleToggle(2)}>
            <button
              className={
                isActive.key == 2
                  ? 'accordion-button text-heading-5 '
                  : 'accordion-button text-heading-5 collapsed'
              }
            >
              {i18n.t('faq_title_2')}
            </button>
          </h5>
          <div
            className={
              isActive.key == 2
                ? 'accordion-collapse'
                : 'accordion-collapse collapse'
            }
          >
            <div className="accordion-body">{i18n.t('faq_desc_2')}</div>
          </div>
        </div>
        <div className="accordion-item wow animate__animated animate__fadeIn">
          <h5 className="accordion-header" onClick={() => handleToggle(3)}>
            <button
              className={
                isActive.key == 3
                  ? 'accordion-button text-heading-5 '
                  : 'accordion-button text-heading-5 collapsed'
              }
            >
              {i18n.t('faq_title_3')}
            </button>
          </h5>
          <div
            className={
              isActive.key == 3
                ? 'accordion-collapse'
                : 'accordion-collapse collapse'
            }
          >
            <div className="accordion-body">{i18n.t('faq_desc_3')}</div>
          </div>
        </div>
        <div className="accordion-item wow animate__animated animate__fadeIn">
          <h5 className="accordion-header" onClick={() => handleToggle(4)}>
            <button
              className={
                isActive.key == 4
                  ? 'accordion-button text-heading-5 '
                  : 'accordion-button text-heading-5 collapsed'
              }
            >
              {i18n.t('faq_title_4')}
            </button>
          </h5>
          <div
            className={
              isActive.key == 4
                ? 'accordion-collapse'
                : 'accordion-collapse collapse'
            }
          >
            <div className="accordion-body">{i18n.t('faq_desc_4')}</div>
          </div>
        </div>
      </div>
    </>
  );
}
