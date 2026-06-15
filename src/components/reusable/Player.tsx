type Props = {
  trackId: string
  onPlay?: (trackId: string) => void
}

export const SpotifyPlayer = ({ trackId, onPlay }: Props) => {
  return (
    <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
      <iframe
        src={`https://open.spotify.com/embed/track/${trackId}`}
        width="100%"
        height="80"
        allow="encrypted-media"
        className="rounded"
        onLoad={() => onPlay?.(trackId)}
      />
    </div>
  )
}
