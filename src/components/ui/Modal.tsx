'use client';

import * as React from 'react';
import { cn } from '@/lib/cn';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
  /** ID for aria-labelledby - should match the modal title id */
  titleId?: string;
  /** Optional description ID for aria-describedby */
  descriptionId?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  overlayClassName,
  closeOnOverlayClick = true,
  showCloseButton = true,
  titleId,
  descriptionId,
}) => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const previousActiveElement = React.useRef<HTMLElement | null>(null);

  // Generate unique IDs if not provided
  const generatedTitleId = React.useId();
  const modalTitleId = titleId || `modal-title-${generatedTitleId}`;

  // Store the previously focused element and restore focus on close
  React.useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      // Focus the modal container after a brief delay to allow render
      setTimeout(() => {
        modalRef.current?.focus();
      }, 0);
    } else {
      document.body.style.overflow = 'unset';
      // Restore focus to the previously focused element
      previousActiveElement.current?.focus();
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle keyboard events (Escape and Tab for focus trap)
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Focus trap - handle Tab key
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          // Shift + Tab: if on first element, move to last
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable?.focus();
          }
        } else {
          // Tab: if on last element, move to first
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className={cn(
          'fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in',
          overlayClassName
        )}
        onClick={closeOnOverlayClick ? onClose : undefined}
        aria-hidden="true"
      />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={modalTitleId}
            aria-describedby={descriptionId}
            tabIndex={-1}
            className={cn(
              'relative transform overflow-hidden bg-white text-left shadow-xl transition-all animate-scale-in',
              'w-full max-w-lg border-2 border-black',
              'focus:outline-none',
              className
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {showCloseButton && (
              <button
                type="button"
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded-sm min-h-[44px] min-w-[44px] flex items-center justify-center -mr-2 -mt-2"
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            )}

            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const ModalHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn('px-6 pt-6 pb-4', className)}
    {...props}
  />
);

interface ModalTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** ID for aria-labelledby reference - should match Modal's titleId prop */
  id?: string;
}

const ModalTitle: React.FC<ModalTitleProps> = ({
  className,
  id,
  ...props
}) => (
  <h3
    id={id}
    className={cn(
      'font-heading text-xl font-semibold leading-6 text-gray-900',
      className
    )}
    {...props}
  />
);

const ModalDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  ...props
}) => (
  <p
    className={cn('mt-2 text-sm text-gray-600', className)}
    {...props}
  />
);

const ModalBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn('px-6 pb-4', className)}
    {...props}
  />
);

const ModalFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn(
      'flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4',
      className
    )}
    {...props}
  />
);

export { Modal, ModalHeader, ModalTitle, ModalDescription, ModalBody, ModalFooter };