import Page, { type PageProps } from '$/application/components/page/page';
import Header, { type PageHeaderProps } from '$/application/components/page/page-header';

export type { PageProps, PageHeaderProps };

export default Object.assign(Page, { Header });
