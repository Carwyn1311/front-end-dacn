import React, { useState, useCallback, useMemo } from 'react';
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
  Popper,
  Paper,
  ClickAwayListener,
} from '@mui/material';

interface AutoSearchProps {
  items: { name: string; url: string; description?: string }[];
  onSelectItem: (item: string, url: string) => void;
  label?: string;
  placeholder?: string;
  prefix?: React.ReactNode;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width?: string;
  height?: string;
  buttonText?: string;
  buttonUrl?: string;
}

const AutoSearch: React.FC<AutoSearchProps> = ({
  items,
  onSelectItem,
  label = 'Search ... ',
  placeholder = '',
  prefix,
  className = '',
  value = '',
  onChange,
  width = '100%',
  height = 'auto',
  buttonText,
  buttonUrl,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>(value);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchTerm(value);
      onChange?.(e);
      if (value !== '') {
        setAnchorEl(e.currentTarget);
      } else {
        setAnchorEl(null);
      }
    },
    [onChange]
  );

  const filteredItems = useMemo(
    () =>
      items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [items, searchTerm]
  );

  const handleItemSelect = useCallback(
    (item: { name: string; url: string }) => {
      setSearchTerm(item.name);
      onSelectItem(item.name, item.url);
      setAnchorEl(null); // Đóng danh sách
    },
    [onSelectItem]
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      className={`floating-label-container ${className}`}
      sx={{
        width,
        height: height !== '' ? height : 'auto',
        position: 'relative',
        border: '1px solid #ccc',
        borderRadius: '12px',
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        zIndex: 1000,
      }}
    >
      {prefix && (
        <Box sx={{ marginRight: '8px', fontSize: '18px' }}>{prefix}</Box>
      )}
      <TextField
        fullWidth
        variant="standard"
        label={label}
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{ disableUnderline: true }}
        sx={{
          '& .MuiInputLabel-root': {
            fontSize: '14px',
            color: '#aaa',
          },
        }}
      />
      <Popper
        open={Boolean(anchorEl && filteredItems.length > 0)}
        anchorEl={anchorEl}
        placement="bottom-start"
        style={{ zIndex: 1300, width: width }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Paper
            sx={{
              maxHeight: '200px',
              overflowY: 'auto',
              marginTop: '4px',
              borderRadius: '4px',
              boxShadow: 3,
            }}
          >
            <List>
              {filteredItems.map((item, index) => (
                <ListItem
                  key={index}
                  component="button" // Sửa lỗi bằng cách thêm component="button"
                  onClick={() => handleItemSelect(item)}
                  sx={{ padding: '8px 12px' }}
                >
                  <ListItemText
                    primary={item.name}
                    secondary={item.description}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </ClickAwayListener>
      </Popper>
      {buttonText && buttonUrl && (
        <Button
          variant="contained"
          onClick={() => (window.location.href = buttonUrl)}
          sx={{
            marginLeft: '8px',
            backgroundColor: '#ff6700',
            color: 'white',
            '&:hover': { backgroundColor: '#cc5500' },
          }}
        >
          {buttonText}
        </Button>
      )}
    </Box>
  );
};

AutoSearch.displayName = 'AutoSearch';

export default AutoSearch;
