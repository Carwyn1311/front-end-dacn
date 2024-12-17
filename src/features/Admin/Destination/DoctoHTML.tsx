import React, { useState, useEffect } from 'react';
import mammoth from 'mammoth';
import { CircularProgress, Typography } from '@mui/material';

interface DoctoHTMLProps {
  url: string; // Đường dẫn đến file văn bản
}

const DoctoHTML: React.FC<DoctoHTMLProps> = ({ url }) => {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Hàm chuyển đổi DOCX sang HTML
  const convertDocxToHtml = async (buffer: ArrayBuffer) => {
    try {
      const result = await mammoth.convertToHtml({ arrayBuffer: buffer });
      setHtmlContent(result.value);
    } catch (err) {
      throw new Error('Lỗi chuyển đổi file DOCX: ' + (err instanceof Error ? err.message : 'Lỗi không xác định'));
    }
  };

  // Hàm tải và kiểm tra file
  const fetchAndConvertFile = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch file từ URL
      console.log('Fetching file from URL:', url);
      const response = await fetch(url);

      // Kiểm tra kiểu MIME của file
      const contentType = response.headers.get('Content-Type');
      console.log('File Type:', contentType);

      // Kiểm tra nếu file không phải là DOCX hoặc là một loại hỗ trợ
      if (contentType && contentType.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
        const buffer = await response.arrayBuffer();
        convertDocxToHtml(buffer);
      } else {
        throw new Error('Loại file không được hỗ trợ.');
      }
    } catch (err) {
      console.error('Lỗi tải hoặc chuyển đổi file:', err);
      setError('Lỗi tải hoặc chuyển đổi file: ' + (err instanceof Error ? err.message : 'Lỗi không xác định'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndConvertFile();
  }, [url]);

  return (
    <div>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};

export default DoctoHTML;
