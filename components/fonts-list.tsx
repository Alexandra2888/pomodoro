import { useContext } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { StyleContext } from '@/contexts/style-context';
import { SoundsContext } from '@/contexts/timer-context';

import { StyleItemTypes } from '../types/index';


export default function FontsList() {
  const { font, setFont } = useContext(StyleContext);
  const { playBiteSfx } = useContext(SoundsContext);

  const fontOptions: StyleItemTypes[] = [
    { id: 1, value: 'font-kumbh-sans' },
    { id: 2, value: 'font-roboto-slab' },
    { id: 3, value: 'font-space-mono' },
  ];

  return (
    <div className='flex flex-col items-center justify-between gap-4 border-t border-tertiary py-4 md:flex-row'>
      <span>Fonts</span>

      <RadioGroup
        value={font}
        onValueChange={(value) => {
          setFont(value);
          playBiteSfx();
        }}
        className='flex items-center justify-end gap-4'
      >
        {fontOptions.map(({ id, value }) => (
          <div key={id} className='flex items-center space-x-2'>
            <RadioGroupItem
              value={value}
              id={`font-${value}`}
              className='hidden'
            />
            <button
              type='button'
              onClick={() => setFont(value)}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:ring-1 hover:ring-tertiary hover:ring-offset-4 focus:rounded-full focus:outline-dashed focus:outline-primary-dark ${value} ${
                font === value ? 'bg-primary-dark text-tertiary' : 'bg-secondary-dark text-primary'
              }`}
            >
              Aa
            </button>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}