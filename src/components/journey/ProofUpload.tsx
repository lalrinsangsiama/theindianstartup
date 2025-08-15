'use client';

// This component has been deprecated in favor of document organization
// The functionality has been replaced by DocumentChecklist component

export interface ProofFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  uploadedAt: string;
  status: 'uploading' | 'success' | 'error';
}

interface ProofUploadProps {
  taskId: string;
  taskTitle: string;
  existingProof?: ProofFile;
  onUpload: (file: File, uploadedData: any) => Promise<void>;
  onDelete?: () => Promise<void>;
  onClose: () => void;
}

export function ProofUpload({ onClose }: ProofUploadProps) {
  // This component is deprecated - redirecting to close
  onClose();
  return null;
}

export function ProofViewer() {
  return null;
}