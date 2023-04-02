import { Icon } from '@iconify/react';
import { Container } from '@mui/material';

const Footer = () => {
  return (
    <footer className='py-4 px-3 mt-14 bg-custom-red min-h-[35vh] flex items-center'>
      <div className='grid sm:grid-cols-2 md:grid-cols-4 max-w-6xl m-auto gap-6  justify-between'>
        <FooterContent
          header='ABOUT US'
          children={
            <>
              <Content
                info=' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti
            vel tenetur blanditiis? Soluta quam est debitis, quae molestiae
            aliquid reiciendis. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Iure, obcaecati.'
              />
            </>
          }
        />
        <FooterContent
          header='CUSTOMER SERVICE'
          children={
            <>
              <Content info='OUR LOCATION' />
              <Content info='TERMS AND CONDITIONS' />
              <Content info='FEEDBACK' />
              <Content info='CONTACT US' />
            </>
          }
        />

        <FooterContent
          header='MY PROFILE'
          children={
            <>
              <Content info='MY ACCOUNT' />
              <Content info='TERMS AND CONDITIONS' />
              <Content info='SUPPORT' />
              <Content info='HELP' />
            </>
          }
        />
        <FooterContent
          header='CONNECT WITH US'
          children={
            <>
              <Content
                info={
                  <div className='flex gap-4'>
                    <Icon
                      className='text-2xl hover:text-black cursor-pointer transition-all ease-out duration-200'
                      icon='ic:twotone-facebook'
                    />
                    <Icon
                      className='text-2xl hover:text-black cursor-pointer transition-all ease-out duration-200'
                      icon='ph:instagram-logo-fill'
                    />
                    <Icon
                      className='text-2xl hover:text-black cursor-pointer transition-all ease-out duration-200'
                      icon='mdi:linkedin'
                    />
                    <Icon
                      className='text-2xl hover:text-black cursor-pointer transition-all ease-out duration-200'
                      icon='ant-design:twitter-circle-filled'
                    />
                  </div>
                }
              />
            </>
          }
        />
      </div>
    </footer>
  );
};

export default Footer;

type FooterContentTypes = {
  header: string;
  children: JSX.Element | string;
};
const FooterContent = ({ header, children }: FooterContentTypes) => (
  <div>
    <h2 className='font-semibold  text-white '>{header}</h2>
    <ul className='flex flex-col gap-2 mt-1'>{children}</ul>
  </div>
);

const Content = ({ info }: { info: string | JSX.Element }) => (
  <li className='text-white text-xs'>{info}</li>
);
