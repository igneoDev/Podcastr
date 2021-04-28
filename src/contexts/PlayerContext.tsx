import {
  createContext, ReactNode, useContext, useState,
} from 'react'

type Episode = {
  title: string
  members: string
  thumbnail: string
  duration: number
  url: string
}

type PlayerContextData = {
  episodesList: Episode[]
  currentEpisodeIndex: number
  isPlaying: boolean
  isLooping: boolean
  isShuffling: boolean
  play: (episode: Episode) => void
  playList: (list: Episode[], index: number) => void
  playNext: () => void
  playPrevious: () => void
  setPlayingState: (state: boolean) => void
  togglePlay: () => void
  toggleLoop: () => void
  toggleShuffle: () => void
  clearPlayerState: () => void
  hasNext: boolean
  hasPrevious: boolean
}

type PlayerContextProviderProps = {
  children: ReactNode
}

export const PlayerContext = createContext({} as PlayerContextData)

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
  const [episodesList, setEpisodesList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)

  function play(episode: Episode) {
    setEpisodesList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  function playList(list: Episode[], index: number) {
    setEpisodesList(list)
    setCurrentEpisodeIndex(index)
    setIsPlaying(true)
  }

  function togglePlay() {
    setIsPlaying(!isPlaying)
  }

  function toggleLoop() {
    setIsLooping(!isLooping)
  }

  function toggleShuffle() {
    setIsShuffling(!isShuffling)
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state)
  }

  // looped
  // function playNext() {
  //   let nextEpisodeIndex = currentEpisodeIndex + 1

  //   if (nextEpisodeIndex >= episodesList.length) {
  //     nextEpisodeIndex = 0
  //   }

  //   setCurrentEpisodeIndex(nextEpisodeIndex)
  // }

  // function playPrevious() {
  //   let nextEpisodeIndex = currentEpisodeIndex - 1

  //   if (nextEpisodeIndex === -1) {
  //     nextEpisodeIndex = episodesList.length - 1
  //   }

  //   setCurrentEpisodeIndex(nextEpisodeIndex)
  // }

  const hasPrevious = currentEpisodeIndex > 0
  const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodesList.length

  function playNext() {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodesList.length)
      setCurrentEpisodeIndex(nextRandomEpisodeIndex)
    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1)
    }
  }

  function playPrevious() {
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1)
    }
  }

  function clearPlayerState() {
    setEpisodesList([])
    setCurrentEpisodeIndex(0)
  }

  return (
    <PlayerContext.Provider
      value={
        {
          episodesList,
          currentEpisodeIndex,
          play,
          isPlaying,
          togglePlay,
          setPlayingState,
          playList,
          playNext,
          playPrevious,
          hasNext,
          hasPrevious,
          isLooping,
          isShuffling,
          toggleLoop,
          toggleShuffle,
          clearPlayerState,
        }
      }
    >
      { children }
    </PlayerContext.Provider>
  )
}

export const usePlayerContext = () => useContext(PlayerContext)
