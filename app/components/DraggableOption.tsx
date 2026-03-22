import { useDrag } from 'react-dnd';

export interface OptionItem {
  id: string;
  name: string;
  color: string;
}

interface DraggableOptionProps {
  option: OptionItem;
}

export function DraggableOption({ option }: DraggableOptionProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'option',
    item: option,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag as unknown as React.Ref<HTMLDivElement>}
      className="p-4 mb-3 rounded-xl cursor-move transition-all hover:shadow-lg hover:scale-105 border border-white/30"
      style={{
        backgroundColor: option.color,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <p className="text-[#5a4a3a] font-semibold">{option.name}</p>
    </div>
  );
}