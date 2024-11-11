import React, { useState } from 'react';
import '../.css/Tabs.css';
import '../.css/AntDesignOverrides.css';
interface TabsProps {
  tabs: { name: string; content: React.ReactNode }[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].name);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="tabsContainer">
      <div className="tabButtons">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tabButton ${activeTab === tab.name ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.name)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="tabContent">
        {tabs.map(
          (tab, index) =>
            activeTab === tab.name && <div key={index}>{tab.content}</div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
