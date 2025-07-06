import EmptyIndicator from '$/core/components/empty-indicator';

export type GridEmptyDataProps = {
  columnCount: number;
};

const GridEmptyData = (props: GridEmptyDataProps) => {
  return (
    <div style={`grid-column: span ${props.columnCount};`}>
      <EmptyIndicator class="rounded-t-none" label="No data available" />
    </div>
  );
};

export default GridEmptyData;
