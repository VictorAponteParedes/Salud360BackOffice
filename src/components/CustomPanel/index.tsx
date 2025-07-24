import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

type CustomPanelProps = {
  header: ReactNode;
  children: ReactNode;
  toggleable?: boolean;
  className?: string;
  collapsed?: boolean;
};

export const CustomPanel = ({
  header,
  children,
  toggleable = true,
  className = '',
  collapsed = false
}: CustomPanelProps) => {
  const { isDark } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  const togglePanel = () => {
    if (toggleable) {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <div className={`rounded-lg overflow-hidden ${className} ${
      isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
    } border`}>
      
      <div 
        className={`flex items-center justify-between p-4 cursor-pointer ${
          isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-50'
        } transition-colors`}
        onClick={togglePanel}
      >
        <div className="flex items-center gap-2">
          {header}
        </div>
        {toggleable && (
          <div className="text-gray-500">
            {isCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </div>
        )}
      </div>

      <AnimatePresence initial={false}>
        {(!isCollapsed || !toggleable) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: 'auto', 
              opacity: 1,
              transition: { 
                height: { duration: 0.3, ease: 'easeInOut' },
                opacity: { duration: 0.2, delay: 0.1 }
              }
            }}
            exit={{ 
              height: 0, 
              opacity: 0,
              transition: { 
                height: { duration: 0.3, ease: 'easeInOut' },
                opacity: { duration: 0.2 }
              }
            }}
            className={`overflow-hidden ${
              isDark ? 'text-gray-200' : 'text-gray-800'
            }`}
          >
            <div ref={contentRef} className="p-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};