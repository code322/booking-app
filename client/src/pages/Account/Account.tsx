import { Link, useParams } from 'react-router-dom';
import Container from '../../components/Container/Container';
import { useAppSelector } from '../../hooks/userTypeSelector';
import { userSelector } from '../../state/authSlicer/authSlicer';
import { useEffect, useState } from 'react';
import Location from '../Location/Location';

function Account() {
  const user = useAppSelector(userSelector);
  const [active, setActive] = useState<string>('profile');

  function handleClick(title: string) {
    setActive(title);
  }

  const { subpages } = useParams();
  console.log(subpages);
  return (
    <Container>
      <nav className='w-full flex mt-8 gap-4 justify-center'>
        <Navs title='profile' handleClick={handleClick} active={active} />
        <Navs
          title='bookings'
          path='/account/bookings'
          handleClick={handleClick}
          active={active}
        />
        <Navs
          title='accommodation'
          path='/account/places'
          handleClick={handleClick}
          active={active}
        />
      </nav>
      {active === 'accommodation' ? <Location /> : <></>}
    </Container>
  );
}

export default Account;
type navTypes = {
  title: string;
  path?: string;
  active?: string;
  handleClick: (title: string) => void;
};
const Navs = ({ title, path = '/account', handleClick, active }: navTypes) => {
  let navClass = () => {
    let style = 'capitalize px-3 py-2 flex items-center text-center';
    if (title === active) {
      style += ' bg-custom-red rounded-md text-white';
    }
    return style;
  };

  return (
    <Link className={navClass()} onClick={() => handleClick(title)} to={path}>
      {title}
    </Link>
  );
};
