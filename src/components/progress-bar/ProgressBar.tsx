import NextNProgress from "nextjs-progressbar";

export function ProgressBar() {
  return (
    <NextNProgress
      color="#2dd4bf"
      height={3}
      options={{ showSpinner: false }}
    />
  );
}
