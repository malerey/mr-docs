import SideNavigation from '@/app/docs/components/SideNavigation';
import { getSidebar } from '@/app/docs/utils';

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sideNavItems = getSidebar();

  return (
    <div className="flex h-[100vh]">
      <SideNavigation sideNavItems={sideNavItems} />
      <div className="!w-full overflow-scroll">{children}</div>
    </div>
  );
}
