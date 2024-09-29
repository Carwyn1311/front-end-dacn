/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import '../.css/TabGeneral.css';
import AutoSearch from '../../../components/AutoSearchField/AutoSearch';
import NewclientForm from './FormNewClient';
import { BiPlusMedical } from 'react-icons/bi';
import InputDay from '../../../components/InputDay/InputDay';
import Input from '../../../components/Input/Input';

interface FormData {
  client: string
  projectName: string
  projectCode: string
  startDate: string
  endDate: string
  note: string
  autoAddUser: boolean
}

const TabGeneral: React.FC = (): JSX.Element => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const toggleForm = (): void => {
    setShowForm(prev => !prev);
  };

  const projectTypes = [
    { id: 1, name: 'T&M' },
    { id: 2, name: 'Fixed Price' },
    { id: 3, name: 'Non-Bill' },
    { id: 4, name: 'ODC' },
    { id: 5, name: 'Product' },
    { id: 6, name: 'Training' },
    { id: 7, name: 'NoSalary' }
  ];

  const onSubmit: SubmitHandler<FormData> = (data): void => {
    console.log(data);
  };

  const handleSelectItem = (item: string): void => {
  };

  const handleTypeSelect = (type: string): void => {
    setSelectedType(type);
  };

  const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Grape', 'Lemon', 'Mango', 'Orange', '1'];

  const handleFormSubmit = async (data: FormData): Promise<void> => {
    await onSubmit(data);
  };
  return (
    <div className="tab-general">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="form-group" >
          <h3 className="form-label">Client</h3>
          <div className="form-control" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '-10px', padding: '10px' }}>
            <AutoSearch
              items={items}
              onSelectItem={handleSelectItem}
              width="480px"
              height="35px"
            />
            <button
              type="button"
              className="btn-new-client"
              onClick={toggleForm}
              style={{
                fontSize: '14px',
                width: '120px',
                height: '40px',
                marginTop: '0px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: '10px'
              }}
            >
              <BiPlusMedical style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '3px'
              }} /> New Client
            </button>
            {showForm && <NewclientForm onClose={toggleForm} />}
            {(errors.client != null) && <span className="error-message">Client is required</span>}
          </div>
        </div>

        <div className="form-group">
          <h3 className="form-label">Project Name</h3>
          <Input
            name="projectName"
            placeholder="Project name"
            register={register}
            errors={errors}
            requiredMessage="Project Name is required!" label={''}
            width='545px'
            height='35px'
          />

        </div>

        <div className="form-group" >
          <h3 className="form-label">Project Code</h3>
          <Input
            name="projectCode"
            placeholder="Project code"
            register={register}
            errors={errors}
            requiredMessage="Project Code is required!" label={''}
            width='545px'
            height='35px'
          />

        </div>

        <div className="form-group">
          <h3 className="form-label" style={{ marginRight: '0px' }}>Dates</h3>

          <InputDay
            label="Start Date"
            name="startDate"
            value={startDate}
            onChange={(date) => setStartDate(date)}
            width="250px"
            height="40px"
          />

          <h3 className="form-label" style={{ marginLeft: '10px', marginRight: '10px' }}>to</h3>

          <InputDay
            label="End Date"
            name="endDate"
            value={endDate}
            onChange={(date) => setEndDate(date)}
            width="250px"
            height="40px"
          />
          {errors.startDate && <span className="error-message">Start date is required</span>}
          {errors.endDate && <span className="error-message">End date is required</span>}
        </div>

        <div className="form-group">
          <h3 className="form-label">Note</h3>
          <textarea
            className="form-textarea"
            {...register('note', { required: true })}
          />
          {(errors.note != null) && <span className="error-message">Note is required</span>}
        </div>

        <div className="form-group">
          <h3 className="form-checkbox-label">
            <input
              type="checkbox"
              className="form-checkbox"
              {...register('autoAddUser')}
            />
            Auto add user as a member of this project when creating new user
          </h3>
        </div>

        <div className="form-group">
          <h3 className="form-label">Project Type*</h3>
          <div className="project-type-buttons">
            {projectTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                className={`project-type-button ${selectedType === type.name ? 'selected' : ''}`}
                onClick={() => handleTypeSelect(type.name)}
              >
                {type.name}
              </button>
            ))}
          </div>
        </div>

        <div className="action-buttons">
          <button type="button" className="cancel-button">Cancel</button>
          <button type="submit" className="save-button">Save</button>
        </div>
      </form>
    </div>
  );
};

export default TabGeneral;
