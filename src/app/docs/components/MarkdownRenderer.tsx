import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import RemarkBreaks from 'remark-breaks';
import gfm from 'remark-gfm';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const MarkdownLinkComponent = ({
  href,
  children,
}: React.ClassAttributes<HTMLAnchorElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>): React.ReactElement => (
  <Link href={href as string} target="_blank" rel="noopener noreferrer">
    {children}
  </Link>
);

const MarkdownTextComponent = (
  variant: 'body1' | 'body2' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  color: string
) =>
  function customizedTextComponent({
    children,
  }: React.ClassAttributes<HTMLElement> &
    React.HTMLAttributes<HTMLElement>): React.ReactElement {
    return (
      <Typography variant={variant} color={color}>
        {children}
      </Typography>
    );
  };

const MarkdownPreComponent = ({
  children,
}: React.ClassAttributes<HTMLElement> &
  React.HTMLAttributes<HTMLElement>): React.ReactElement => {
  return (
    <Box component="pre" bgcolor="grey.200" p={2}>
      {children}
    </Box>
  );
};

const MarkdownCodeComponent = ({
  children,
}: React.ClassAttributes<HTMLElement> &
  React.HTMLAttributes<HTMLElement>): React.ReactElement => {
  return (
    <Box
      component="code"
      bgcolor="grey.200"
      px={1}
      py={1.5}
      sx={{ borderRadius: 1, fontFamily: 'monospace', fontSize: '0.875rem' }}
    >
      {children}
    </Box>
  );
};

type ReactMarkdownProps = React.ComponentPropsWithoutRef<typeof ReactMarkdown>;

interface MarkdownRendererProps extends Omit<ReactMarkdownProps, 'children'> {
  children?: string;
  color?: string;
  variant?: 'body1' | 'body2' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  components?: ReactMarkdownProps['components'];
  remarkPlugins?: ReactMarkdownProps['remarkPlugins'];
  skipHtml?: ReactMarkdownProps['skipHtml'];
  unwrapDisallowed?: ReactMarkdownProps['unwrapDisallowed'];
}

const MarkdownRenderer = ({
  children = '',
  color = 'textPrimary',
  components,
  remarkPlugins = [RemarkBreaks, [gfm, { singleTilde: false }]],
  skipHtml = true,
  unwrapDisallowed = true,
  variant = 'body1',
  ...props
}: MarkdownRendererProps) => {
  const DEFAULT_COMPONENTS = {
    a: MarkdownLinkComponent,
    h1: MarkdownTextComponent('h3', color),
    h2: MarkdownTextComponent('h4', color),
    h3: MarkdownTextComponent('h5', color),
    h4: MarkdownTextComponent('h6', color),
    h5: MarkdownTextComponent('h6', color),
    h6: MarkdownTextComponent('h6', color),
    p: MarkdownTextComponent(variant, color),
    pre: MarkdownPreComponent,
    code: MarkdownCodeComponent,
  };

  return (
    <ReactMarkdown
      components={{ ...DEFAULT_COMPONENTS, ...components }}
      remarkPlugins={remarkPlugins}
      skipHtml={skipHtml}
      unwrapDisallowed={unwrapDisallowed}
      {...props}
    >
      {children}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
