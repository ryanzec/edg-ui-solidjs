import Checklist, { type ChecklistItem, ChecklistItemStatus } from '$/core/components/checklist';
import SandboxExamplesContainer from '$sandbox/components/sandbox-examples-container/sandbox-examples-container';

export default {
  title: 'Components/Checklist',
};

const items: ChecklistItem[] = [
  { label: 'Item 1', status: ChecklistItemStatus.COMPLETED },
  { label: 'Item 2', status: ChecklistItemStatus.COMPLETED },
  { label: 'Item 3', status: ChecklistItemStatus.INCOMPLETE },
  { label: 'Item 4', status: ChecklistItemStatus.COMPLETED },
  { label: 'Item 5', status: ChecklistItemStatus.INCOMPLETE },
];

export const Default = () => {
  return (
    <SandboxExamplesContainer>
      <Checklist items={items} />
    </SandboxExamplesContainer>
  );
};
