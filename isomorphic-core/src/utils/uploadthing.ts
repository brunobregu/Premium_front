import {
  generateUploadButton,
  generateUploadDropzone,
  generateUploader,
} from '@uploadthing/react';
import { generateReactHelpers } from '@uploadthing/react/hooks';
import { FileRouter } from 'uploadthing/types';

export const Uploader = generateUploader<FileRouter>();
export const UploadButton = generateUploadButton<FileRouter>();
export const UploadDropzone = generateUploadDropzone<FileRouter>();

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<FileRouter>();
