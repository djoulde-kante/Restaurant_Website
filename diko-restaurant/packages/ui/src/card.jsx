export function Card({ className, title, children, href }) {
  return (
    <div className={`rounded-lg shadow-md overflow-hidden ${className}`}>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <div className="text-gray-600">{children}</div>
        {href && (
          <a 
            href={href}
            className="text-amber-600 hover:text-amber-700 mt-4 inline-block"
            target="_blank"
            rel="noopener noreferrer"
          >
            En savoir plus →
          </a>
        )}
      </div>
    </div>
  );
}