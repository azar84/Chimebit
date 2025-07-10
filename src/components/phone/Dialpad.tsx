import React from 'react';
import { Button } from '../ui/Button';
import { 
  Phone, 
  Hash, 
  Asterisk,
  ArrowLeft,
  Plus
} from 'lucide-react';

interface DialpadProps {
  onNumberPress: (number: string) => void;
  onDelete: () => void;
  onCall: () => void;
  disabled?: boolean;
}

export const Dialpad: React.FC<DialpadProps> = ({
  onNumberPress,
  onDelete,
  onCall,
  disabled = false
}) => {
  const dialpadButtons = [
    { number: '1', letters: '' },
    { number: '2', letters: 'ABC' },
    { number: '3', letters: 'DEF' },
    { number: '4', letters: 'GHI' },
    { number: '5', letters: 'JKL' },
    { number: '6', letters: 'MNO' },
    { number: '7', letters: 'PQRS' },
    { number: '8', letters: 'TUV' },
    { number: '9', letters: 'WXYZ' },
    { number: '*', letters: '' },
    { number: '0', letters: '+' },
    { number: '#', letters: '' },
  ];

  const handleKeyPress = (e: React.KeyboardEvent) => {
    const key = e.key;
    if (key >= '0' && key <= '9') {
      onNumberPress(key);
    } else if (key === '*') {
      onNumberPress('*');
    } else if (key === '#') {
      onNumberPress('#');
    } else if (key === '+' || key === '=') {
      onNumberPress('+');
    } else if (key === 'Backspace' || key === 'Delete') {
      onDelete();
    } else if (key === 'Enter') {
      onCall();
    }
  };

  return (
    <div 
      className="w-full max-w-xs mx-auto"
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      <div className="grid grid-cols-3 gap-3">
        {dialpadButtons.map((button) => (
          <Button
            key={button.number}
            variant="outline"
            size="lg"
            onClick={() => onNumberPress(button.number)}
            disabled={disabled}
            className="h-14 flex flex-col items-center justify-center space-y-1 bg-white hover:bg-gray-50 border-gray-300"
          >
            <span className="text-xl font-semibold text-gray-900">
              {button.number === '*' ? <Asterisk className="w-5 h-5" /> : 
               button.number === '#' ? <Hash className="w-5 h-5" /> : 
               button.number === '0' ? (
                 <div className="flex items-center space-x-1">
                   <span>0</span>
                   <Plus className="w-3 h-3" />
                 </div>
               ) : button.number}
            </span>
            {button.letters && (
              <span className="text-xs text-gray-500 font-medium">
                {button.letters}
              </span>
            )}
          </Button>
        ))}
      </div>
      
      {/* Call and Delete buttons */}
      <div className="flex justify-center space-x-4 mt-4">
        <Button
          variant="outline"
          size="lg"
          onClick={onDelete}
          disabled={disabled}
          className="h-14 w-14 rounded-full bg-white hover:bg-gray-50 border-gray-300"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={onCall}
          disabled={disabled}
          className="h-14 w-14 rounded-full bg-green-600 hover:bg-green-700"
        >
          <Phone className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}; 