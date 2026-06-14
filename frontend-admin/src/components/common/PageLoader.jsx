const PageLoader = () => {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="spinner"></div>

      <style>
        {`
          .spinner {
            width: 50px;
            height: 50px;
            border: 5px solid #e5e7eb;
            border-top: 5px solid #2563eb;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default PageLoader;