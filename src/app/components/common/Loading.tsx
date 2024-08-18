export default function LoadingIndicator() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary-1" />
    </div>
  );
}
