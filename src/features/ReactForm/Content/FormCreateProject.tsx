import { BiX } from 'react-icons/bi';
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';
import { useForm, FormProvider, Controller, SubmitHandler } from 'react-hook-form';
import { Tab, Tabs, Box } from '@mui/material';
import '../.css/FormCreateProject.css'; // Sửa đường dẫn CSS
import TabGeneral from './TabGeneral';
import TabTeam from './TabTeam';
import TabTasks from './TabTasks';
import TabNotification from './TabNotification';
import Button from '../../../components/Button/Button';

interface FormValues {
  generalField: string
  teamField: string
  tasksField: string
  notificationField: string
}

const TabPanel = ({ children, value, index }: { children: React.ReactNode, value: number, index: number }): JSX.Element => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const FormCreateProject: React.FC = (): JSX.Element | null => {
  const methods = useForm<FormValues>();
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number): void => {
    setActiveTab(newValue);
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  const handleClose = (): void => {
    setIsVisible(false);
  };

  const handleCancel = (): void => {
    console.log('Cancel button clicked');
  };

  const handleSave = (): void => {
    void methods.handleSubmit(onSubmit)();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <FormProvider {...methods}>
      <div className="multi-tab-form-container">
        <div className="form-titlebar">
          <h2>Create Project</h2>
          <button className="close-button" type="button" onClick={handleClose} aria-label="Close form">
            <BiX style={{ fontWeight: 'bold', fontSize: '35px' }} />
          </button>
        </div>

        {/* Form content with tabs */}
        <form onSubmit={methods.handleSubmit(onSubmit)} style={{ overflowY: 'auto', height: 'calc(100vh - 160px)' }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="General" />
            <Tab label="Team" />
            <Tab label="Tasks" />
            <Tab label="Notification" />
          </Tabs>

          <TabPanel value={activeTab} index={0}>
            <Controller
              name="generalField"
              control={methods.control}
              defaultValue=""
              render={({ field }) => <TabGeneral />}
            />
          </TabPanel>

          <TabPanel value={activeTab} index={1}>
            <Controller
              name="teamField"
              control={methods.control}
              defaultValue=""
              render={({ field }) => <TabTeam />}
            />
          </TabPanel>

          <TabPanel value={activeTab} index={2}>
            <Controller
              name="tasksField"
              control={methods.control}
              defaultValue=""
              render={({ field }) => <TabTasks />}
            />
          </TabPanel>

          <TabPanel value={activeTab} index={3}>
            <Controller
              name="notificationField"
              control={methods.control}
              defaultValue=""
              render={({ field }) => <TabNotification />}
            />
          </TabPanel>
          <div className="action-buttons-container">
            <Button className="cancel-button" onClick={handleCancel}>Cancel</Button>
            <Button className="save-button" onClick={handleSave}>Save</Button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default FormCreateProject;
