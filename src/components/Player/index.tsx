import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'
import Slider from 'rc-slider'

import 'rc-slider/assets/index.css'
import styles from './styles.module.scss'
import { usePlayerContext } from '../../contexts/PlayerContext'
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString'

export function Player() {
  // eslint-disable-next-line no-undef
  const audioRef = useRef<HTMLAudioElement>(null)
  const [progress, setProgress] = useState(0)
  const {
    episodesList,
    currentEpisodeIndex,
    isPlaying, togglePlay,
    setPlayingState,
    playNext,
    playPrevious,
    hasNext,
    hasPrevious,
    isLooping,
    toggleLoop,
    toggleShuffle,
    isShuffling,
    clearPlayerState,
  } = usePlayerContext()

  function setUpProgressListener() {
    audioRef.current.currentTime = 0

    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime))
    })
  }

  function handleSeek(amount: number) {
    audioRef.current.currentTime = amount
    setProgress(amount)
  }

  function handleEpisodeEnded() {
    if (hasNext) {
      playNext()
    } else {
      clearPlayerState()
      setProgress(0)
    }
  }

  useEffect(() => {
    if (!audioRef.current) {
      return
    }

    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  const episode = episodesList[currentEpisodeIndex]

  return (
    <div className={ styles.container }>
      <header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </header>

      <>
        { episode ? (
          <div className={ styles.currentEpisode }>
            <Image width={ 592 } height={ 592 } src={ episode.thumbnail } objectFit="cover" />
            <strong>{ episode.title }</strong>
            <span>{ episode.members }</span>
          </div>
        ) : (
          <div className={ styles.emptyPlayer }>
            <strong>Selecione um podcast para ouvir</strong>
          </div>
        ) }
      </>

      <footer className={ !episode ? styles.empty : '' }>
        <div className={ styles.progress }>
          <span>{ convertDurationToTimeString(progress) }</span>
          <div className={ styles.slider }>
            {episode ? (
              <Slider
                max={ episode.duration }
                value={ progress }
                onChange={ handleSeek }
                trackStyle={ { backgroundColor: '#04d361' } }
                railStyle={ { backgroundColor: '#9f75ff' } }
                handleStyle={ { borderColor: '#04d361', borderWidth: 4 } }
              />
            ) : (
              <div className={ styles.emptySlider } />
            )}
          </div>
          <span>{ convertDurationToTimeString(episode?.duration ?? 0) }</span>
        </div>

        { episode && (
          <audio
            src={ episode.url }
            ref={ audioRef }
            loop={ isLooping }
            autoPlay
            onPlay={ () => setPlayingState(true) }
            onPause={ () => setPlayingState(false) }
            onLoadedMetadata={ setUpProgressListener }
            onEnded={ handleEpisodeEnded }
          >
            <track kind="captions" />
          </audio>
        ) }

        <div className={ styles.buttons }>
          <button type="button" disabled={ !episode || episodesList.length === 1 } onClick={ toggleShuffle } className={ isShuffling ? styles.isActive : '' }>
            <img src="/shuffle.svg" alt="Aleatório" />
          </button>
          <button type="button" disabled={ !episode || !hasPrevious } onClick={ playPrevious }>
            <img src="/play-previous.svg" alt="Tocar Anterior" />
          </button>
          <button type="button" className={ styles.playButton } disabled={ !episode } onClick={ togglePlay }>
            { isPlaying
              ? <img src="/pause.svg" alt="Tocar" />
              : <img src="/play.svg" alt="Tocar" />}
          </button>
          <button type="button" disabled={ !episode || !hasNext } onClick={ playNext }>
            <img src="/play-next.svg" alt="Tocar Próxima" />
          </button>
          <button type="button" disabled={ !episode } onClick={ toggleLoop } className={ isLooping ? styles.isActive : '' }>
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  )
}
