import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';

const TransportModal = ({
  isOpen,
  onRequestClose,
  zipCode,
  destination,
  prices,
}) => {
  const { i18n } = useTranslation();
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Modal isOpen={isOpen} style={customStyles} onRequestClose={onRequestClose}>
      <h4>{i18n.t('car-shipping-calculator')}</h4>
      <div
        className="form-group"
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <input
          className="form-control"
          type="text"
          value={zipCode}
          readOnly
          disabled
          style={{ width: '49%' }}
        />
        <input
          className="form-control"
          type="text"
          value={destination}
          readOnly
          disabled
          style={{ width: '49%' }}
        />
      </div>
      {prices && (
        <table style={tableStyles}>
          <thead>
            <tr>
              <th style={headerStyles}></th>
              {Object.keys(prices).map((key) => (
                <th key={key} style={headerStyles}>
                  {capitalizeFirstLetter(key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={headerStyles}>{i18n.t('land')}</td>
              {Object.keys(prices).map((key) => (
                <td key={key} style={cellStyles}>
                  {prices[key].land + ' $'}
                </td>
              ))}
            </tr>
            <tr>
              <td style={headerStyles}>{i18n.t('ocean')}</td>
              {Object.keys(prices).map((key) => (
                <td key={key} style={cellStyles}>
                  {prices[key].ocean + ' $'}
                </td>
              ))}
            </tr>
            <tr>
              <td style={headerStyles}>{i18n.t('total-cost')}</td>
              {Object.keys(prices).map((key) => (
                <td
                  key={key}
                  style={{ ...cellStyles, backgroundColor: '#a8e3e9' }}
                >
                  {prices[key].total + ' $'}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      )}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn btn-brand-1 btn-track" onClick={onRequestClose}>
        {i18n.t('close')}
        </button>
      </div>
    </Modal>
  );
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '90%', 
    maxWidth: '800px', 
    padding: '20px',
    zIndex: 1000,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
};

const tableStyles = {
  width: '100%',
  borderCollapse: 'collapse',
  marginBottom: '40px',
};

const cellStyles = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left',
};

const headerStyles = {
  ...cellStyles,
  backgroundColor: '#f2f2f2',
  fontWeight: 'bold',
};

export default TransportModal;
