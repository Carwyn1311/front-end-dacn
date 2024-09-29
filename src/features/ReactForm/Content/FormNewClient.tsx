/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import '../.css/FormNewClient.css';
import TextField from '../../../components/TextField/TextField';

interface FormNewClientProps {
  onClose: () => void
}

const FormNewClient: React.FC<FormNewClientProps> = ({ onClose }): JSX.Element => {
  const { handleSubmit, formState: { errors } } = useForm();

  const onSubmit: SubmitHandler<any> = (data): void => {
    console.log(data);
  };

  return (
    <div className="new-client-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <TextField
            label="Prénom *"
            name="Prénom"
            placeholder=""
            value=""
            onChange={() => {}}
            fullWidth
            margin="normal"
            className="custom-text-field"
          />
          {(errors.Prénom != null) && <span className="error-message">Prénom is required</span>}
        </div>

        <div className="form-group">
          <TextField
            label="Code *"
            placeholder=""
            value=""
            onChange={() => {}}
            fullWidth
            margin="normal"
            className="custom-text-field"
          />
          {(errors.code != null) && <span className="error-message">Code is required</span>}
        </div>

        <div className="form-group">
          <TextField
            label="Address"
            name="address"
            placeholder=""
            value=""
            onChange={() => {}}
            fullWidth
            margin="normal"
            className="custom-text-field"
          />
        </div>

        <div className="action-buttons">
          <button type="button" className="cancel-button" onClick={onClose}>Annuler</button>
          <button type="submit" className="save-button">Valider</button>
        </div>
      </form>
    </div>
  );
};

export default FormNewClient;
