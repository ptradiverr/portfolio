import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

const lines = [
  "Hi, I'm Ruibing",
  'i like to do many things:',
  'reading (especially visual novels), networking, working out, gaming, cleaning (?)',
]

function App() {
  const [lineIndex, setLineIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [isFading, setIsFading] = useState(false)
  const typingInterval = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    setDisplayedText('')
    setIsTyping(true)

    let characterIndex = 0

    typingInterval.current = setInterval(() => {
      if (characterIndex < lines[lineIndex].length) {
        setDisplayedText(
          lines[lineIndex].slice(0, characterIndex + 1)
        )
        characterIndex++
      } else {
        clearInterval(typingInterval.current!)
        typingInterval.current = null
        setIsTyping(false)
      }
    }, 50)

    return () => {
      if (typingInterval.current) clearInterval(typingInterval.current)
    }
  }, [lineIndex])

  const nextLine = useCallback(() => {
    if (isTyping) {
      if (typingInterval.current) clearInterval(typingInterval.current)
      typingInterval.current = null
      setDisplayedText(lines[lineIndex])
      setIsTyping(false)
      return
    }

    if (isFading || lineIndex === lines.length - 1) return

    setIsFading(true)

    setTimeout(() => {
      setLineIndex((currentIndex) => currentIndex + 1)
      setIsFading(false)
    }, 400)
  }, [isFading, isTyping, lineIndex])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code !== 'Space' || event.repeat) return

      event.preventDefault()
      nextLine()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextLine])

  return (
    <main onClick={nextLine}>
      <section className="hero">

        <div className={`vn-text ${isFading ? 'fade-out' : ''}`}>
          <span>
            {displayedText}
          </span>

          {!isTyping && (
            <span className="next-indicator">
              ▼
            </span>
          )}
        </div>

      </section>
    </main>
  )
}

export default App
