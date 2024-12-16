import React, { useState, useEffect } from 'react';
import mammoth from 'mammoth';
import { CircularProgress, Typography } from '@mui/material';

interface DoctoHtmlProps {
  url: string; // Đường dẫn đến file .docx
}

const DoctoHTML: React.FC<DoctoHtmlProps> = ({ url }) => {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocxAndConvert = async () => {
      setLoading(true);
      setError(null);

      try {
        // Gọi API và tải file .docx từ URL
        const response = await fetch(url);
        const buffer = await response.arrayBuffer();

        // Chuyển đổi file .docx thành HTML bằng Mammoth
        mammoth.convertToHtml({ arrayBuffer: buffer })
          .then((result) => {
            setHtmlContent(result.value); // Lưu nội dung HTML vào state
          })
          .catch((err) => {
            // Kiểm tra nếu err là kiểu Error (có thuộc tính message)
            if (err instanceof Error) {
              setError('Lỗi chuyển đổi file DOCX: ' + err.message);
            } else {
              setError('Lỗi không xác định');
            }
          })
          .finally(() => setLoading(false));
      } catch (err) {
        // Kiểm tra nếu err là kiểu Error (có thuộc tính message)
        if (err instanceof Error) {
          setError('Lỗi tải file DOCX: ' + err.message);
        } else {
          setError('Lỗi không xác định');
        }
        setLoading(false);
      }
    };

    fetchDocxAndConvert();
  }, [url]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div
      className="doc-content"
      dangerouslySetInnerHTML={{ __html: htmlContent }} // Hiển thị nội dung HTML
    />
  );
};

export default DoctoHTML;
