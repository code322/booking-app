import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../../components/Container/Container';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypeSelector';
import { API_URL } from '../../helpers/api';
import Account from '../Account/Account';
import { Icon } from '@iconify/react';
import Modal from '../../components/Modal/Modal';
import { modalType } from '../MyBooking/MyBooking';
import ModalMessage from '../../components/ModalMessage/ModalMessage';
import List from '../../components/Lists/MyListingList';
import { selectUser } from '../../state/authSlicer/authSlicer';
import {
  deleteUserList,
  getUserList,
  selectUsersList,
} from '../../state/userListSlice/userListSlice';
import { idsType } from '../../state/userListSlice/userListTypes';

function Listing() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<modalType>({
    title: '',
    location: '',
    message: '',
    id: 0,
  });

  useEffect(() => {
    document.body.style.overflow = 'unset';
    if (showModal) {
      document.body.style.overflow = 'hidden';
    }
  }, [showModal]);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserList(user.id) as any);
  }, [dispatch, user]);

  const locationsList = useAppSelector(selectUsersList);
  function handleYes() {
    let ids: idsType = {
      id: user.id,
      listId: modalInfo.id,
    };
    dispatch(deleteUserList(ids) as any);
    setShowModal(false);
  }
  return (
    <Container>
      <div className='flex flex-col sm:flex-row gap-6'>
        <Account />
        <Modal
          showModal={showModal}
          handleNo={() => {
            setShowModal(false);
          }}
          handleYes={handleYes}
        >
          <ModalMessage modalInfo={modalInfo} />
        </Modal>
        <ul className='flex flex-col gap-4 flex-1'>
          {locationsList &&
            locationsList.map((items, index) => {
              return (
                <List
                  items={items}
                  index={index}
                  setModalInfo={setModalInfo}
                  setShowModal={setShowModal}
                />
              );
            })}
        </ul>
      </div>
    </Container>
  );
}

export default Listing;
