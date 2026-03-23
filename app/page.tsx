"use client"

import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DraggableOption, type OptionItem } from './components/DraggableOption';
import { DropZone } from './components/DropZone';
import { PercentageDialog } from './components/PercentageDialog';
import { DroppedItem, type DroppedItemData } from './components/DroppedItem';
import { Sparkles } from 'lucide-react';

const goodFabrics = ["cotton", "linen", "wool", "cashmere", "silk", "hemp", "tencel", "modal"];
const badFabrics = ["polyester", "nylon", "viscose", "rayon", "elastene", "spandex", "acrylic", "acetate"];

const availableOptions: OptionItem[] = [
  { id: '1', name: 'Cotton', color: '#f5b5ba' },
  { id: '2', name: 'Polyester', color: '#a8c9d4' },
  { id: '3', name: 'Wool', color: '#f4c96b' },
  { id: '4', name: 'Cashmere', color: '#d9594c' },
  { id: '5', name: 'Spandex', color: '#e8a5a5' },
  { id: '6', name: 'Silk', color: '#f5d5c0' },
  { id: '7', name: 'Linen', color: '#c8d9d4' },
  { id: '8', name: 'Rayon', color: '#f4d89f' },
  { id: '9', name: 'Hemp', color: '#7FB77E' },
  { id: '10', name: 'Tencel', color: '#BDA6CE' },
  { id: '11', name: 'Modal', color: '#2FA4D7' },
  { id: '12', name: 'Nylon', color: '#B0E4CC' },
  { id: '13', name: 'Viscose', color: '#DDAED3' },
  { id: '14', name: 'Elastene', color: '#FDACAC' },
  { id: '15', name: 'Spandex', color: '#F7E396' },
  { id: '16', name: 'Acrylic', color: '#8CA9FF' },
  { id: '17', name: 'Acetate', color: '#EDA35A' },
];

export default function App() {
  const [droppedItems, setDroppedItems] = useState<DroppedItemData[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingItem, setPendingItem] = useState<OptionItem | null>(null);

  const totalPercentage = droppedItems.reduce((sum, item) => sum + item.percentage, 0);
  const isComplete = totalPercentage === 100;

  // Calculate quality scores
  const goodScore = droppedItems.reduce((sum, item) => {
    if (goodFabrics.includes(item.name.toLowerCase())) {
      return sum + item.percentage;
    }
    return sum;
  }, 0);

  const badScore = droppedItems.reduce((sum, item) => {
    if (badFabrics.includes(item.name.toLowerCase())) {
      return sum + item.percentage;
    }
    return sum;
  }, 0);

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

   const handleClear = () => {
    setDroppedItems([]);
  };

  // Determine quality rating
  const getQualityRating = () => {
    if (goodScore >= 70 && badScore <= 30) {
      return {
        title: "High Quality",
        message: "Buy it (durable, breathable, long-term).",
        color: "#6b9e78"
      };
    } else if (goodScore >= 50 && goodScore <= 69) {
      return {
        title: "Medium Quality",
        message: "(okay if you love style/price).",
        color: "#f4c96b"
      };
    } else if ((goodScore > 0 && goodScore < 50) || badScore > 50) {
      return {
        title: "Low Quality",
        message: "(fast fashion, short lifespan).",
        color: "#d9594c"
      };
    }
    return null;
  };

  const qualityRating = getQualityRating();

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

          {/* Clear Button */}
          {droppedItems.length > 0 && (
            <button 
              onClick={handleClear}
              className="mt-6 w-full bg-[#d9594c] text-white font-semibold p-3 rounded-xl hover:bg-[#c24a3d] transition-colors"
            >
              Clear All
            </button>
          )}
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
                  
                  {/* Success Message with Quality Rating */}
                  {isComplete && qualityRating && (
                    <div 
                      className="mt-6 p-6 rounded-2xl border-2 text-center animate-in fade-in slide-in-from-bottom-4 shadow-md"
                      style={{ 
                        backgroundColor: `${qualityRating.color}15`,
                        borderColor: qualityRating.color
                      }}
                    >
                      <Sparkles className="size-12 mx-auto mb-3" style={{ color: qualityRating.color }} />
                      <h3 className="text-2xl font-bold mb-2" style={{ color: qualityRating.color }}>
                        {qualityRating.title} ✨
                      </h3>
                      <p className="mb-4" style={{ color: qualityRating.color }}>
                        {qualityRating.message}
                      </p>
                      <div className="bg-white/80 rounded-xl p-4 inline-block shadow-sm">
                        <p className="text-sm font-medium mb-2" style={{ color: qualityRating.color }}>
                          Fabric Formula:
                        </p>
                        <div className="text-left space-y-1">
                          {droppedItems.map((item) => (
                            <div key={item.id} className="flex items-center gap-2">
                              <div 
                                className="w-4 h-4 rounded-full border border-white/50" 
                                style={{ backgroundColor: item.color }}
                              />
                              <span className="text-sm" style={{ color: qualityRating.color }}>
                                {item.percentage}% {item.name}
                              </span>
                            </div>
                          ))}
                        </div>
                        
                        {/* Score Breakdown */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <p className="text-xs text-gray-600">
                            Good fabrics: {goodScore.toFixed(1)}% | Bad fabrics: {badScore.toFixed(1)}%
                          </p>
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