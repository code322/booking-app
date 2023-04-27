import React, { useEffect, useRef, memo } from 'react';

import { Icon } from '@iconify/react';
import { API_URL } from '../../helpers/api';
import { locationType } from '../../state/locations/locationsSlicer';
interface Props {
  location: locationType;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  isExpanded: boolean;
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
}

const Slides = ({
  location,
  setIsExpanded,
  isExpanded,
  current,
  setCurrent,
}: Props) => {
  let imageRef = useRef<HTMLImageElement>(null);
  const leftButtonRef = useRef<HTMLButtonElement>(null);
  const rightButtonRef = useRef<HTMLButtonElement>(null);
  let photosLength = location?.photos?.length - 1;

  //right slide button
  function handleRight() {
    if (current < photosLength) {
      return setCurrent((preVal) => preVal + 1);
    }
    return setCurrent(0);
  }

  //left slide button
  function handleLeft() {
    if (current > 0) {
      return setCurrent((preVal) => preVal - 1);
    }
    return setCurrent(photosLength);
  }
  //navigate slides with left and right arrows keys and
  // close the slide when escape key is pressed
  useEffect(() => {
    window.addEventListener('keydown', handleSlideKeydown);
    function handleSlideKeydown(e: KeyboardEvent) {
      if (e.key === 'ArrowRight') {
        handleRight();
      }
      if (e.key === 'ArrowLeft') {
        handleLeft();
      }
      if (e.key === 'Escape') {
        setIsExpanded(false);
      }
    }

    return () => {
      window.removeEventListener('keydown', handleSlideKeydown);
    };
  }, [current, photosLength]);

  function handleClickOutside(e: any) {
    let clickedOutside = !imageRef?.current?.contains(e.target);

    if (
      clickedOutside &&
      !leftButtonRef.current?.contains(e.target) &&
      !rightButtonRef.current?.contains(e.target)
    ) {
      setIsExpanded(false);
    } else {
      console.log('clicked inside');
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      //Remove the listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [imageRef, isExpanded]);
  return (
    <div
      className={`fixed bottom-0 w-full bg-white left-0 transition-all duration-200 ease-in-out  pb-4 ${
        isExpanded ? 'h-full' : 'h-0'
      }`}
    >
      <div className='bg- h-full flex justify-center items-center '>
        <div className='max-w-5xl m-auto px-3 py-4 w-full border-red-500'>
          <button
            onClick={() => setIsExpanded(false)}
            className='text-white text-2xl p-2 bg-custom-red rounded-full relative left-2 top-14 z-30 '
          >
            <Icon icon='mdi:close-thick' />
          </button>
          <div className='flex flex-col gap-2 mt-2 relative'>
            <div className='absolute flex justify-between items-center  px-2 w-full h-full'>
              <button
                onClick={handleLeft}
                className='text-white text-3xl p-1 bg-custom-red rounded-full z-30'
                ref={rightButtonRef}
              >
                <Icon icon='ph:arrow-left-bold' />
              </button>
              <button
                onClick={handleRight}
                className='text-white text-3xl p-1 bg-custom-red rounded-full z-30'
                ref={leftButtonRef}
              >
                <Icon icon='ph:arrow-right-bold' />
              </button>
            </div>

            {location?.photos && (
              <img
                ref={imageRef}
                className='rounded-md z-10'
                src={`${API_URL}/uploads/${location?.photos[current]}`}
                alt=''
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(Slides);
