interface ErrorStateProps {
  message: string;
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="rounded-2xl border border-error/40 bg-error/10 p-6 text-sm text-error" role="alert">
      <p className="font-medium">Couldn&apos;t load this section from the API.</p>
      <p className="mt-1 text-error/80">{message}</p>
    </div>
  );
}
