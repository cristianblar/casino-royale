interface PlayButtonProps {
  handlePlay: () => void
}

export default function PlayButton({ handlePlay }: PlayButtonProps) {
  return (
    <button
      className="game__button play-button"
      type="button"
      onClick={handlePlay}
    >
      PLAY
    </button>
  )
}
