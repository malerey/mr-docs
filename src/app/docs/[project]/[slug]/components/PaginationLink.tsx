import Link from 'next/link';

type PaginationLinkProps = {
  route: string;
  label: string;
  direction: 'left' | 'right';
};

const PaginationLink: React.FC<PaginationLinkProps> = ({
  route,
  label,
  direction,
}) => {
  const formatTitle = (slug: string): string =>
    slug
      .split('/')
      .pop()
      ?.replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase()) ?? '';

  return (
    <Link href={`/docs/${route}`} passHref className="w-1/2">
      <div
        className={`flex w-full flex-col p-8 items-${
          direction === 'left' ? 'start' : 'end'
        } rounded-lg bg-elevated-high-default hover:bg-elevated-high-hover`}
      >
        <p>{label}</p>
        <div className="flex-1 p-left">
          <p>
            {direction === 'left' && '« '}
            {formatTitle(route)}
            {direction === 'right' && ' »'}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PaginationLink;
