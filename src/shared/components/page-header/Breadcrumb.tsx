interface BreadcrumbProps {
  /** breadcrumb trail, e.g. ["Diplomas", "Frontend Development", "Exams"] */
  breadcrumb?: string[];
}

export default function Breadcrumb({ breadcrumb }: BreadcrumbProps) {
  if (!breadcrumb || breadcrumb.length === 0) return null;

  const lastItem = breadcrumb[breadcrumb.length - 1];

  return (
    <p className="bg-white p-4 font-mono text-sm text-gray-400">
      {breadcrumb.slice(0, -1).map((item, index) => (
        <span key={index}>
          {item}
          {index < breadcrumb.length - 2 && " / "}
        </span>
      ))}
      {breadcrumb.length > 1 && " / "}
      <span className="text-blue-500">{lastItem}</span>
    </p>
  );
}
