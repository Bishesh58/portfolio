import Wave from 'react-wavify'

function Wave() {
  return (
    <div>
      {/* moving wave */}
      <div>
        <Wave mask="url(#mask)" fill="purple">
          <defs>
            <linearGradient id="gradient" gradientTransform="rotate(90)">
              <stop offset="0" stopColor="#a755f7" />
              <stop offset="0.4" stopColor="black" />
            </linearGradient>
            <mask id="mask">
              <rect
                x="0"
                y="0"
                width="350"
                height="100"
                fill="url(#gradient)"
              />
            </mask>
          </defs>
        </Wave>
      </div>
    </div>
  )
}

export default Wave
