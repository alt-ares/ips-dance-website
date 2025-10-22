"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { motion } from "framer-motion";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  href?: string;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", href, children, className = "", ...props }, ref) => {
    const baseClasses =
      "px-6 sm:px-8 py-3 sm:py-4 rounded-full font-grotesk font-bold text-xs sm:text-sm md:text-base uppercase tracking-wider transition-all duration-300 cursor-glow relative";

    const variantClasses = {
      primary:
        "bg-brand-orange text-white hover:bg-opacity-60 hover:shadow-lg hover:shadow-brand-orange/50",
      secondary:
        "glass text-white hover:glass-strong border-brand-orange/30",
    };

    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

    const content = (
      <span className="relative z-10">{children}</span>
    );

    if (href) {
      return (
        <motion.a
          href={href}
          className={combinedClasses}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          {content}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={combinedClasses}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        {...(props as any)}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = "Button";


