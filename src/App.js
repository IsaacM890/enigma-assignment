/** @format */
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import { setData } from './actions/actions';

const App = () => {
  const { data } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [hiddenSymbols, setHiddenSymbols] = useState([]);
  const [markedSymbols, setMarkedSymbols] = useState({});

  useEffect(() => {
    dispatch(setData(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleGroupSymbol = (newHiddenSymbol) => {
    setHiddenSymbols((prevData) => {
      if (prevData.find((hs) => hs === newHiddenSymbol)) {
        return prevData.filter((s) => s !== newHiddenSymbol);
      }
      return [...prevData, newHiddenSymbol];
    });
  };

  const getFilteredSymbols = () => {
    return Object.entries(data).filter(([symbol]) => {
      return !hiddenSymbols.find((s) => s === symbol);
    });
  };

  const getNewMarkedSymbols = (prevMarkedSymbols, symbol) => {
    const newMarkedSymbols = { ...prevMarkedSymbols };
    if (newMarkedSymbols[symbol]) {
      delete newMarkedSymbols[symbol];
    } else {
      newMarkedSymbols[symbol] = true;
    }
    return newMarkedSymbols;
  };

  const toggleMarkedSymbols = (symbol) => {
    setMarkedSymbols((prevMarkedSymbols) =>
      getNewMarkedSymbols(prevMarkedSymbols, symbol)
    );
  };

  const isMarked = (symbol) => {
    return markedSymbols[symbol];
  };

  const getNumberColor = (symbolChnage) => {
    const symbolChangePercentage = symbolChnage.replace('%', '');
    return Number(symbolChangePercentage) > 0 ? 'green' : 'red';
  };

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        style={{
          backgroundColor: 'black',
          paddingTop: '5px',
          paddingLeft: '10px',
          width: 380,
        }}
      >
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginRight: '110px',
          }}
        >
          {Object.keys(data).map((groupSymbol) => (
            <Button
              variant='contained'
              size='small'
              style={{ backgroundColor: '#382da9', marginRight: '5px' }}
              key={groupSymbol}
              onClick={() => toggleGroupSymbol(groupSymbol)}
            >
              {groupSymbol}
            </Button>
          ))}
        </Box>
        <Box>
          <TextField
            style={{
              marginTop: 5,
              backgroundColor: '#382da9',
              boxSizing: 'border-box',
              borderRadius: '5px',
            }}
            id='outlined-basic'
            label='Search all markets...'
            variant='outlined'
            size='small'
          />
        </Box>
        <Box
          style={{
            borderTop: '1px solid white',
            marginTop: 10,
            maxWidth: 500,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {getFilteredSymbols().map(([groupSymbol, groupData]) => {
            return (
              <TableContainer
                key={groupSymbol}
                component={Paper}
                style={{
                  backgroundColor: 'black',
                  color: '#fff',
                  marginTop: 5,
                }}
              >
                <Typography>{groupSymbol}</Typography>
                <Table
                  sx={{
                    width: '100%',
                  }}
                  size='small'
                  aria-label='a dense table'
                >
                  <TableBody>
                    {Object.entries(groupData).map(([symbol, symbolData]) => (
                      <TableRow
                        hover={true}
                        key={symbol}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                        style={{
                          backgroundColor: isMarked(symbol)
                            ? '#ed143d99'
                            : 'transparent',
                        }}
                      >
                        <TableCell
                          style={{ border: 'none', color: 'darkgrey' }}
                          component='th'
                          scope='row'
                          padding='none'
                        >
                          {symbol}
                        </TableCell>
                        <TableCell
                          style={{ border: 'none', color: 'white' }}
                          padding='none'
                          align='right'
                        >
                          {symbolData.open}
                        </TableCell>
                        <TableCell
                          style={{
                            border: 'none',
                            color: getNumberColor(symbolData.change),
                          }}
                          padding='none'
                          align='right'
                        >
                          {symbolData.change}
                        </TableCell>
                        <TableCell
                          style={{ border: 'none', color: 'white' }}
                          padding='none'
                          align='right'
                        >
                          {symbolData.worth}
                        </TableCell>
                        <TableCell style={{ border: 'none', color: 'white' }}>
                          <IconButton
                            style={{
                              color: isMarked(symbol) ? 'gold' : 'grey',
                            }}
                            isMarked={isMarked(symbol)}
                            onClick={() => toggleMarkedSymbols(symbol)}
                          >
                            <StarIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default App;
