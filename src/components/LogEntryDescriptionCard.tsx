export default function LogEntryDescriptionCard({
  image,
  description,
}: {
  image: string;
  description: string;
}) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl mt-12">
      <div className="card-header flex items-center justify-between p-4">
        <div className="flex items-center">
          <div className="avatar">
            <div className="w-12 rounded-full bg-red-500 text-white flex items-center justify-center">
              T
            </div>
          </div>
          <div className="ml-4">
            <h2 className="card-title">Shrimp and Chorizo Paella</h2>
            <p className="text-sm text-gray-500">September 14, 2016</p>
          </div>
        </div>
        <button className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      {image && (
        <figure>
          <img
            src={image}
            alt="Paella dish"
            className="w-full h-48 object-cover"
          />
        </figure>
      )}
      <div className="card-body">
        <p className="text-gray-700">{description}</p>
      </div>
      <div className="card-actions justify-end p-4">
        <button className="btn btn-outline btn-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
        <button className="btn btn-outline btn-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 10l4.5 4.5M15 10l-4.5 4.5M15 10V3m0 7h7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
