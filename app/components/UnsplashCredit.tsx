import { Level } from "react-bulma-components"

const UnsplashCredit = () => (
  <div className="credits">
    <Level.Side align="right">
      <a
        className="unsplash"
        href="https://unsplash.com/@kp89_?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge"
        target="_blank"
        rel="noopener noreferrer"
        title="Download free do whatever you want high-resolution photos from Kirill Petropavlov"
      >
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <title>unsplash-logo</title>
            <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path>
          </svg>
        </span>
        <span>Kirill Petropavlov</span>
      </a>
    </Level.Side>
    <style jsx>{`
      .credits {
        position: absolute;
        top: 70px;
        right: 20px;
      }
      .unsplash {
        color: white;
        padding: 4px 6px;
        font-size: 12px;
        line-height: 1.2;
        border-radius: 3px;
        opacity: 0.6;
      }
      .unsplash span {
        display: inline-block;
        padding: 2px 3px;
      }
      .unsplash span svg {
        height: 12px;
        width: auto;
        position: relative;
        vertical-align: middle;
        top: -2px;
        fill: white;
      }
    `}</style>
  </div>
)

export default UnsplashCredit
