import { LiveQueryProvider } from '@sanity/preview-kit';
import { useMemo } from 'react';
import { getClient } from '~/lib/sanity';
import ExitPreview from '~/components/ExitPreview';

export default function PreviewProvider({ children, token }) {
  const client = useMemo(() => getClient({ token }), [token]);
  return (
    <LiveQueryProvider client={client}>
      {children}
      <ExitPreview />
    </LiveQueryProvider>
  );
}
