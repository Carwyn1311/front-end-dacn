import React from 'react';
import '../.css/Breadcrumb.css';
import '../.css/AntDesignOverrides.css';

interface BreadcrumbItem {
  label: string;
  url?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="breadcrumb">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.url && index !== items.length - 1 ? (
            <a href={item.url} className="breadcrumb-link">{item.label}</a>
          ) : (
            <span className="breadcrumb-current">{item.label}</span>
          )}
          {index < items.length - 1 && <span className="breadcrumb-separator"> &gt; </span>}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
