export interface IconProps {
  family?: string;
  name?: string;
  size?: number;
  color?: string;
}

export type ImageMetadata = {
  assetId: string;
  base64: string | null;
  duration: number | null;
  exif: Record<string, unknown> | null;
  fileName: string;
  fileSize: number;
  height: number;
  mimeType: string;
  pairedVideoAsset: string | null;
  type: string;
  uri: string;
  width: number;
};
