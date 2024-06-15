"use client";

import { useContext, useEffect } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { motion, Variants } from 'framer-motion';

import { StyleContext } from '@/contexts/style-context';
import { SoundsContext } from '@/contexts/timer-context';
import { TimerContext } from '@/contexts/sound-context';

import { TimeOptionTypes } from '../types/index';

export default function TimerToggler() {
  const { color } = useContext(StyleContext);
  const {
    timeOption,
    setTimeOption,
    handleStopClick,
    handleResetClick,
    timerDuration,
  } = useContext(TimerContext);
  const { playToggleSfx } = useContext(SoundsContext);

  const activeColor: string =
    // eslint-disable-next-line no-nested-ternary
    color === 'red' ? 'bg-red' : color === 'cyan' ? 'bg-cyan' : 'bg-violet';

  const timeOptions: TimeOptionTypes[] = [
    { id: 1, name: 'pomodoro', value: 'pomodoro' },
    { id: 2, name: 'short break', value: 'shortBreak' },
    { id: 3, name: 'long break', value: 'longBreak' },
  ];

  useEffect(() => {
    handleResetClick();
    handleStopClick();
  }, [timerDuration, timeOption]);

  const groupVariants: Variants = {
    initial: { opacity: 0, y: -10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        ease: 'easeIn',
        duration: 0.5,
        delayChildren: 0.7,
        staggerChildren: 0.3,
      },
    },
  };

  const buttonVariants: Variants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial='initial'
      animate='animate'
      variants={groupVariants}
      className='m-11 w-full'
    >
      <RadioGroup
        value={timeOption}
        onValueChange={(value) => {
          setTimeOption(value);
          playToggleSfx();
        }}
        className='grid grid-cols-3 items-center justify-between gap-4 rounded-full bg-primary-dark p-2 text-body-2 tracking-wide'
      >
        {timeOptions.map(({ id, name, value }) => (
          <div key={id} className='w-full'>
            <RadioGroupItem
              value={value}
              id={`time-option-${value}`}
              className='hidden'
            />
            <motion.button
              type='button'
              layout
              variants={buttonVariants}
              onClick={() => setTimeOption(value)}
              className={`flex w-full items-center justify-center rounded-full py-4 text-center transition-all duration-100 ease-in hover:text-secondary focus:rounded-full focus:outline-dashed focus:outline-tertiary md:text-base ${
                timeOption === value ? `${activeColor} text-primary-dark` : `text-tertiary`
              }`}
            >
              {name}
            </motion.button>
          </div>
        ))}
      </RadioGroup>
    </motion.div>
  );
}