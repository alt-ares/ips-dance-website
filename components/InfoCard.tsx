"use client";

import { motion } from "framer-motion";
import { anchorTransition } from "@/lib/animations";
import { useReducedMotion } from "@/lib/hooks";

interface InfoCardProps {
  title: string;
  subtitle?: string;
  content: string;
  href: string;
  icon?: string;
  notification?: boolean;
  rightContent?: string;
  circularIcon?: boolean;
  progressBar?: boolean;
  progressValue?: number;
  bottomText?: string;
  bottomRightContent?: string;
  extraContent?: string;
  extraContent2?: string;
  uniformDates?: boolean;
  highlightNextDate?: boolean;
  large?: boolean;
  small?: boolean;
}

export function InfoCard({ 
  title, 
  subtitle, 
  content, 
  href, 
  icon, 
  notification = false,
  rightContent,
  circularIcon = false,
  progressBar = false,
  progressValue = 70,
  bottomText,
  bottomRightContent,
  extraContent,
  extraContent2,
  uniformDates = false,
  highlightNextDate = false,
  large = false,
  small = false
}: InfoCardProps) {
  const reducedMotion = useReducedMotion();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    const scrollToTarget = () => {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    };

    if (reducedMotion) {
      scrollToTarget();
    } else {
      anchorTransition(scrollToTarget);
    }
  };

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      className={`group relative block w-full max-w-sm ${small ? 'flex-none' : 'flex-1'}`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className={`glass rounded-2xl cursor-glow relative overflow-hidden ${small ? 'h-auto flex items-center' : 'h-full flex flex-col'} ${large ? 'p-8' : small ? 'p-4' : 'p-6'}`}>
        {/* Notification dot */}
        {notification && (
          <div className="absolute top-4 right-4 w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
        )}
        
        {/* Header */}
        <div className={`flex items-center justify-between w-full ${small ? '' : 'mb-3'}`}>
          <h3 className={`font-grotesk font-bold text-white ${large ? 'text-xl' : small ? 'text-base' : 'text-lg'}`}>
            {title}
          </h3>
          <div className="flex items-center justify-center gap-2">
            {icon && (
              <span className="text-brand-orange text-sm">{icon}</span>
            )}
            <motion.div
              className="w-4 h-4 text-white flex items-center justify-center"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className={`space-y-2 ${large ? 'space-y-3' : ''} ${small ? '' : 'flex-1 flex flex-col justify-center'}`}>
          {subtitle && (
            <p className={`text-white font-inter ${large ? 'text-base' : small ? 'text-xs' : 'text-sm'}`}>
              {subtitle}
            </p>
          )}
          
          {/* Main content with right alignment */}
          <div className="flex items-center justify-between">
            <div className={`flex-1 ${highlightNextDate ? 'bg-brand-orange rounded-lg px-2 py-1' : ''}`}>
              <p className={`font-inter font-medium ${highlightNextDate ? 'text-white' : 'text-white'} ${uniformDates ? (large ? 'text-sm' : 'text-xs') : (extraContent ? 'text-sm' : (large ? 'text-base' : small ? 'text-xs' : 'text-sm'))}`}>
                {content}
              </p>
            </div>
            {rightContent && (
              <p className={`text-white font-inter font-medium ml-2 ${uniformDates ? (large ? 'text-sm' : 'text-xs') : (extraContent ? 'text-sm' : (large ? 'text-base' : small ? 'text-xs' : 'text-sm'))}`}>
                {rightContent}
              </p>
            )}
          </div>

          {/* Extra content lines for dates */}
          {bottomText && (
            <p className={`text-white font-inter font-medium ${large ? 'text-sm' : 'text-xs'}`}>
              {bottomText}
            </p>
          )}
          {extraContent && (
            <p className={`text-white font-inter font-medium ${large ? 'text-sm' : 'text-xs'}`}>
              {extraContent}
            </p>
          )}
          {extraContent2 && (
            <p className={`text-white font-inter font-medium ${large ? 'text-sm' : 'text-xs'}`}>
              {extraContent2}
            </p>
          )}

          {/* Circular icon */}
          {circularIcon && (
            <div className="flex items-center justify-between mt-3">
              <div className="w-4 h-4 bg-brand-orange rounded-full"></div>
              <div></div>
            </div>
          )}

          {/* Progress bar */}
          {progressBar && (
            <div className="mt-3">
              <div className="w-full bg-gray-dark rounded-full h-1">
                <div className="bg-brand-orange h-1 rounded-full" style={{ width: `${progressValue}%` }}></div>
              </div>
            </div>
          )}

          {/* Bottom content for other cards */}
          {(bottomRightContent && !extraContent) && (
            <div className="flex items-center justify-between mt-3">
              {bottomRightContent && (
                <p className={`text-white font-inter font-medium ${large ? 'text-sm' : 'text-xs'}`}>
                  {bottomRightContent}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Hover effect overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-brand-orange/10 to-orange-600/10 rounded-2xl opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.a>
  );
}
