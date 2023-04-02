import Container from '../../components/Container/Container';
import { useEffect, useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypeSelector';
import {
  getAllLocations,
  selectLocations,
} from '../../state/locations/locationsSlicer';
import { API_URL } from '../../helpers/api';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import InputFields from '../../components/InputFields/InputFields';
import { Slider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import { filterLocations } from '../../helpers/filterLocations';

function Home() {
  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();
  const theme = createTheme({
    palette: {
      primary: {
        main: '#ff385c',
      },
    },
  });
  useEffect(() => {
    dispatch(getAllLocations() as any);
  }, [dispatch]);

  const allLocations = useAppSelector(selectLocations);

  const [princeRange, setPriceRange] = useState<number[]>([0, 200]);

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

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }
  function handleMaxBed(e: React.ChangeEvent<HTMLSelectElement>) {
    setMaxBed(e.target.value);
  }

  const [maxBed, setMaxBed] = useState<string>('Any');

  const filteredLocation = useMemo(() => {
    let result = filterLocations(search, maxBed, princeRange, allLocations);
    return result;
  }, [search, maxBed, princeRange, allLocations]);
  return (
    <>
      <div className='md:min-h-[70vh] mt-10 mb-6 md:mt-0 md:mb-0 flex items-cover justify-center items-center overflow-hidden relative '>
        <div className='hidden md:block absolute top-0 left-0 w-full h-full overflow-hidden -z-10'>
          <img
            className='object-cover w-full h-full'
            src='assets/modern-house.webp'
            alt=''
          />
        </div>
        <div className='hidden md:block bg-black opacity-20 w-full h-full -z-[1] absolute top-0 left-0'></div>
        <div className='md:mt-0 border md:border-none flex flex-col mx-4 gap-6 items-center justify-between w-full  max-w-6xl  px-9 bg-white rounded-lg outline-none py-12 shadow-customShadow md:flex-row md:h-24 md:rounded-full md:gap-2'>
          {/* search */}
          <SearchContent
            icon={<Icon icon='ic:baseline-search' />}
            content={
              <input
                value={search}
                onChange={handleSearch}
                className='outline-none py-2 px-1 mr-2 border border-gray-300 md:border-none'
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
              <div className='pr-6'>
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

          {/* search */}
          <SearchContent
            icon={<Icon icon='material-symbols:bed-outline' />}
            content={
              <select
                onChange={handleMaxBed}
                className='bg-white w-full border px-2 py-2'
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
        </div>
      </div>
      <Container>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
          {filteredLocation &&
            filteredLocation.map((locations) => {
              let price = Number(locations?.details?.price).toLocaleString(
                'en-US',
                {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0,
                  minimumFractionDigits: 0,
                }
              );

              return (
                <div key={locations?.id}>
                  <div className='relative'>
                    <Link to={`/location/${locations?.id}`}>
                      <img
                        className='bg-blue-200 aspect-square object-cover rounded-lg w-full h-full'
                        src={`${API_URL}/uploads/${locations?.photos?.[0]}`}
                        alt='no_image'
                      />
                      <div className='absolute bg-gradient-to-b from-transparent to-gray-700 opacity-60 h-full w-full top-0 left-0 rounded-lg'></div>
                      <div className='absolute bottom-2 text-white left-1'>
                        <span className=' text-white text-xl font-semibold '>
                          {price}
                        </span>
                        <span className='text-xs'>/night</span>
                      </div>
                    </Link>
                  </div>
                  <div className='py-3 '>
                    <h2 className='font-semibold text-base capitalize text-gray-700'>
                      {locations?.details?.title}
                    </h2>
                    <div className='flex items-center justify-start'>
                      <Icon
                        className='text-gray-600 mr-1 text-sm'
                        icon='material-symbols:location-on-outline'
                      />
                      <h2 className='text-gray-600 capitalize text-xs'>
                        {locations?.details?.address}
                      </h2>
                    </div>
                    <div className='flex items-center justify-start'>
                      <Icon
                        className='text-gray-600 mr-1 text-lg'
                        icon='mdi:bed-double-outline'
                      />
                      <h2 className='text-gray-600 text-xs'>
                        {locations?.details?.guests}
                      </h2>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </Container>
    </>
  );
}

export default Home;

interface searchContentProps {
  icon: JSX.Element;
  content: JSX.Element;
  label: string;
}
const SearchContent = ({ icon, content, label }: searchContentProps) => (
  <div className='flex items-end md:items-center gap-4 flex-1 last:ml-2 md:border-r last:border-r-0 w-full '>
    <div className='text-red-400 text-2xl  h-full '>{icon}</div>
    <div className='flex gap-2 flex-col w-full'>
      {content}
      <label className='text-gray-600' htmlFor=''>
        {label}
      </label>
    </div>
  </div>
);
