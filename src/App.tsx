import { useEffect, useState } from 'react'
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

  useEffect(() => {
    setDisplayedText('')
    setIsTyping(true)

    let characterIndex = 0

    const interval = setInterval(() => {
      if (characterIndex < lines[lineIndex].length) {
        setDisplayedText(
          lines[lineIndex].slice(0, characterIndex + 1)
        )
        characterIndex++
      } else {
        clearInterval(interval)
        setIsTyping(false)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [lineIndex])

  const nextLine = () => {
    if (isTyping || isFading || lineIndex === lines.length - 1) return

    setIsFading(true)

    setTimeout(() => {
      setLineIndex((currentIndex) => currentIndex + 1)
      setIsFading(false)
    }, 400)
  }

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
