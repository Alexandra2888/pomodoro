import { useContext } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Image from 'next/image';

import { StyleContext } from '@/contexts/style-context';
import { SoundsContext } from '@/contexts/timer-context';

import checkmark from '../public/assets/icon-checkmark.svg';

import { StyleItemTypes } from '../types/index';

import { Button } from './ui/button';


export default function FontsList() {
  const { color, setColor } = useContext(StyleContext);
  const { playBiteSfx } = useContext(SoundsContext);

  const colorOptions: StyleItemTypes[] = [
    { id: 1, value: 'red' },
    { id: 2, value: 'cyan' },
    { id: 3, value: 'violet' },
  ];

  return (
    <div className='flex flex-col items-center justify-between gap-4 border-t border-tertiary py-4 md:flex-row'>
      <span>Colors</span>

      <RadioGroup
        value={color}
        onValueChange={(value) => setColor(value)}
        className='flex items-center justify-end gap-4'
      >
        {colorOptions.map(({ id, value }) => (
          <div key={id} className='flex items-center space-x-2'>
            <RadioGroupItem
              value={value}
              id={`color-${value}`}
              className='focus:rounded-full focus:outline-dashed focus:outline-primary-dark'
            />
            <Button
              type='button'
              onClick={() => {
                playBiteSfx();
                setColor(value);
              }}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:ring-1 hover:ring-tertiary hover:ring-offset-4 focus:rounded-full focus:outline-dashed focus:outline-primary-dark bg-${value}`}
            >
              {color === value && (
                <Image src={checkmark} alt='checkmark' className='h-8 w-8' />
              )}
            </Button>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}