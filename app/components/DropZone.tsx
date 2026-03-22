import { useDrop } from 'react-dnd';
import type { OptionItem } from './DraggableOption';

interface DropZoneProps {
  onDrop: (item: OptionItem) => void;
  children: React.ReactNode;
}

export function DropZone({ onDrop, children }: DropZoneProps) {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'option',
    drop: (item: OptionItem) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div
      ref={drop as unknown as React.Ref<HTMLDivElement>}
      className="h-full w-full p-6 rounded-2xl border-2 border-dashed transition-all shadow-sm"
      style={{
        borderColor: isOver ? '#d9594c' : canDrop ? '#f4c96b' : '#d9c4b0',
        backgroundColor: isOver ? '#fef5f1' : '#fefdfb',
      }}
    >
      {children}
    </div>
  );
}