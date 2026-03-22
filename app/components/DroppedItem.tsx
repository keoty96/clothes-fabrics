import { X } from 'lucide-react';
import { Button } from './ui/button';

export interface DroppedItemData {
  id: string;
  name: string;
  color: string;
  percentage: number;
}

interface DroppedItemProps {
  item: DroppedItemData;
  onRemove: (id: string) => void;
}

export function DroppedItem({ item, onRemove }: DroppedItemProps) {
  return (
    <div
      className="p-4 rounded-xl shadow-md mb-3 flex items-center justify-between border border-white/30"
      style={{ backgroundColor: item.color }}
    >
      <div className="flex-1">
        <p className="text-[#5a4a3a] font-semibold mb-1">{item.name}</p>
        <div className="bg-white/40 rounded-full h-2 w-full overflow-hidden border border-white/20">
          <div
            className="bg-white h-full transition-all"
            style={{ width: `${item.percentage}%` }}
          />
        </div>
        <p className="text-[#5a4a3a] text-sm mt-1 font-medium">{item.percentage}%</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="ml-4 text-[#5a4a3a] hover:bg-white/40 hover:text-[#3a2a1a]"
        onClick={() => onRemove(item.id)}
      >
        <X className="size-4" />
      </Button>
    </div>
  );
}