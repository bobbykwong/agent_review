interface EmptyProps {
  label?: string;
}

export function Empty({ label = "No entries" }: EmptyProps) {
  return (
    <div className="flex flex-col items-start gap-2 text-secondary w-fit">
      <img src="/graphics/list.svg" className="w-12 h-12" />
      <p>{label}</p>
    </div>
  );
}
