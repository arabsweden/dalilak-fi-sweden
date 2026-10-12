import React from 'react';
import { X, Check } from 'lucide-react';
import { CHECKLIST_DATA, getLocalizedChecklistItem } from '../../data/checklist';
import { useLanguage } from '../../context/LanguageContext';

interface ChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  checkedItemIds: Set<string>;
  onToggleItem: (id: string) => void;
}

export const ChecklistModal: React.FC<ChecklistModalProps> = ({
  isOpen,
  onClose,
  checkedItemIds,
  onToggleItem,
}) => {
  const { language } = useLanguage();

  if (!isOpen) return null;

  const total = CHECKLIST_DATA.length;
  const completed = checkedItemIds.size;
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in duration-150">
        
        {/* Modal Header */}
        <div className="bg-emerald-700 text-white p-4 sm:p-5 flex items-start justify-between border-b border-emerald-800">
          <div>
            <div className="inline-block bg-white/20 text-emerald-100 text-[10px] px-2 py-0.5 rounded-full font-bold mb-1">
              {language === 'ar' ? 'Checklist تفاعلية للقادمين الجدد' : 'Interactive Newcomer Checklist'}
            </div>
            <h3 className="text-base sm:text-lg font-extrabold">
              {language === 'ar' ? 'وصلت السويد… ماذا أفعل الآن؟' : 'Arrived in Sweden… What Next?'}
            </h3>
            <p className="text-xs text-emerald-100">
              {language === 'ar'
                ? 'حدد المهام التي أنجزتها، واضغط على أي خطوة لفهم تفاصيلها الرسمية'
                : 'Track completed settlement tasks and review official step guidelines'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-emerald-800 text-emerald-100 hover:text-white flex items-center justify-center transition cursor-pointer active:scale-95 flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-5 pt-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
            <span>{language === 'ar' ? 'نسبة إنجاز مهام الاستقرار:' : 'Settlement progress:'}</span>
            <span className="text-emerald-700 font-extrabold">
              {percentage}% ({completed} {language === 'ar' ? 'من' : 'of'} {total})
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-2.5 flex-1">
          {CHECKLIST_DATA.map((rawItem) => {
            const item = getLocalizedChecklistItem(rawItem, language);
            const isChecked = checkedItemIds.has(item.id);
            return (
              <div
                key={item.id}
                onClick={() => onToggleItem(item.id)}
                className={`p-3 rounded-2xl border transition cursor-pointer flex items-start gap-3 ${
                  isChecked
                    ? 'bg-emerald-50/70 border-emerald-200'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div
                  className={`mt-0.5 w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 transition ${
                    isChecked ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold ${
                        isChecked ? 'line-through text-emerald-800 opacity-80' : 'text-slate-800'
                      }`}
                    >
                      {item.title}
                    </span>
                    <span className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold ms-1">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            {language === 'ar' ? 'يتم حفظ تقدمك تلقائياً في جلستك' : 'Your progress is automatically saved'}
          </span>
          <button
            onClick={onClose}
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer active:scale-95"
          >
            {language === 'ar' ? 'تم الحفظ' : 'Done'}
          </button>
        </div>

      </div>
    </div>
  );
};
