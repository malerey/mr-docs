'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { SidebarItem } from '@/app/docs/utils';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import {
  ArrowLeft,
  ArrowDropUp,
  ArrowDropDown,
  ArrowRight,
} from '@mui/icons-material';
import clsx from 'clsx';

type SideNavItem = {
  label: string;
  slug: string;
};

type SideNavDropDownItem = {
  label: string;
  slug: string;
  items: SideNavItem[];
};

const SideNavDropdown: React.FC<{
  currentPage: string;
  item: SideNavDropDownItem;
}> = ({ currentPage, item }) => {
  const open = [
    item.slug,
    ...item.items.map((subItem) => subItem.slug),
  ].includes(currentPage);

  return (
    <div className="relative flex flex-col gap-2">
      <>
        <Button
          aria-label={`Open ${item.label} Submenu`}
          startIcon={<ArrowDropUp />}
          component={Link}
          href={`/${item.slug}`}
          variant="contained"
          fullWidth
        >
          <div className="flex w-full justify-between">
            <p className="text-nowrap text-start">{item.label}</p>
            {open ? <ArrowDropUp /> : <ArrowDropDown />}
          </div>
        </Button>
        {open && (
          <div className="flex flex-col gap-2">
            {item.items.map((subItem) => (
              <Button
                key={subItem.slug}
                aria-label={subItem.label}
                startIcon={<ArrowRight />}
                component={Link}
                href={`/${subItem.slug}`}
                className="!justify-start"
                variant="text"
              >
                <p className="text-nowrap">{subItem.label}</p>
              </Button>
            ))}
          </div>
        )}
      </>
    </div>
  );
};

const NavItem: React.FC<{
  item: SideNavItem;
  currentPage: string;
}> = ({ item, currentPage }) => (
  <Button
    aria-label={item.label}
    component={Link}
    href={`/${item.slug}`}
    startIcon={<ArrowRight />}
    className="!justify-start"
    variant="contained"
  >
    <p>{item.label}</p>
  </Button>
);

const SideNavigation: React.FC<{
  sideNavItems: SidebarItem[];
}> = ({ sideNavItems }) => {
  const pathname = usePathname();
  const currentPage = pathname.slice(1);

  return (
    <aside className="transition-width flex shrink-0 flex-col gap-6 border-r border-subdued px-3 py-6 duration-300 w-64">
      <div>
        <Button
          aria-label="Back to main page"
          component={Link}
          href="/"
          startIcon={<ArrowLeft />}
          className="!justify-start"
          variant="contained"
        >
          <p className="text-nowrap">Back to main page</p>
        </Button>
        <div className="mt-6 flex flex-col gap-2">
          <div className="inline-flex h-10 w-full items-center gap-2 px-4">
            <p className="text-nowrap">Docs</p>
          </div>
          {sideNavItems.map((item: SideNavItem | SideNavDropDownItem) => (
            <React.Fragment key={item.slug}>
              {'items' in item ? (
                <SideNavDropdown item={item} currentPage={currentPage} />
              ) : (
                <NavItem item={item} currentPage={currentPage} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="mt-auto flex h-14 flex-col items-end gap-3">
        <Divider />
      </div>
    </aside>
  );
};

export default SideNavigation;
