import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { TOAST_TYPES } from '../../hooks/useToast';

const icons = {
  [TOAST_TYPES.SUCCESS]: CheckCircle2,
  [TOAST_TYPES.ERROR]: XCircle,
  [TOAST_TYPES.WARNING]: AlertTriangle,
  [TOAST_TYPES.INFO]: Info
};

const colors = {
  [TOAST_TYPES.SUCCESS]: {
    bg: 'bg-green-500/10 border-green-500/30',
    icon: 'text-green-500',
    text: 'text-green-400'
  },
  [TOAST_TYPES.ERROR]: {
    bg: 'bg-red-500/10 border-red-500/30',
    icon: 'text-red-500',
    text: 'text-red-400'
  },
  [TOAST_TYPES.WARNING]: {
    bg: 'bg-amber-500/10 border-amber-500/30',
    icon: 'text-amber-500',
    text: 'text-amber-400'
  },
  [TOAST_TYPES.INFO]: {
    bg: 'bg-blue-500/10 border-blue-500/30',
    icon: 'text-blue-500',
    text: 'text-blue-400'
  }
};

export default function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = icons[toast.type] || Info;
          const colorSet = colors[toast.type] || colors[TOAST_TYPES.INFO];
          
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className={`
                flex items-start gap-3 p-4 rounded-xl border backdrop-blur-sm
                ${colorSet.bg}
              `}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${colorSet.icon}`} />
              <p className={`flex-1 text-sm ${colorSet.text}`}>{toast.message}</p>
              <button
                onClick={() => onRemove(toast.id)}
                className="flex-shrink-0 text-slate-400 hover:text-slate-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
