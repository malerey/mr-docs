import fs from 'fs';
import { join } from 'path';

const postsDirectory = join(process.cwd(), '/src/app/docs');

export interface SidebarItem {
  label: string;
  slug: string;
  items?: SidebarItem[];
}

export function getSlugs() {
  const slugs: string[] = [];

  function recurseDirectories(directory: string, prefix = '') {
    const entries = fs.readdirSync(directory, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        recurseDirectories(
          join(directory, entry.name),
          `${prefix}${entry.name}/`
        );
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        slugs.push(`${prefix}${entry.name}`);
      }
    }
  }

  recurseDirectories(postsDirectory);
  return slugs;
}

export function getFirstSlug(project: string): string | null {
  const slugs = getSlugs().filter((s) => s.startsWith(`${project}/`));
  if (slugs.length > 0) {
    return slugs[0].replace(/\.md$/, '');
  }
  return null;
}

export function getDocBySlug(project: string, slug: string) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, project, `${realSlug}.md`);
  const content = fs.existsSync(fullPath)
    ? fs.readFileSync(fullPath, 'utf8')
    : null;

  return content ? { slug: realSlug, content } : null;
}

function formatLabel(name: string): string {
  return name
    .replace(/-/g, ' ')
    .replace(/\.md$/, '')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function hasMarkdownFiles(dir: string): boolean {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.some((entry) => entry.isFile() && entry.name.endsWith('.md'));
}

function getSidebarItems(
  dir: string,
  basePath: string = 'docs/'
): SidebarItem[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  return entries
    .map((entry) => {
      const fullPath = join(dir, entry.name);
      const relativePath = join(basePath, entry.name);

      if (entry.isDirectory()) {
        if (hasMarkdownFiles(fullPath)) {
          return {
            label: formatLabel(entry.name),
            slug: relativePath,
            items: getSidebarItems(fullPath, relativePath),
          };
        }
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        return {
          label: formatLabel(entry.name),
          slug: relativePath.replace(/\.md$/, ''),
        };
      }
    })
    .filter((item): item is SidebarItem => item !== undefined);
}

export function getSidebar(): SidebarItem[] {
  return getSidebarItems(postsDirectory);
}

export function getPrevNextDoc(project: string, slug: string) {
  const slugs = getSlugs().map((s) => s.replace(/\.md$/, ''));

  const filteredSlugs = slugs.filter((s) => s.startsWith(`${project}/`));

  const slugIndex = filteredSlugs.indexOf(`${project}/${slug}`);

  if (slugIndex === -1) {
    return { prev: null, next: null };
  }

  const prev = slugIndex > 0 ? filteredSlugs[slugIndex - 1] : null;
  const next =
    slugIndex < filteredSlugs.length - 1 ? filteredSlugs[slugIndex + 1] : null;

  return { prev, next };
}
