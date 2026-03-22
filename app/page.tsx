"use client"

import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DraggableOption, type OptionItem } from './components/DraggableOption';
import { DropZone } from './components/DropZone';
import { PercentageDialog } from './components/PercentageDialog';
import { DroppedItem, type DroppedItemData } from './components/DroppedItem';
import { Sparkles } from 'lucide-react';

const availableOptions: OptionItem[] = [
  { id: '1', name: 'Cotton', color: '#f5b5ba' },
  { id: '2', name: 'Polyester', color: '#a8c9d4' },
  { id: '3', name: 'Wool', color: '#f4c96b' },
  { id: '4', name: 'Cashmere', color: '#d9594c' },
  { id: '5', name: 'Spandex', color: '#e8a5a5' },
  { id: '6', name: 'Silk', color: '#f5d5c0' },
  { id: '7', name: 'Linen', color: '#c8d9d4' },
  { id: '8', name: 'Rayon', color: '#f4d89f' },
];

export default function App() {
  const [droppedItems, setDroppedItems] = useState<DroppedItemData[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingItem, setPendingItem] = useState<OptionItem | null>(null);

  const totalPercentage = droppedItems.reduce((sum, item) => sum + item.percentage, 0);
  const isComplete = totalPercentage === 100;

  const handleDrop = (item: OptionItem) => {
    setPendingItem(item);
    setDialogOpen(true);
  };

  const handleConfirmPercentage = (percentage: number) => {
    if (pendingItem) {
      const newItem: DroppedItemData = {
        id: `${pendingItem.id}-${Date.now()}`,
        name: pendingItem.name,
        color: pendingItem.color,
        percentage,
      };
      setDroppedItems([...droppedItems, newItem]);
    }
    setDialogOpen(false);
    setPendingItem(null);
  };

  const handleCancelPercentage = () => {
    setDialogOpen(false);
    setPendingItem(null);
  };

  const handleRemoveItem = (id: string) => {
    setDroppedItems(droppedItems.filter((item) => item.id !== id));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="size-full flex bg-[#f5f0e8]">
        {/* Left Sidebar */}
        <div className="w-80 bg-[#fefdfb] border-r border-[#d9594c]/20 p-6 overflow-y-auto shadow-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#d9594c] mb-2">
              Fabric Options
            </h2>
            <p className="text-[#8b7355] text-sm">Drag fabrics to create your blend</p>
          </div>
          
          <div className="space-y-2">
            {availableOptions.map((option) => (
              <DraggableOption key={option.id} option={option} />
            ))}
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-[#d9594c] mb-2">
              Fabric Composition
            </h1>
            <p className="text-[#8b7355] mb-4">
              Create your perfect fabric blend
            </p>

            {/* Progress Bar */}
            <div className="mb-6 p-4 bg-[#fefdfb] rounded-2xl border-2 border-[#d9594c]/30 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[#8b7355]">Total Composition</span>
                <span className={`text-sm font-bold ${isComplete ? 'text-[#6b9e78]' : totalPercentage > 100 ? 'text-[#d9594c]' : 'text-[#d9594c]'}`}>
                  {totalPercentage.toFixed(1)}%
                </span>
              </div>
              <div className="h-3 bg-[#f5f0e8] rounded-full overflow-hidden border border-[#d9594c]/20">
                <div
                  className={`h-full transition-all ${
                    isComplete ? 'bg-[#6b9e78]' :
                    totalPercentage > 100 ? 'bg-[#d9594c]' :
                    'bg-[#f4c96b]'
                  }`}
                  style={{ width: `${Math.min(totalPercentage, 100)}%` }}
                />
              </div>
              {totalPercentage > 100 && (
                <p className="text-xs text-[#d9594c] mt-2">⚠️ Total exceeds 100%</p>
              )}
            </div>

            <DropZone onDrop={handleDrop}>
              {droppedItems.length === 0 ? (
                <div className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <div className="text-6xl mb-4">👗</div>
                    <p className="text-[#8b7355] text-lg font-medium">
                      Drag fabrics here to start creating
                    </p>
                    <p className="text-[#b5a084] text-sm mt-2">
                      Mix and match to reach 100%
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  {droppedItems.map((item) => (
                    <DroppedItem
                      key={item.id}
                      item={item}
                      onRemove={handleRemoveItem}
                    />
                  ))}
                  
                  {/* Success Message */}
                  {isComplete && (
                    <div className="mt-6 p-6 bg-[#e8f4ea] rounded-2xl border-2 border-[#6b9e78] text-center animate-in fade-in slide-in-from-bottom-4 shadow-md">
                      <Sparkles className="size-12 mx-auto mb-3 text-[#6b9e78]" />
                      <h3 className="text-2xl font-bold text-[#4a7c59] mb-2">
                        Perfect Blend! ✨
                      </h3>
                      <p className="text-[#5a8c68] mb-4">
                        Your fabric composition is complete at 100%
                      </p>
                      <div className="bg-white/80 rounded-xl p-4 inline-block shadow-sm">
                        <p className="text-sm font-medium text-[#4a7c59] mb-2">Fabric Formula:</p>
                        <div className="text-left space-y-1">
                          {droppedItems.map((item, index) => (
                            <div key={item.id} className="flex items-center gap-2">
                              <div 
                                className="w-4 h-4 rounded-full border border-white/50" 
                                style={{ backgroundColor: item.color }}
                              />
                              <span className="text-sm text-[#4a7c59]">
                                {item.percentage}% {item.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </DropZone>
          </div>
        </div>

        {/* Percentage Dialog */}
        <PercentageDialog
          isOpen={dialogOpen}
          itemName={pendingItem?.name || ''}
          onConfirm={handleConfirmPercentage}
          onCancel={handleCancelPercentage}
        />
      </div>
    </DndProvider>
  );
}