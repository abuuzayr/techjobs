import { useState, useEffect } from "react"
import { Head, useRouter } from "blitz"
import Modal from "react-modal"
import { RemoveScroll } from "react-remove-scroll"
import Hero from "../components/Hero"
import Jobs from "../components/Jobs"
import Footer from "../components/Footer"
import JobContent from "../components/JobContent"
import LikedContext from "../components/LikedContext"
import ContentNotFound from "../components/ContentNotFound"
import About from "../components/About"
import Resources from "../components/Resources"

Modal.setAppElement("#__next")

const getFormHTML = () => {
  return {
    __html:
      "<iframe id='JotFormIFrame-201561475275052' title='Post a job' onload='window.parent.scrollTo(0,0)' allowtransparency='true' allowfullscreen='true' allow='geolocation; microphone; camera' src='https://form.jotform.com/201561475275052' frameborder='0' style=' min-width: 100%; height:2150px; border:none;' scrolling='no' > </iframe> <script type='text/javascript'> var ifr = document.getElementById('JotFormIFrame-201561475275052'); if(window.location.href && window.location.href.indexOf('?') > -1) { var get = window.location.href.substr(window.location.href.indexOf('?') + 1); if(ifr && get.length > 0) { var src = ifr.src; src = src.indexOf('?') > -1 ? src + '&' + get : src + '?' + get; ifr.src = src; } } window.handleIFrameMessage = function(e) { if (typeof e.data === 'object') { return; } var args = e.data.split(':'); if (args.length > 2) { iframe = document.getElementById('JotFormIFrame-' + args[(args.length - 1)]); } else { iframe = document.getElementById('JotFormIFrame'); } if (!iframe) { return; } switch (args[0]) { case 'scrollIntoView': iframe.scrollIntoView(); break; case 'setHeight': iframe.style.height = args[1] + 'px'; break; case 'collapseErrorPage': if (iframe.clientHeight > window.innerHeight) { iframe.style.height = window.innerHeight + 'px'; } break; case 'reloadPage': window.location.reload(); break; case 'loadScript': var src = args[1]; if (args.length > 3) { src = args[1] + ':' + args[2]; } var script = document.createElement('script'); script.src = src; script.type = 'text/javascript'; document.body.appendChild(script); break; case 'exitFullscreen': if (window.document.exitFullscreen) window.document.exitFullscreen(); else if (window.document.mozCancelFullScreen) window.document.mozCancelFullScreen(); else if (window.document.mozCancelFullscreen) window.document.mozCancelFullScreen(); else if (window.document.webkitExitFullscreen) window.document.webkitExitFullscreen(); else if (window.document.msExitFullscreen) window.document.msExitFullscreen(); break; } var isJotForm = (e.origin.indexOf('jotform') > -1) ? true : false; if(isJotForm && 'contentWindow' in iframe && 'postMessage' in iframe.contentWindow) { var urls = {'docurl':encodeURIComponent(document.URL),'referrer':encodeURIComponent(document.referrer)}; iframe.contentWindow.postMessage(JSON.stringify({'type':'urls','value':urls}), '*'); } }; if (window.addEventListener) { window.addEventListener('message', handleIFrameMessage, false); } else if (window.attachEvent) { window.attachEvent('onmessage', handleIFrameMessage); } </script>",
  }
}

const Home = () => {
  const router = useRouter()
  const [tab, setTab] = useState((router?.query?.tab as string) || "all")
  const [search, setSearch] = useState("")
  const [liked, setLiked] = useState([])
  const [scrollTo, setScrollTo] = useState(0)
  const allowedTabs = ["featured", "all", "liked", "resources", "about", "post"]

  useEffect(() => {
    if (localStorage && localStorage.getItem("_liked")) {
      setLiked(JSON.parse(localStorage.getItem("_liked")))
    }
  }, [])

  useEffect(() => {
    const tab = router?.query?.tab as string
    if (tab) setTab(tab)
  }, [router])

  // arguments for database searching
  // we declare all so we won't have a problem with types
  let args = {
    where: {
      AND: [{ type: { equals: tab } }, { searchStr: { contains: search.toLowerCase() } }],
      OR: liked.map((id) => ({
        id,
      })),
    },
  }
  // we remove the keys that we do not need based on the tab
  if (tab === "all") {
    args["where"]["AND"] = args["where"]["AND"].filter((arg) => {
      return !Object.keys(arg).includes("type")
    })
  } else if (tab === "liked") {
    delete args["where"]["AND"]
  }
  if (tab !== "liked") delete args["where"]["OR"]
  return (
    <LikedContext.Provider value={{ liked, setLiked }}>
      <Head>
        <title>techjobs</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Hero {...{ tab, setTab, search, setSearch, liked, setScrollTo }} />
      {!allowedTabs.includes(tab) && <ContentNotFound />}
      {["featured", "all", "liked"].includes(tab) && <Jobs {...{ args, scrollTo: search ? scrollTo : 0 }} />}
      {tab === "about" && <About />}
      {tab === "resources" && <Resources />}
      {tab === "post" && <div dangerouslySetInnerHTML={getFormHTML()} />}
      <Footer />
      {
        <RemoveScroll enabled={router?.query?.jobId ? !!router.query.jobId : false}>
          <Modal
            isOpen={router?.query?.jobId ? !!router.query.jobId : false}
            onRequestClose={() => router.push("/")}
            closeTimeoutMS={1000}
            style={{
              content: { top: "", right: "", left: "", bottom: "" },
            }}
          >
            {router?.query?.jobId && <JobContent id={router.query.jobId} />}
          </Modal>
        </RemoveScroll>
      }
      <style jsx global>{`
        .ReactModal__Overlay.ReactModal__Overlay--after-open {
          z-index: 99;
          overflow: hidden;
        }
        .ReactModal__Overlay {
          opacity: 0;
          margin-top: 50px;
          transition: all 1000ms ease-in-out;
        }
        .ReactModal__Overlay--after-open {
          opacity: 1;
          margin-top: 0;
        }
        .ReactModal__Content.ReactModal__Content--after-open {
          overflow: auto;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
        .ReactModal__Overlay--before-close {
          opacity: 0;
          margin-top: 50px;
        }
        @media screen and (max-width: 768px) {
          .ReactModal__Content.ReactModal__Content--after-open {
            overflow: auto;
          }
          .level-item {
            text-align: center;
          }
        }
        @media screen and (min-width: 768px) {
          .ReactModal__Content.ReactModal__Content--after-open {
            top: 40px;
            left: 40px;
            right: 40px;
            bottom: 40px;
          }
        }
      `}</style>
    </LikedContext.Provider>
  )
}

export default Home
