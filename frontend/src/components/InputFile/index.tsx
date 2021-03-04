import React from 'react';
import { Box, IconButton, Typography } from '@material-ui/core';
import { CloudUpload } from '@material-ui/icons';

// import { Container } from './styles';

const InputFile: React.FC = () => {
  return (
    <Box
      paddingY={2}
      paddingX={4}
      display="flex"
      alignItems="center"
      justifyContent="center"
      border="1px dashed #eee"
    >
      <input type="file" id="input-file" style={{ display: 'none' }} />
      <label
        htmlFor="input-file"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <IconButton color="primary" aria-label="upload picture">
          <CloudUpload fontSize="large" />
        </IconButton>
      </label>
    </Box>
  );
};

export default InputFile;
