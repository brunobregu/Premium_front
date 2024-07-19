import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';

const TransportModal = ({ isOpen, onRequestClose, zipCode, destination, prices }) => {
    const { t } = useTranslation('common');
  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={onRequestClose}
    >
      <h4>{t('car-shipping-calculator')}</h4>
      <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <input
          className="form-control"
          type="text"
          value={zipCode}
          readOnly
          disabled
          style={{ width: "49%" }}
        />
        <input
          className="form-control"
          type="text"
          value={destination}
          readOnly
          disabled
          style={{ width: "49%" }}
        />
      </div>
      {prices && (
        <table style={tableStyles}>
          <thead>
            <tr>
              <th style={headerStyles}></th>
              {Object.keys(prices).map((key) => (
                <th key={key} style={headerStyles}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={headerStyles}>Land</td>
              {Object.keys(prices).map((key) => (
                <td key={key} style={cellStyles}>{prices[key].land + ' $'}</td>
              ))}
            </tr>
            <tr>
              <td style={headerStyles}>Ocean</td>
              {Object.keys(prices).map((key) => (
                <td key={key} style={cellStyles}>{prices[key].ocean + ' $'}</td>
              ))}
            </tr>
            <tr>
              <td style={headerStyles}>Total Cost</td>
              {Object.keys(prices).map((key) => (
                <td key={key} style={cellStyles}>{prices[key].total + ' $'}</td>
              ))}
            </tr>
          </tbody>
        </table>
      )}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          className="btn btn-brand-1 btn-track"
          onClick={onRequestClose}
        >
          Close
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
      width: '50%',
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
