export default function LoadingDots() {
  return (
    <div className="flex space-x-2 justify-center items-center">
      <div
        className="h-2 w-2 bg-black rounded-full animate-custom-bounce"
        style={{animationDelay: "-0.3s"}}
      ></div>
      <div
        className="h-2 w-2 bg-black rounded-full animate-custom-bounce"
        style={{animationDelay: "-0.15s"}}
      ></div>
      <div
        className="h-2 w-2 bg-black rounded-full animate-custom-bounce"
        style={{animationDelay: "0s"}}
      ></div>
    </div>
  );
}
