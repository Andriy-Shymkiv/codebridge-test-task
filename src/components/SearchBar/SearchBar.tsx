import SearchIcon from '@mui/icons-material/Search';
import { Box, InputAdornment, TextField } from '@mui/material';

type Props = {
  query: string | null;
  onQueryChange: (value: string) => void;
};

export const SearchBar: React.FC<Props> = ({ onQueryChange, query }) => {
  const searchBarStyles = {
    box: {
      marginBottom: '40px',
      width: '400px',
      display: 'inline-block',
    },
    textField: {
      width: '100%',
    },
    textInput: {
      height: '50px',
      boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.05)',
      borderRadius: '5px',
    },
  };

  return (
    <Box sx={searchBarStyles.box}>
      <TextField
        sx={searchBarStyles.textField}
        id="outlined-basic"
        placeholder="Newest articles for today!"
        variant="outlined"
        size="small"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          style: searchBarStyles.textInput,
        }}
      />
    </Box>
  );
};
