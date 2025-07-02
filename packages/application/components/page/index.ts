import { default as BasePage, PageLayout, type PageProps } from '$/application/components/page/page';
import Content, { type PageContentProps } from '$/application/components/page/page-content';
import ContentSection, { type PageContentSectionProps } from '$/application/components/page/page-content-section';
import ContentSectionSidePanel, {
  type PageContentSectionSidePanelProps,
} from '$/application/components/page/page-content-section-side-panel';
import ContentSectionInnerContent, {
  type PageContentSectionInnerContentProps,
} from '$/application/components/page/page-context-section-inner-content';
import Header, { type PageHeaderProps } from '$/application/components/page/page-header';

export type {
  PageProps,
  PageHeaderProps,
  PageContentProps,
  PageContentSectionProps,
  PageContentSectionInnerContentProps,
  PageContentSectionSidePanelProps,
};

export { PageLayout };

export const Page = Object.assign(BasePage, {
  Header,
  Content,
  ContentSection,
  ContentSectionInnerContent,
  ContentSectionSidePanel,
});

export default Page;
