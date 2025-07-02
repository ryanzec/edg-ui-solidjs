import Page, { PageLayout } from '$/application/components/page';
import styles from '$/application/components/page/page.sandbox.module.css';
import Button from '$/core/components/button';
import { tooltipComponentUtils } from '$/core/components/tooltip';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';

export default {
  title: 'Application/Page',
};

export const Default = () => {
  return (
    <SandboxExamplesContainer>
      <Page>
        <Page.Header label="Default Page" />
        <Page.Content>
          <Page.ContentSection>
            <p>This is the default page layout with content inside a section.</p>
          </Page.ContentSection>
        </Page.Content>
      </Page>
    </SandboxExamplesContainer>
  );
};

export const BackLink = () => {
  return (
    <SandboxExamplesContainer>
      <Page onClickBackLink={() => console.log('Back link clicked')} backLinkLabel="Previous Page">
        <Page.Content>
          <Page.ContentSection>
            <p>This page has a back link.</p>
          </Page.ContentSection>
        </Page.Content>
      </Page>
      <Page onClickBackLink={() => console.log('Back link clicked')} backLinkLabel="Previous Page">
        <Page.Header label="Default Page" />
        <Page.Content>
          <Page.ContentSection>
            <p>This page has a back link.</p>
          </Page.ContentSection>
        </Page.Content>
      </Page>
    </SandboxExamplesContainer>
  );
};

export const HeaderActions = () => {
  const tooltipStore = tooltipComponentUtils.createStore();

  return (
    <SandboxExamplesContainer>
      <Page>
        <Page.Header
          label="Default Page"
          actionElements={[
            <Button onClick={() => console.log('Action 1 clicked')}>Action 1</Button>,
            <Button onClick={() => console.log('Action 2 clicked')}>Action 2</Button>,
          ]}
        />
        <Page.Content>
          <Page.ContentSection>
            <p>This is the default page layout with content inside a section.</p>
          </Page.ContentSection>
        </Page.Content>
      </Page>
    </SandboxExamplesContainer>
  );
};

export const CenteredLayout = () => {
  return (
    <SandboxExamplesContainer>
      <Page layout={PageLayout.CENTERED}>
        <Page.Header label="Centered Page" />
        <Page.Content>
          <Page.ContentSection>
            <p>This page uses the centered layout option.</p>
          </Page.ContentSection>
        </Page.Content>
      </Page>
    </SandboxExamplesContainer>
  );
};

export const FullWidth = () => {
  return (
    <SandboxExamplesContainer>
      <Page isFullWidth={true}>
        <Page.Header label="Full Width Page" />
        <Page.Content>
          <Page.ContentSection>
            <p>This page uses the full width option without any width restrictions.</p>
          </Page.ContentSection>
        </Page.Content>
      </Page>
    </SandboxExamplesContainer>
  );
};

export const MultipleContentSections = () => {
  return (
    <SandboxExamplesContainer>
      <Page>
        <Page.Header label="Multiple Content Sections" />
        <Page.Content class={styles.contentContainer}>
          <Page.ContentSection>
            <p>This is the first content section.</p>
          </Page.ContentSection>
          <Page.ContentSection>
            <p>This is the second content section with spacing handled by flexbox gap.</p>
          </Page.ContentSection>
          <Page.ContentSection>
            <p>This is the third content section.</p>
          </Page.ContentSection>
        </Page.Content>
      </Page>
    </SandboxExamplesContainer>
  );
};

export const ContentOnly = () => {
  return (
    <SandboxExamplesContainer>
      <Page layout={PageLayout.CENTERED}>
        <Page.Content>
          <Page.ContentSection>
            <p>This page has content without a header section.</p>
          </Page.ContentSection>
        </Page.Content>
      </Page>
    </SandboxExamplesContainer>
  );
};

export const ContextSectionSidePanel = () => {
  return (
    <SandboxExamplesContainer>
      <Page>
        <Page.Content>
          <Page.ContentSection hasPadding={false} hasSidePanel>
            <Page.ContentSectionSidePanel>
              <p>This page has content without a header section.</p>
            </Page.ContentSectionSidePanel>
            <Page.ContentSectionInnerContent>
              <p>This page has content without a header section.</p>
            </Page.ContentSectionInnerContent>
          </Page.ContentSection>
        </Page.Content>
      </Page>
    </SandboxExamplesContainer>
  );
};
