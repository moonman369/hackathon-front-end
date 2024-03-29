/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <section className='bg-darkblue w-full overflow-hidden text-left text-white'>
      <div
        id='hero'
        className='flex flex-col-reverse items-center justify-center gap-y-12 xl:flex-row item h-[max-content] px-6 min-[600px]:px-[100px] md:px-[120px] xl:px-0 py-14'>
        <div className='box-border xl:basis-2/3 xl:pl-[120px]'>
          <h1 className='text-[46px] font-bold m-0 mb-4 text-center md:text-[52px] xl:text-left'>
            Interact with community, earn rewards
          </h1>
          <p className='text-base leading-[32px] m-0 mb-[42px] text-center md:w-9/12 md:mx-auto xl:mx-0 xl:text-left'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat
            nulla suspendisse tortor aenean dis placerat.
          </p>
          <div className='flex flex-col gap-y-3 md:flex-row gap-x-4 md:w-9/12 md:mx-auto xl:mx-0'>
            <Link
              href='/connect-wallet'
              className='no-underline w-full cursor-pointer [border:none] py-[20px] px-[32px] bg-blue rounded-61xl flex flex-row box-border items-center justify-center'>
              <b className='text-[16px] tracking-[1.6px] leading-[16px] uppercase text-white text-center font-bold'>
                GET STARTED
              </b>
            </Link>
            <Link
              href='/'
              className='no-underline w-full cursor-pointer [border:none] py-[20px] px-[32px] bg-gray-300 rounded-61xl flex flex-row box-border items-center justify-center'>
              <b className='text-[16px] tracking-[1.6px] leading-[16px] uppercase text-white text-center font-bold'>
                KNOW MORE
              </b>
            </Link>
          </div>
        </div>
        <picture className='mix-blend-luminosity'>
          <source
            className='w-full h-full object-cover'
            srcSet='hero-mobile.png'
            media='(max-width: 1279px)'
          />
          <source
            className='w-full h-full object-cover'
            srcSet='hero-bg.png'
            media='(min-width: 1280px)'
          />
          <img
            className='w-full h-full object-cover'
            src='hero-mobile.png'
            alt='Desktop Image'
          />
        </picture>
      </div>
      <div
        id='section-1'
        className='py-14 px-6 min-[600px]:px-[100px] md:px-[120px] xl:pb-[120px] xl:px-[120px]'>
        <h2 className='text-[36px] md:text-[42px] text-bold text-center m-0 mb-[16px]'>
          How it works?
        </h2>
        <p className='text-base xl:text-lg xl:leading-[32px] text-center m-0 mb-[80px] md:w-9/12 md:mx-auto'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat nulla
          suspendisse tortor aene.
        </p>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[24px]'>
          <div className='rounded-21xl bg-midnightblue px-[24px] py-[48px]'>
            <div className='rounded-xl bg-blue w-[4.25rem] h-[4.25rem] overflow-hidden flex flex-col items-center justify-center'>
              <div className='flex flex-row py-[0rem] px-[0rem] items-start justify-start'>
                <img
                  className='relative w-[2.63rem] h-[2.56rem] shrink-0 overflow-hidden opacity-[0.85]'
                  alt=''
                  src='/60e4a1e73807563947e7fb99-iconsectionabout1cryptotemplatesvg.svg'
                />
              </div>
            </div>
            <h3 className='tracking-[0.9px] leading-[1.62rem] uppercase m-0 mb-[8px] mt-[20px]'>
              ask and answer questions
            </h3>
            <p className='text-[1rem] leading-[1.63rem] flex items-center m-0'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat
              nulla suspendisse tortor aene.
            </p>
          </div>
          <div className='rounded-21xl bg-midnightblue px-[24px] py-[48px]'>
            <div className='rounded-xl bg-blue w-[4.25rem] h-[4.25rem] overflow-hidden flex flex-col items-center justify-center'>
              <div className='flex flex-row py-[0rem] px-[0rem] items-start justify-start'>
                <img
                  className='relative w-[2.63rem] h-[2.63rem] shrink-0 overflow-hidden opacity-[0.85]'
                  alt=''
                  src='/60e4a1e7380756fecde7fb9c-iconsectionabout2cryptotemplatesvg.svg'
                />
              </div>
            </div>
            <h3 className='tracking-[0.9px] leading-[1.62rem] uppercase m-0 mb-[8px] mt-[20px]'>
              see stats and upvotes
            </h3>
            <p className='text-[1rem] leading-[1.63rem] flex items-center m-0'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat
              nulla suspendisse tortor aene.
            </p>
          </div>
          <div className='relative min-h-[500px] md:col-span-2 xl:col-start-2 xl:col-end-r xl:row-start-1 xl:row-end-3 rounded-21xl bg-blue overflow-hidden'>
            <div className='px-[33px] py-[44px]'>
              <h3 className='tracking-[1px] text-[26px] leading-[26px] m-0 mb-[22px] uppercase'>
                INTERACT WITH COMMUNITY
              </h3>
              <p className='text-[16px] leading-[26px] flex items-center m-0'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                amet, morbi non at sed neque.
              </p>
            </div>
            <img
              className='absolute w-full h-full object-cover mix-blend-luminosity'
              alt=''
              src='/section1-bg.png'
            />
          </div>
          <div className='rounded-21xl bg-midnightblue px-[24px] py-[48px]'>
            <div className='rounded-xl bg-blue w-[4.25rem] h-[4.25rem] overflow-hidden flex flex-col items-center justify-center'>
              <div className='flex flex-row py-[0rem] px-[0rem] items-start justify-start'>
                <img
                  className='relative w-[2.69rem] h-[2.44rem] shrink-0 overflow-hidden opacity-[0.85]'
                  alt=''
                  src='/60e4a1e73807565f69e7fb9b-iconsectionabout3cryptotemplatesvg.svg'
                />
              </div>
            </div>
            <h3 className='tracking-[0.9px] leading-[1.62rem] uppercase m-0 mb-[8px] mt-[20px]'>
              get rewards
            </h3>
            <p className='text-[1rem] leading-[1.63rem] flex items-center m-0'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat
              nulla suspendisse tortor aene.
            </p>
          </div>
          <div className='rounded-21xl bg-midnightblue px-[24px] py-[48px]'>
            <div className='rounded-xl bg-blue w-[4.25rem] h-[4.25rem] overflow-hidden flex flex-col items-center justify-center'>
              <div className='flex flex-row py-[0rem] px-[0rem] items-start justify-start'>
                <img
                  className='relative w-[2.81rem] h-[2.81rem] shrink-0 overflow-hidden'
                  alt=''
                  src='/60e4a1e73807561d83e7fbc5-iconaboutdrive3cryptotemplatesvg.svg'
                />
              </div>
            </div>
            <h3 className='tracking-[0.9px] leading-[1.62rem] uppercase m-0 mb-[8px] mt-[20px]'>
              all decentralised
            </h3>
            <p className='text-[1rem] leading-[1.63rem] flex items-center m-0'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat
              nulla suspendisse tortor aene.
            </p>
          </div>
        </div>
      </div>
      <div
        id='section-2'
        className='py-14 px-6 min-[600px]:px-[100px] md:px-[120px] flex flex-col-reverse gap-y-16 xl:flex-row xl:py-[100px]'>
        <div className='w-full rounded-24 overflow-hidden'>
          <img
            className='w-full h-full object-contain xl:object-cover mix-blend-luminosity'
            src='/section2-bg.png'
            alt=''
          />
        </div>
        <div className='flex flex-col justify-center xl:px-[100px]'>
          <h2 className='text-[36px] md:text-[42px] font-bold m-0 mb-[20px]'>
            Earn daily rewards based on your interactions
          </h2>
          <p className='text-base xl:text-lg xl:leading-[32px] m-0 mb-[42px]'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat
            nulla suspendisse tortor aene.
          </p>
          <div className='flex flex-col items-start justify-start gap-[16px]'>
            <div className='flex flex-row items-center justify-start gap-[1.06rem]'>
              <div className='rounded-smi bg-blue w-[2.88rem] h-[2.88rem] shrink-0 overflow-hidden flex flex-col items-center justify-center'>
                <div className='flex flex-row items-start justify-start'>
                  <img
                    className='relative w-[2.01rem] h-[1.5rem] shrink-0 overflow-hidden'
                    alt=''
                    src='/60e4a1e738075608ade7fbc4-iconaboutdrive1cryptotemplatesvg1.svg'
                  />
                </div>
              </div>
              <p className='relative text-lg leading-[32px] m-0'>
                Ask and answer unique questions
              </p>
            </div>
            <div className='flex flex-row items-center justify-start gap-[1.06rem]'>
              <div className='rounded-smi bg-blue w-[2.88rem] h-[2.88rem] shrink-0 overflow-hidden flex flex-col items-center justify-center'>
                <div className='flex flex-row items-start justify-start'>
                  <img
                    className='relative w-[2.25rem] h-[2.31rem] shrink-0 overflow-hidden'
                    alt=''
                    src='/60e4a1e73807562c76e7fb9d-iconspec12cryptotemplatesvg.svg'
                  />
                </div>
              </div>
              <p className='relative text-lg leading-[32px] m-0'>
                Earn rewards in each interaction
              </p>
            </div>
            <div className='flex flex-row items-center justify-start gap-[1.06rem]'>
              <div className='rounded-smi bg-blue w-[2.88rem] h-[2.88rem] shrink-0 overflow-hidden flex flex-col items-center justify-center'>
                <div className='rounded-[521.74px] bg-white w-[1.5rem] h-[1.5rem] shrink-0 overflow-hidden flex flex-col items-center justify-center'>
                  <div className='w-[0.65rem] flex flex-row py-[0rem] px-[0rem] box-border items-start justify-start'>
                    <img
                      className='relative w-[0.65rem] h-[1.04rem] shrink-0 overflow-hidden'
                      alt=''
                      src='/60e4a1e73807567896e7fc49-icontoken3cryptotemplatesvg.svg'
                    />
                  </div>
                </div>
              </div>
              <p className='relative text-lg leading-[32px] m-0'>
                Instantly convert them to real ether
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
