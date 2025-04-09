import { useQuery } from "@tanstack/react-query";
import { fetchVideos } from "../api/api";
import { VideoPlayer } from "../components/VideoPlayer";

export function ListVideo() {
  const {
    data: videos,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["videos"],
    queryFn: fetchVideos,
  });
  if (isLoading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Lỗi: {error.message}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6">
      {videos?.map((video) => (
        <div
          key={video.uid}
          className="border rounded-lg shadow-md overflow-hidden"
        >
          <VideoPlayer src={video?.playback?.hls} type="hls" />
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">
              {video?.meta?.name || "Untitled Video"}
            </h2>
            <p className="text-sm text-gray-600">
              {video?.thumbnail || "No thumbnail available."}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
