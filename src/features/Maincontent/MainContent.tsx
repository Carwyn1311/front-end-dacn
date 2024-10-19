import React, { useState } from 'react';

interface MainContentProps {
  isSidebarOpen: boolean;
}

function MainContent({ isSidebarOpen }: MainContentProps) {
  const [inputValue, setInputValue] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div 
      className="main-content" 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        width: isSidebarOpen ? 'calc(100% - 250px)' : '100%',
        transition: 'width 0.3s ease'
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Tôi có thể giúp gì cho bạn?</h1>
      <div className="input-section" style={{ width: '100%' }}>
        <div className="input-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
          {selectedFiles.length > 0 && (
            <div className="file-preview-list" style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
              {selectedFiles.map((file, index) => (
                <div key={index} className="file-preview" style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                  {file.type.startsWith('image/') ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index}`}
                      className="file-preview-image"
                      style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px', marginRight: '5px' }}
                    />
                  ) : (
                    <div className="file-preview-name">
                      {file.name}
                    </div>
                  )}
                  <span className="file-remove" onClick={() => handleRemoveFile(index)} style={{ cursor: 'pointer', fontSize: '16px', color: '#ff0000', marginLeft: '5px' }}>
                    &#10006;
                  </span>
                </div>
              ))}
            </div>
          )}

          <label htmlFor="file-upload" className="input-icon" style={{ position: 'absolute', left: '10px', fontSize: '20px', color: '#888', cursor: 'pointer' }}>
            &#128206;
          </label>
          <input
            id="file-upload"
            type="file"
            multiple
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />

          <input
            type="text"
            className="input-field"
            placeholder="Tin nhắn AI CHAT"
            value={inputValue}
            onChange={handleInputChange}
            style={{ width: '95%', padding: '15px', borderRadius: '30px', border: '1px solid #ccc', fontSize: '16px', outline: 'none', paddingLeft: '40px' }}
          />

          {inputValue && (
            <span className="input-arrow" style={{ position: 'absolute', right: '10px', fontSize: '20px', color: '#888', cursor: 'pointer' }}>
              &#8593;
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainContent;
