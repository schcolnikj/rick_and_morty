interface EmptyStateProps {
  message: string;
  icon?: React.ReactNode;
}

export const EmptyState = ({ message, icon }: EmptyStateProps) => {
  return (
    <div className="flex h-full items-center justify-center p-4">
      {icon && <div className="mb-2">{icon}</div>}
      <p className="text-center text-sm text-gray-500">{message}</p>
    </div>
  );
};
