import { useContext, ChangeEvent } from 'react';

import { StyleContext } from '@/contexts/style-context';
import { TimerContext } from '@/contexts/sound-context';
import { SoundsContext } from '@/contexts/timer-context';

import { Label } from './ui/label';
import { Input } from './ui/input';

import { SoundsContextTypes, StyleContextTypes, TimeOptionTypes, TimerContextTypes } from '../types/index';

export default function TimeInputs() {
  const { font } = useContext<StyleContextTypes>(StyleContext);
  const { timerDuration, setTimerDuration } = useContext<TimerContextTypes>(TimerContext);
  const { playSwitchOnSfx } = useContext<SoundsContextTypes>(SoundsContext);

  const handleTimerDurationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const result = parseInt(value, 10) || 0;

    setTimerDuration((prevState:any) => ({
      ...prevState,
      [name]: result,
    }));

    playSwitchOnSfx();
  };

  const timeOptions = [
    {
      name: 'pomodoro',
      valueName: 'pomodoro',
      value: timerDuration.pomodoro as number,
    },
    {
      name: 'short break',
      valueName: 'shortBreak',
      value: timerDuration.shortBreak as number,
    },
    {
      name: 'long break',
      valueName: 'longBreak',
      value: timerDuration.longBreak as number,
    },
  ];

  const inputsDisplay = timeOptions.map(({ name, valueName, value }) => (
    <Label
      key={valueName}
      htmlFor={`timer-duration-${valueName}`}
      className={`relative flex items-center justify-between text-secondary md:flex-col md:items-start md:gap-2 ${font}`}
    >
      {name}
      <Input
        type='number'
        name={valueName}
        pattern='[0-9]*'
        id={`timer-duration-${valueName}`}
        value={value}
        onChange={handleTimerDurationChange}
        className='relative w-36 appearance-none rounded-lg bg-secondary-dark text-primary p-2 focus:outline-dashed focus:outline-primary-dark'
      />
    </Label>
  ));

  return (
    <form className='space-y-4 py-6 md:flex md:items-center md:gap-4 md:space-y-0'>
      {inputsDisplay}
    </form>
  );
}