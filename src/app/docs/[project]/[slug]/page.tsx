import { notFound } from 'next/navigation';
import { getDocBySlug, getPrevNextDoc } from '@/app/docs/utils';
import MarkdownRenderer from '@/app/docs/components/MarkdownRenderer';

import PaginationLink from '@/app/docs/[project]/[slug]/components/PaginationLink';

type Params = {
  params: {
    project: string;
    slug: string;
  };
};

export default function SingleDocPage({ params }: Params) {
  const { project, slug } = params;
  const doc = getDocBySlug(project, slug);
  const { prev, next } = getPrevNextDoc(project, slug);

  if (!doc) {
    return notFound();
  }

  return (
    <main>
      <article className="w-9/12 p-12">
        <MarkdownRenderer>{doc.content}</MarkdownRenderer>
        <div className="mt-8 flex justify-between gap-4">
          {prev && (
            <PaginationLink route={prev} label="Previous" direction="left" />
          )}
          {!prev && <div className="w-1/2" />}
          {next && (
            <PaginationLink route={next} label="Next" direction="right" />
          )}
        </div>
      </article>
    </main>
  );
}
