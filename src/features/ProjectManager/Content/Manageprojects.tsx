import { BiPlusMedical } from 'react-icons/bi';

import React, { useState } from 'react';
import '../.css/Manageprojects.css';
import '../../../App.css';
import { Button } from 'antd';
import ListCheckButton from '../../../components/ListCheckButton/ListCheckButton';
import SearchInput from '../../../components/SearchInput/SearchInput';
import { FaSearch } from 'react-icons/fa';
import FormCreateProject from '../../ReactForm/Content/FormCreateProject';

const Manageprojects: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const toggleForm = (): void => {
    setShowForm(prevShowForm => !prevShowForm);
  };

  const items = ['Active Projects', 'Deactive Projects', 'All Projects'];

  const handleSelectItem = (item: string): void => {
    console.log('Selected item:', item);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="manage-projects">
      <div className="manage-container">
        <div>
          <h2 className="text-name-tab">Manage Projects</h2>
        </div>
        <div className="tab-top">
          <Button className="new-project-btn" onClick={toggleForm}>
            <span><BiPlusMedical style={{ marginTop: '8px' }} /></span> New Project
          </Button>
          {showForm && <FormCreateProject />}
          <ListCheckButton className="list-check-button" items={items} onSelectItem={handleSelectItem} />
          <div className="search-container">
            <SearchInput
              label="Search by client or project name"
              value={searchValue}
              onChange={handleSearchChange}
              placeholder=""
              prefixIcon={<FaSearch />}
              width="300px"
              height="35px"
              fullWidth={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manageprojects;
