import { Level } from "react-bulma-components"

const UnsplashCredit = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 70,
        right: 20,
      }}
    >
      <Level.Side align="right">
        <a
          className="styles-unsplash"
          href="https://unsplash.com/@peterng1618?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
          target="_blank"
          rel="noopener noreferrer"
          title="Download free do whatever you want high-resolution photos from Peter Nguyen"
        >
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
              <title>unsplash-logo</title>
              <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path>
            </svg>
          </span>
          <span>Peter Nguyen</span>
        </a>
      </Level.Side>
    </div>
  )
}

export default UnsplashCredit
