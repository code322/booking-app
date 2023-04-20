import { Icon } from '@iconify/react';
import { Slider, ThemeProvider, createTheme } from '@mui/material';
import React, { useState } from 'react';
import { getFilteredResult } from '../../state/locations/locationsSlicer';
import { useAppDispatch } from '../../hooks/useTypeSelector';
import { useNavigate } from 'react-router-dom';
export type filterType = {
  query?: string;
  minPrice: number;
  maxPrice: number;
  maxBeds: string;
};

const FilterForm = () => {
  const [search, setSearch] = useState('');
  const [maxBed, setMaxBed] = useState<string>('Any');
  const [princeRange, setPriceRange] = useState<number[]>([0, 200]);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const theme = createTheme({
    palette: {
      primary: {
        main: '#ff385c',
      },
    },
  });
  // get the price range
  const minDistance = 10;
  function handlePriceRange(
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setPriceRange([
        Math.min(newValue[0], princeRange[1] - minDistance),
        princeRange[1],
      ]);
    } else {
      setPriceRange([
        princeRange[0],
        Math.max(newValue[1], princeRange[0] + minDistance),
      ]);
    }
  }

  function handleFilter(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    let params: filterType = {
      query: search,
      minPrice: princeRange[0],
      maxPrice: princeRange[1],
      maxBeds: maxBed,
    };
    dispatch(getFilteredResult(params) as any);
    navigate('/filtered-result');
  }

  return (
    <form className='md:mt-0  md:border-none flex flex-col gap-6 items-center justify-between w-full max-w-6xl  md:px-9 bg-white rounded-lg outline-none py-8 md:shadow-customShadow md:flex-row md:h-24 md:rounded-full md:gap-2 md:relative md:-top-10 mb-10 md:mb-0 '>
      {/* search */}
      <SearchContent
        icon={<Icon icon='ic:baseline-search' />}
        content={
          <input
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            className='outline-none p-2 md:mr-2  md:border-none rounded-md'
            type='text'
            placeholder='Location...'
          />
        }
        label='Search by Location'
      />

      {/* price range */}

      <SearchContent
        icon={<Icon icon='material-symbols:attach-money' />}
        content={
          <div className='pl-2 pr-2 md:pl-0 '>
            <ThemeProvider theme={theme}>
              <Slider
                getAriaLabel={() => 'Minimum distance'}
                value={princeRange}
                onChange={handlePriceRange}
                valueLabelDisplay='auto'
                disableSwap
              />
            </ThemeProvider>
          </div>
        }
        label='Price range'
      />

      {/* options */}
      <SearchContent
        icon={<Icon icon='material-symbols:bed-outline' />}
        content={
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setMaxBed(e.target.value)
            }
            className='bg-white w-full md:border px-2 py-2 rounded-md'
            name=''
            id=''
          >
            <option className=' ' value='Any'>
              Any
            </option>
            <option className=' ' value='1'>
              1
            </option>
            <option className=' ' value='2'>
              2
            </option>
            <option className=' ' value='3+'>
              3+
            </option>
          </select>
        }
        label='Number of beds'
      />
      <div className='pr-4 pl-10 w-full md:pr-0 md:pl-0 md:w-fit'>
        <button
          onClick={handleFilter}
          className='rounded-full bg-custom-red w-full h-auto md:h-14 md:w-14 text-white flex justify-center items-center gap-2 shadow-md py-2 md:py-0 '
        >
          <Icon className='text-2xl' icon='ic:baseline-search' />
          <span className='md:hidden'>Search</span>
        </button>
      </div>
    </form>
  );
};

export default FilterForm;

interface searchContentProps {
  icon: JSX.Element;
  content: JSX.Element;
  label: string;
}
const SearchContent = ({ icon, content, label }: searchContentProps) => (
  <div className='flex items-center md:items-center gap-4 flex-1 last:ml-2 md:border-r last:border-r-0 w-full pr-4 border-b pb-1 sm:pb-2 md:border-b-0 md:pb-0'>
    <div className='text-red-400 text-2xl  h-full '>{icon}</div>
    <div className='flex gap-2 flex-col w-full'>
      {content}
      <label className='text-gray-600 hidden md:block' htmlFor=''>
        {label}
      </label>
    </div>
  </div>
);
