import { source } from '@/lib/source';
import { createMetadataImage } from 'fumadocs-core/server';

export const metadataImage = createMetadataImage({
  source,
  imageRoute: 'og',
});
