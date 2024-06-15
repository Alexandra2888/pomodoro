"use client";

import { useState, useContext } from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';

import { StyleContext } from '@/contexts/style-context';
import { SoundsContext } from '@/contexts/timer-context';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

import { Button } from './ui/button';

import TimeInputs from './time-inputs';
import FontsList from './fonts-list';
import ColorsList from './color-list';


import settingsIcon from '../public/assets/icon-settings.svg';
import volumeIcon from '../public/assets/icon-volume.svg';
import muteIcon from '../public/assets/icon-mute.svg';


export default function Settings() {
  const { font } = useContext(StyleContext);
  const {
    volume,
    setVolume,
    playSwitchOnSfx,
    playSwitchOffSfx,
    enableSfx,
    disableSfx,
  } = useContext(SoundsContext);


  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    playSwitchOnSfx();
    setIsOpen(true);
          };

  const handleClose = () => {
    playSwitchOffSfx();
    setIsOpen(false);
  };

  const handleVolumeOn = () => {
    setVolume(1);
    enableSfx();
  };

  const handleVolumeOff = () => {
    setVolume(0);
    disableSfx();
  };

  const groupVariants: Variants = {
    initial: { opacity: 0, y: -10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        ease: 'easeIn',
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const childrenVariants: Variants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <>
      <div className='flex align-center'>
        <Dialog onOpenChange={handleOpen}>
         <motion.div
          initial='initial'
          animate='animate'
          variants={groupVariants}
          className='p-4'
        >
      <DialogTrigger asChild>
            <Button variant="outline" className='text-white'>
              <Image src={settingsIcon} alt='settings' className='mx-2' width={20} height={20} />
              Settings
            </Button>
      </DialogTrigger>
     <DialogContent className={` mx-auto w-full max-w-2xl rounded-3xl bg-primary pb-8 ${font} text-secondary`}>
            <motion.div
              variants={childrenVariants}
              className='flex items-center justify-between p-6'
            >
              <DialogHeader>
                <DialogTitle className='text-h2'>Settings</DialogTitle>
              </DialogHeader>
            </motion.div>

            <div className='h-0.5 w-full bg-secondary-dark' />

            <motion.div variants={childrenVariants} className='p-6'>
              <TimeInputs />
              <FontsList />
              <ColorsList />
            </motion.div>

            <DialogFooter>
              <DialogTrigger asChild>
              <Button 
                type='button'
                onClick={handleClose}
                className='absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-red p-4 px-12 text-secondary transition-all duration-300 hover:scale-90 focus:rounded-full focus:outline-dashed focus:outline-primary'
              >
                Apply
                </Button>
                </DialogTrigger>
            </DialogFooter>
          </DialogContent>
         </motion.div>
        </Dialog>
      <div className=' flex items-center justify-center gap-4'>
        <Button
          type='button'
          onClick={() => (volume === 1 ? handleVolumeOff() : handleVolumeOn())}
          className='focus:rounded-full focus:outline-dashed focus:outline-tertiary'
        >
          {volume === 1 ? (
            <Image src={volumeIcon} alt='volume' />
          ) : (
            <Image src={muteIcon} alt='mute' />
          )}
        </Button>
      </div>
      
        </div>
    </>
  );
}
