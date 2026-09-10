import React, {useEffect, useId, useRef, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useThemeConfig} from '@docusaurus/theme-common';
import {useActivePlugin, useAllDocsData} from '@docusaurus/plugin-content-docs/client';
import styles from './styles.module.css';

const join = (...parts) => `/${parts.join('/')}`.replace(/\/+/g, '/').replace(/(.)\/$/, '$1');

/** The left navbar items (sections) as `{label, path, to}`; `path` is the docs plugin route used to spot the active one. */
function useSections() {
  const {navbar} = useThemeConfig();
  const {siteConfig: {baseUrl}} = useDocusaurusContext();
  const allDocs = useAllDocsData();
  return navbar.items.filter((item) => item.position === 'left').map((item) => {
    if (item.type === 'docSidebar') {
      const plugin = allDocs[item.docsPluginId ?? 'default'];
      const version = plugin.versions.find((candidate) => candidate.isLast) ?? plugin.versions[0];
      return {label: item.label, path: join(plugin.path), to: version.sidebars[item.sidebarId]?.link?.path ?? version.path};
    }
    return {label: item.label, path: join(baseUrl, item.to), to: item.to};
  });
}

export default function SectionSwitcher() {
  const sections = useSections();
  const activePlugin = useActivePlugin();
  const {pathname} = useLocation();
  const activePath = activePlugin ? join(activePlugin.pluginData.path) : pathname;
  const current = sections.find((section) => section.path === activePath) ?? sections[0];
  const [open, setOpen] = useState(false);
  const root = useRef(null);
  const id = useId();

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return undefined;
    const onPointer = (event) => { if (!root.current?.contains(event.target)) setOpen(false); };
    const onKey = (event) => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('pointerdown', onPointer); document.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <div ref={root} className={styles.switcher}>
      <button type="button" className={styles.switcherButton} aria-haspopup="menu" aria-expanded={open} aria-controls={id} onClick={() => setOpen((value) => !value)}>
        <span>{current.label}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
      </button>
      <ul id={id} role="menu" className={styles.switcherMenu} hidden={!open}>
        {sections.map((section) => (
          <li key={section.path} role="none">
            <Link role="menuitem" to={section.to} className={clsx(styles.switcherItem, section === current && styles.switcherItemActive)} aria-current={section === current ? 'page' : undefined}>
              {section.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
