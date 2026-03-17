import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';

interface PercentageDialogProps {
  isOpen: boolean;
  itemName: string;
  onConfirm: (percentage: number) => void;
  onCancel: () => void;
}

export function PercentageDialog({ isOpen, itemName, onConfirm, onCancel }: PercentageDialogProps) {
  const [percentage, setPercentage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleConfirm = () => {
    const num = parseFloat(percentage);
    if (isNaN(num) || num < 0 || num > 100) {
      setError('Please enter a valid percentage between 0 and 100');
      return;
    }
    onConfirm(num);
    setPercentage('');
    setError('');
  };

  const handleCancel = () => {
    setPercentage('');
    setError('');
    onCancel();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="bg-[#fefdfb] border-2 border-[#d9594c]/30">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#d9594c]">
            Set Percentage for {itemName}
          </DialogTitle>
          <DialogDescription className="text-[#8b7355]">
            Enter a percentage value between 0 and 100 for this fabric.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Label htmlFor="percentage" className="mb-2 block text-[#5a4a3a] font-medium">
            Percentage (%)
          </Label>
          <Input
            id="percentage"
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={percentage}
            onChange={(e) => {
              setPercentage(e.target.value);
              setError('');
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleConfirm();
              }
            }}
            placeholder="Enter percentage"
            className="border-[#d9594c]/30 focus:border-[#d9594c] focus:ring-[#d9594c]"
            autoFocus
          />
          {error && <p className="text-sm text-[#d9594c] mt-2">{error}</p>}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel} className="border-[#d9594c]/30 text-[#8b7355] hover:bg-[#f5f0e8]">
            Cancel
          </Button>
          <Button onClick={handleConfirm} className="bg-[#d9594c] hover:bg-[#c54a3d] text-white">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}